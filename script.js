/**
 * FAMILY TREE CONFIGURATION & DATA
 */
const CONFIG = {
    cardWidth: 140,  
    cardHeight: 180, 
    horizontalSpacing: 30, 
    
    // Dynamic Vertical Spacing Configuration (Refactored)
    // Gap increases as we get closer to the root
    verticalSpacingBase: 230, // Minimum gap (Card height + padding)
    verticalSpacingFactor: 200, // How much extra space per level up
    
    partnerSpacing: 40,   
    avatarSize: 80, 
    thumbnailPath: "images/thumbnails/",
    fullPath: "images/", 
    defaultColor: "#fff",
    aliveBorderColor: "#ACE1AF", 
    deadBorderColor: "#ccc",
    selectedBorderColor: "#FFD700", 
    textColor: "#333",
    fontMain: "bold 13px Arial",
    fontSub: "11px Arial",
    fontSmall: "11px Arial",
    
    debug: false
};

// NOTE: rawNodes is loaded from data.js

/**
 * IMAGE MANAGER
 * Handles loading and caching of profile images.
 */
class ImageManager {
    constructor() {
        this.thumbnails = new Map();
        this.fullImages = new Map();
        this.placeholderCache = new Map();
        this.facebookIcon = new Image();
        this.facebookIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGP8//8/AyUYGhoKgPj/gXTA/wHRCCTG3///B0QjYwMDKQaA+H9ANAIAAOvD/fexx48hAAAAAElFTkSuQmCC'; // Simple blue placeholder
        // Try to load real FB icon if available
        const realFb = new Image();
        realFb.onload = () => { this.facebookIcon = realFb; requestRedraw(); };
        realFb.src = 'images/icons/fb.png';
        
        // Helper canvas for color extraction
        this.helperCanvas = document.createElement('canvas');
        this.helperCanvas.width = 1;
        this.helperCanvas.height = 1;
        this.helperCtx = this.helperCanvas.getContext('2d', { willReadFrequently: true }); // Optimization hint
    }
    
    _computeAverageColor(img) {
        try {
            this.helperCtx.clearRect(0, 0, 1, 1);
            this.helperCtx.drawImage(img, 0, 0, 1, 1);
            const p = this.helperCtx.getImageData(0, 0, 1, 1).data;
            // Check if transparency is high (empty image)
            if (p[3] < 5) return null; 
            return `rgb(${p[0]},${p[1]},${p[2]})`;
        } catch(e) {
            // Silently fail for CORS/file:// restrictions -> returns null -> gray circle
            return null;
        }
    }
    
    // Helper to load image
    _load(src, map, key, nameForFallback) {
        if (map.has(key)) return map.get(key);
        
        const imgObj = { img: new Image(), loaded: false, error: false, avgColor: null };
        // Removed crossOrigin setting to allow local file loading
        imgObj.img.src = src;
        
        map.set(key, imgObj); // Set immediately to avoid duplicate requests

        imgObj.img.onload = () => {
            imgObj.loaded = true;
            // Try to compute color (works on server, fails gracefully locally)
            imgObj.avgColor = this._computeAverageColor(imgObj.img);
            requestRedraw();
        };
        imgObj.img.onerror = () => {
            imgObj.error = true;
            imgObj.avgColor = null; // Ensure we have null (gray) on error
        };
        return imgObj;
    }

    get(node, highQuality) {
        if (!node.image) return null;

        // Always ensure thumbnail is available (as fallback or primary)
        let thumb = this._load(CONFIG.thumbnailPath + node.image, this.thumbnails, node.image, node.name);

        if (highQuality) {
            // Try loading full image
            let full = this._load(CONFIG.fullPath + node.image, this.fullImages, node.image, node.name);
            if (full.loaded) return full;
        }

        return thumb;
    }
}

/**
 * LAYOUT ENGINE
 * Calculates positions of all nodes in memory.
 */
class TreeLayout {
    constructor(nodes) {
        this.nodes = new Map(nodes.map(n => [n.id, { ...n, w: CONFIG.cardWidth, h: CONFIG.cardHeight, x: 0, y: 0, children: [] }]));
        this.root = null;
        this.layers = []; // Optimization: Spatial indexing by Y-level (generation)
        this.bucketSize = 1000; // Spatial bucket size
        this.maxDepth = 0; // Track tree depth for layout
        this.buildHierarchy();
    }

    buildHierarchy() {
        const processed = new Set();
        
        // Link partners and children
        this.nodes.forEach(node => {
            // Link partner
            if (node.pid) {
                node.partnerNode = this.nodes.get(node.pid);
            }

            // Find children
            this.nodes.forEach(potentialChild => {
                if (potentialChild.fid === node.id || potentialChild.mid === node.id) {
                    if (!node.children.includes(potentialChild)) {
                        node.children.push(potentialChild);
                    }
                }
            });
        });

        // Identify root (ID 1)
        this.root = this.nodes.get(1);
    }

    calculate(ctx) {
        if (!this.root) return;
        // Recursive layout calculation
        this.calculateSubtree(this.root, 0, new Set());
        
        // Center the whole tree roughly
        const bounds = this.getBounds();
        const offsetX = -bounds.minX + 50;
        const offsetY = 50;
        
        this.nodes.forEach(n => {
            n.x += offsetX;
            n.y += offsetY;
        });
    }

    calculateSubtree(node, depth, visited) {
        if (visited.has(node.id)) return 0;
        visited.add(node.id);

        const nodeWidth = CONFIG.cardWidth;
        
        // Base width is just this node (plus partner if exists)
        let subtreeWidth = 0;
        const hasPartner = !!node.partnerNode;
        const selfWidth = hasPartner ? (nodeWidth * 2 + CONFIG.partnerSpacing) : nodeWidth;

        if (node.children.length === 0) {
            subtreeWidth = selfWidth;
        } else {
            // Process children
            // We need to group children who are partners to keep them together
            const childGroups = [];
            let i = 0;
            
            const children = node.children;
            const processedChildren = new Set();

            while (i < children.length) {
                const child = children[i];
                if (processedChildren.has(child.id)) { i++; continue; }
                
                // Check if next sibling is partner
                let groupWidth = 0;
                let partner = null;
                
                // Try to find partner among siblings
                if (child.pid) {
                    partner = children.find(c => c.id === child.pid);
                }

                // Recursively layout child
                let childW = this.calculateSubtree(child, depth + 1, visited);
                
                if (partner) {
                        processedChildren.add(partner.id);
                }
                
                processedChildren.add(child.id);

                childGroups.push({ node: child, width: Math.max(childW, child.w) });
                i++;
            }

            // Sum up widths
            let totalChildrenWidth = 0;
            childGroups.forEach((g, idx) => {
                    totalChildrenWidth += g.width;
                    if (idx < childGroups.length - 1) totalChildrenWidth += CONFIG.horizontalSpacing;
            });

            subtreeWidth = Math.max(selfWidth, totalChildrenWidth);
        }
        
        return subtreeWidth;
    }

    // Simplified Reingold-Tilford-ish layout for Family Trees
    layout() {
            this.resetPositions();
            this.maxDepth = 0;
            this.widths(this.root, 0); // Pass depth 0
            this.layers = []; // Reset layers
            this.assignCoordinates(this.root, 0, 0);
    }

    resetPositions() {
        this.nodes.forEach(n => { n._w = 0; n.x = 0; n.y = 0; });
    }

    widths(node, depth = 0) {
        if(!node) return 0;
        
        this.maxDepth = Math.max(this.maxDepth, depth);

        const myWidth = node.partnerNode ? (CONFIG.cardWidth * 2 + CONFIG.partnerSpacing) : CONFIG.cardWidth;
        
        if (!node.children || node.children.length === 0) {
            node._treeWidth = myWidth;
            return myWidth;
        }

        let childrenWidth = 0;
        const groups = [];
        const visitedChildren = new Set();
        
        for(let i=0; i<node.children.length; i++) {
            const child = node.children[i];
            if(visitedChildren.has(child.id)) continue;
            visitedChildren.add(child.id);

            let nextChild = null;
            if (i < node.children.length - 1) {
                nextChild = node.children[i+1];
            }
            
            if (nextChild && child.pid === nextChild.id) {
                    visitedChildren.add(nextChild.id);
            }

            const w = this.widths(child, depth + 1); // Track depth
            groups.push({ node: child, width: w });
            childrenWidth += w;
        }
        
        childrenWidth += (groups.length - 1) * CONFIG.horizontalSpacing;
        
        node._childrenTotalWidth = childrenWidth;
        node._treeWidth = Math.max(myWidth, childrenWidth);
        node._childGroups = groups;
        return node._treeWidth;
    }

    // Calculates Y position based on depth using the "Tree-like" gap logic
    getYForDepth(depth) {
        let y = 50; // Initial Top Margin
        
        for (let i = 0; i < depth; i++) {
            // Logic: Gap(level) = Base + (MaxDepth - 1 - level) * Factor
            // Result: Closer to leaves (higher level index) -> Smaller multiplier -> Smaller gap
            // Closer to root (lower level index) -> Larger multiplier -> Larger gap
            const levelFactor = Math.max(0, this.maxDepth - 1 - i);
            const gap = CONFIG.verticalSpacingBase + (levelFactor * CONFIG.verticalSpacingFactor);
            y += gap;
        }
        return y;
    }

    addToSpatialIndex(node, depth) {
        if (!this.layers[depth]) {
            this.layers[depth] = { 
                y: node.y, 
                buckets: new Map(), // Map<bucketIndex, Node[]>
                allNodes: [] // List of all nodes in this layer for connections
            };
        }
        const layer = this.layers[depth];
        
        // Add to bucket
        const bucketIndex = Math.floor(node.x / this.bucketSize);
        if (!layer.buckets.has(bucketIndex)) {
            layer.buckets.set(bucketIndex, []);
        }
        layer.buckets.get(bucketIndex).push(node);
        
        // Add to flat list for connections
        layer.allNodes.push(node);
    }

    getNodesInRect(x, y, width, height) {
        const results = [];
        const minBucket = Math.floor(x / this.bucketSize);
        const maxBucket = Math.floor((x + width) / this.bucketSize);

        // Iterate through all layers first (Vertical culling)
        this.layers.forEach(layer => {
            if (!layer) return;
            // Strict vertical check: if layer is totally above or totally below rect, skip
            if (layer.y > y + height || layer.y + CONFIG.cardHeight < y) return;

            for (let b = minBucket; b <= maxBucket; b++) {
                const bucket = layer.buckets.get(b);
                if (bucket) {
                    for (const node of bucket) {
                         // Check exact collision
                         const hw = CONFIG.cardWidth / 2;
                         if (node.x + hw >= x && node.x - hw <= x + width) {
                             results.push(node);
                         }
                    }
                }
            }
        });
        return results;
    }

    assignCoordinates(node, x, depth) {
        if(!node) return;

        node.depth = depth;

        // Use dynamic Y calculation
        node.y = this.getYForDepth(depth);
        
        const hasPartner = !!node.partnerNode;
        const blockWidth = hasPartner ? (CONFIG.cardWidth * 2 + CONFIG.partnerSpacing) : CONFIG.cardWidth;
        
        if (hasPartner) {
            node.x = x - (blockWidth / 2) + (CONFIG.cardWidth / 2);
            // Partner position
            node.partnerNode.x = node.x + CONFIG.cardWidth + CONFIG.partnerSpacing;
            node.partnerNode.y = node.y;
            
            // Add partner to spatial index bucket
            this.addToSpatialIndex(node.partnerNode, depth);
        } else {
            node.x = x;
        }

        // Add node to spatial index bucket AFTER X is determined
        this.addToSpatialIndex(node, depth);

        if (node._childGroups && node._childGroups.length > 0) {
            let currentX = x - (node._childrenTotalWidth / 2); 
            
            node._childGroups.forEach(group => {
                const childCenter = currentX + (group.width / 2);
                this.assignCoordinates(group.node, childCenter, depth + 1);
                currentX += group.width + CONFIG.horizontalSpacing;
            });
        }
    }

    getBounds() {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        this.nodes.forEach(n => {
            minX = Math.min(minX, n.x - CONFIG.cardWidth/2);
            maxX = Math.max(maxX, n.x + CONFIG.cardWidth/2);
            minY = Math.min(minY, n.y);
            maxY = Math.max(maxY, n.y + CONFIG.cardHeight);
        });
        return { minX, maxX, minY, maxY, width: maxX-minX, height: maxY-minY };
    }
}

/**
 * RENDERER
 */
class TreeRenderer {
    constructor(canvasId, nodes) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d', { alpha: false }); // Optimize for no transparency on bg
        this.layoutEngine = new TreeLayout(nodes);
        this.imageManager = new ImageManager();
        this.selectedNodeId = null; // Track selected node
        this.hoveredNode = null; // Track hovered node
        this.mouseX = 0;
        this.mouseY = 0;
        
        // State
        this.transform = { x: 0, y: 0, k: 0.8 }; // Initial zoom
        this.isDragging = false;
        this.lastPos = { x: 0, y: 0 };
        this.lastPinchDist = 0; // Track pinch distance
        
        this.init();
    }

    init() {
        this.layoutEngine.layout();
        this.bindEvents();
        this.resize();
        
        requestAnimationFrame(() => this.loop());
        document.getElementById('loading').style.opacity = 0;
    }
    
    fitToScreen() {
        const bounds = this.layoutEngine.getBounds();
        // Get logical CSS pixels
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);
        const padding = 60; // Space around edges

        // Calculate ratios
        const scaleX = (width - padding * 2) / bounds.width;
        const scaleY = (height - padding * 2) / bounds.height;
        
        let scale = Math.min(scaleX, scaleY);
        scale = Math.min(scale, 1.0); 

        this.transform.k = scale;

        // Center view
        this.transform.x = (width - bounds.width * scale) / 2 - bounds.minX * scale;
        this.transform.y = (height - bounds.height * scale) / 2 - bounds.minY * scale;

        this.requestRender();
    }

    bindEvents() {
        const c = this.canvas;
        
        // Resize
        window.addEventListener('resize', () => this.resize());

        // Mouse / Touch
        c.addEventListener('mousedown', e => this.startDrag(e.clientX, e.clientY));
        c.addEventListener('mousemove', e => this.drag(e.clientX, e.clientY));
        c.addEventListener('mouseup', () => this.endDrag());
        c.addEventListener('mouseleave', () => this.endDrag());
        
        // Double click for selection
        c.addEventListener('dblclick', e => this.handleDoubleClick(e));
        
        c.addEventListener('wheel', e => this.zoom(e));

        // Touch support
        c.addEventListener('touchstart', e => {
            if(e.touches.length === 1) {
                this.startDrag(e.touches[0].clientX, e.touches[0].clientY);
                // Check click
                this.handleTap(e.touches[0].clientX, e.touches[0].clientY);
            } else if (e.touches.length === 2) {
                this.isDragging = false; // Prevent single finger drag conflicts
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                this.lastPinchDist = Math.sqrt(dx * dx + dy * dy);
                // Set center for panning
                this.lastPos = {
                    x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
                    y: (e.touches[0].clientY + e.touches[1].clientY) / 2
                };
            }
        }, {passive: false});
        
        c.addEventListener('touchmove', e => {
            e.preventDefault(); 
            if(e.touches.length === 1 && this.isDragging) {
                this.drag(e.touches[0].clientX, e.touches[0].clientY);
            } else if (e.touches.length === 2) {
                const t1 = e.touches[0];
                const t2 = e.touches[1];
                const currentX = (t1.clientX + t2.clientX) / 2;
                const currentY = (t1.clientY + t2.clientY) / 2;
                
                // Pan
                const dx = currentX - this.lastPos.x;
                const dy = currentY - this.lastPos.y;
                this.transform.x += dx;
                this.transform.y += dy;
                
                // Zoom
                const dist = Math.sqrt(Math.pow(t1.clientX - t2.clientX, 2) + Math.pow(t1.clientY - t2.clientY, 2));
                if (this.lastPinchDist > 0) {
                    const scale = dist / this.lastPinchDist;
                    const newK = Math.min(Math.max(0.02, this.transform.k * scale), 5);
                    
                    // Zoom towards center
                    const ratio = newK / this.transform.k;
                    this.transform.x = currentX - (currentX - this.transform.x) * ratio;
                    this.transform.y = currentY - (currentY - this.transform.y) * ratio;
                    this.transform.k = newK;
                }
                
                this.lastPos = { x: currentX, y: currentY };
                this.lastPinchDist = dist;
                this.requestRender();
            }
        }, {passive: false});
        
        c.addEventListener('touchend', e => {
            this.endDrag();
            this.lastPinchDist = 0;
            if (e.touches.length === 1) {
                 this.startDrag(e.touches[0].clientX, e.touches[0].clientY);
            }
        });

        // Click detection
        c.addEventListener('click', e => this.handleClick(e));

        document.getElementById('btnRecenter').addEventListener('click', () => {
                this.fitToScreen();
        });
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(dpr, dpr);
        this.requestRender();
    }

    startDrag(x, y) {
        this.isDragging = true;
        this.lastPos = { x, y };
        this.canvas.style.cursor = 'grabbing';
        // Fix for stuck tooltip on mobile/drag
        if (this.hoveredNode) {
            this.hoveredNode = null;
            this.requestRender();
        }
    }

    drag(x, y) {
        if (this.isDragging) {
            const dx = x - this.lastPos.x;
            const dy = y - this.lastPos.y;
            this.transform.x += dx;
            this.transform.y += dy;
            this.lastPos = { x, y };
            this.requestRender();
        } else {
            this.handleHover(x, y);
        }
    }

    handleHover(sx, sy) {
        this.mouseX = sx;
        this.mouseY = sy;

        const pos = this.screenToWorld(sx, sy);
        let cursor = 'grab';
        
        // Optimized Hit Test: Use spatial index instead of iterating all nodes
        const candidates = this.layoutEngine.getNodesInRect(pos.x, pos.y, 1, 1); // 1x1 rect for point
        let hovered = null;

        for (const node of candidates) {
            const hw = CONFIG.cardWidth / 2;
            // Check bounds of card
            if (pos.x >= node.x - hw && pos.x <= node.x + hw &&
                pos.y >= node.y && pos.y <= node.y + CONFIG.cardHeight) {
                
                hovered = node;

                if (node.fb) {
                    const cardLeft = node.x - hw;
                    const iconX = cardLeft + CONFIG.cardWidth - 24;
                    const iconY = node.y + 8;
                    
                    if (pos.x >= iconX && pos.x <= iconX + 16 &&
                        pos.y >= iconY && pos.y <= iconY + 16) {
                        cursor = 'pointer';
                    }
                }
                break;
            }
        }

        if (this.hoveredNode !== hovered) {
            this.hoveredNode = hovered;
            this.requestRender();
        }

        this.canvas.style.cursor = cursor;
    }

    endDrag() {
        this.isDragging = false;
        if (this.canvas.style.cursor === 'grabbing') {
            this.canvas.style.cursor = 'grab';
        }
    }

    zoom(e) {
        e.preventDefault();
        const zoomSpeed = 0.001;
        const zoomFactor = Math.exp(-e.deltaY * zoomSpeed);
        
        // Zoom towards mouse pointer
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Increased zoom out capability to fit larger trees
        const newScale = Math.min(Math.max(0.02, this.transform.k * zoomFactor), 5);
        
        this.transform.x = mouseX - (mouseX - this.transform.x) * (newScale / this.transform.k);
        this.transform.y = mouseY - (mouseY - this.transform.y) * (newScale / this.transform.k);
        this.transform.k = newScale;
        
        this.requestRender();
    }

    screenToWorld(sx, sy) {
        return {
            x: (sx - this.transform.x) / this.transform.k,
            y: (sy - this.transform.y) / this.transform.k
        };
    }

    handleTap(sx, sy) {
            // Simple wrapper for click logic on touch
            this.handleClick({clientX: sx, clientY: sy});
    }

    handleDoubleClick(e) {
        const pos = this.screenToWorld(e.clientX, e.clientY);
        let clickedNode = null;
        
        // Optimized Hit Test
        const candidates = this.layoutEngine.getNodesInRect(pos.x, pos.y, 1, 1);

        for (const node of candidates) {
            const hw = CONFIG.cardWidth / 2;
            if (pos.x >= node.x - hw && pos.x <= node.x + hw &&
                pos.y >= node.y && pos.y <= node.y + CONFIG.cardHeight) {
                clickedNode = node;
                break;
            }
        }

        if (clickedNode) {
            this.selectNode(clickedNode);
        } else {
            this.selectedNodeId = null; // Deselect
            
            // Clear URL parameter
            const url = new URL(window.location);
            url.searchParams.delete('id');
            window.history.replaceState({}, '', url);

            this.requestRender();
        }
    }

    selectNode(node) {
        this.selectedNodeId = node.id;
        
        // Focus and zoom on the selected node
        const targetScale = 2.5; 
        const rect = this.canvas.getBoundingClientRect();
        
        // Calculate translation to center the node
        this.transform.k = targetScale;
        this.transform.x = (rect.width / 2) - (node.x * targetScale);
        this.transform.y = (rect.height / 2) - ((node.y + CONFIG.cardHeight / 2) * targetScale);
        
        // Update URL parameter without reloading
        const url = new URL(window.location);
        url.searchParams.set('id', node.id);
        window.history.replaceState({}, '', url);

        this.requestRender();
    }

    handleClick(e) {
        if (this.isDragging && (Math.abs(e.clientX - this.lastPos.x) > 5 || Math.abs(e.clientY - this.lastPos.y) > 5)) return; // It was a drag

        const pos = this.screenToWorld(e.clientX, e.clientY);
        
        // Optimized Hit Test
        const candidates = this.layoutEngine.getNodesInRect(pos.x, pos.y, 1, 1);
        
        for (const node of candidates) {
            const hw = CONFIG.cardWidth / 2;
            if (pos.x >= node.x - hw && pos.x <= node.x + hw &&
                pos.y >= node.y && pos.y <= node.y + CONFIG.cardHeight) {
                
                // Clicked a node
                if (node.fb) {
                        const cardLeft = node.x - hw;
                        const iconX = cardLeft + CONFIG.cardWidth - 24;
                        const iconY = node.y + 8;
                        
                        if (pos.x >= iconX && pos.x <= iconX + 16 &&
                            pos.y >= iconY && pos.y <= iconY + 16) {
                            this.openFacebook(node.fb);
                        }
                }
                break;
            }
        }
    }

    openFacebook(fb) {
        const ending = fb.startsWith("profile.php") ? "" : "/";
        const url = `https://www.facebook.com/${fb}${ending}`;
        window.open(url, '_blank');
    }

    requestRender() {
        if (!this.ticking) {
            requestAnimationFrame(() => this.loop());
            this.ticking = true;
        }
    }

    loop() {
        this.ticking = false;
        const ctx = this.ctx;
        const width = this.canvas.width / (window.devicePixelRatio||1);
        const height = this.canvas.height / (window.devicePixelRatio||1);
        
        const tStart = performance.now();

        // Clear
        ctx.fillStyle = "#f5f5f5";
        ctx.fillRect(0, 0, width, height);
        const tClear = performance.now();

        // Draw Timeline (Static on left)
        this.drawTimeline(ctx, height);
        const tTimeline = performance.now();

        // Setup Transform
        ctx.save();
        ctx.translate(this.transform.x, this.transform.y);
        ctx.scale(this.transform.k, this.transform.k);

        // Draw Connections First
        this.drawConnections(ctx);
        const tConnections = performance.now();

        // Draw Nodes
        this.drawNodes(ctx);
        const tNodes = performance.now();

        ctx.restore();

        const tEnd = performance.now();

        if (CONFIG.debug) {
            this.drawDebugInfo(ctx, {
                'Clear': tClear - tStart,
                'Timeline': tTimeline - tClear,
                'Connections': tConnections - tTimeline,
                'Nodes': tNodes - tConnections,
                'Total Frame': tEnd - tStart
            });
        }
    }

    drawDebugInfo(ctx, metrics) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform for UI
        
        // Background
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(10, 10, 200, 150);
        
        // Text
        ctx.fillStyle = "#0f0";
        ctx.font = "12px monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        
        let y = 20;
        ctx.fillText("Performance (ms)", 20, y);
        y += 20;
        
        for (const [label, time] of Object.entries(metrics)) {
            ctx.fillStyle = label === 'Total Frame' ? '#fff' : '#0f0';
            ctx.fillText(`${label}: ${time.toFixed(2)}`, 20, y);
            y += 15;
        }
        
        ctx.restore();
    }
    
    // In TreeRenderer class
    getFittedText(ctx, node, type, text, maxWidth) {
        // Simple in-memory cache on the node object itself
        const cacheKey = `_fit_${type}`;
        if (node[cacheKey] !== undefined) return node[cacheKey];

        let width = ctx.measureText(text).width;
        let result = text;
        if (width > maxWidth) {
            let ellipsis = '...';
            let truncated = text;
            while (ctx.measureText(truncated + ellipsis).width > maxWidth && truncated.length > 0) {
                truncated = truncated.slice(0, -1);
            }
            result = truncated + ellipsis;
        }
        node[cacheKey] = result;
        return result;
    }

    drawNodes(ctx) {
        const halfW = CONFIG.cardWidth / 2;
        const scale = this.transform.k;
        
        // Determine LOD Level
        let lod = 2; // High
        if (scale < 0.1) lod = 0; // Low (Box) - Changed from 0.2
        else if (scale < 0.3) lod = 1; // Medium (No shadow/dates) - Changed from 0.6

        // High-res threshold (only load when really close)
        const useHighRes = scale > 1.2;

        // Culling: Only draw visible layers and visible buckets
        const viewL = -this.transform.x / scale;
        const viewT = -this.transform.y / scale;
        const viewW = this.canvas.width / (window.devicePixelRatio||1) / scale;
        const viewH = this.canvas.height / (window.devicePixelRatio||1) / scale;
        const viewR = viewL + viewW;
        const viewB = viewT + viewH;

        // Bucket Range
        const minBucket = Math.floor((viewL - CONFIG.cardWidth) / this.layoutEngine.bucketSize);
        const maxBucket = Math.floor((viewR + CONFIG.cardWidth) / this.layoutEngine.bucketSize);

        this.layoutEngine.layers.forEach(layer => {
            if (!layer) return;
            // Vertical Culling
            if (layer.y + CONFIG.cardHeight < viewT || layer.y > viewB) return;

            // Iterate only visible buckets
            for (let b = minBucket; b <= maxBucket; b++) {
                const bucket = layer.buckets.get(b);
                if (!bucket) continue;

                for (const node of bucket) {
                    // Fine-grained Horizontal Culling
                    if (node.x + halfW < viewL || node.x - halfW > viewR) continue;

                    // Skip hovered node to draw it last (on top)
                    if (node === this.hoveredNode) continue; 

                    this.drawSingleNode(ctx, node, lod, useHighRes);
                }
            }
        });

        // Draw hovered node last
        if (this.hoveredNode) {
             this.drawSingleNode(ctx, this.hoveredNode, lod, useHighRes);
        }
    }

    drawSingleNode(ctx, node, lod, useHighRes) {
        const x = node.x - CONFIG.cardWidth / 2;
        const y = node.y;
        const w = CONFIG.cardWidth;
        const h = CONFIG.cardHeight;
        const r = 8; // border radius

        // Common: Background & Border
        ctx.fillStyle = CONFIG.defaultColor;
        
        // Shadow only on High LOD
        if (lod === 2) {
            ctx.shadowColor = "rgba(0,0,0,0.1)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetY = 2;
        }
        
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        ctx.fill();
        ctx.shadowColor = "transparent";

        // Border
        if (node.id === this.selectedNodeId) {
            ctx.lineWidth = 4;
            ctx.strokeStyle = CONFIG.selectedBorderColor;
        } else {
            ctx.lineWidth = 2;
            ctx.strokeStyle = (node.death === undefined) ? CONFIG.aliveBorderColor : CONFIG.deadBorderColor;
        }
        ctx.stroke();

        // Geometry calculations for content
        const imgSize = CONFIG.avatarSize;
        const imgX = x + (w - imgSize) / 2; 
        const imgY = y + 15;
        const radius = imgSize / 2;
        const centerX = imgX + radius;
        const centerY = imgY + radius;

        // --- LOD < 2 (Abstract View) ---
        if (lod < 2) {
            // 1. Avatar Circle (Grey OR AvgColor)
            const imgData = this.imageManager.get(node, false);
            // Use average color if available, otherwise fallback to grey
            ctx.fillStyle = (imgData && imgData.avgColor) ? imgData.avgColor : "#e0e0e0";
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();

            // 2. FB Dot (Blue)
            if (node.fb) {
                 ctx.fillStyle = "#1877F2";
                 ctx.beginPath();
                 ctx.arc(x + w - 20, y + 20, 6, 0, Math.PI * 2); 
                 ctx.fill();
            }

            // 3. Text Lines
            const textCenterX = x + w / 2;
            let textY = imgY + imgSize + 20;
            
            // Name Line
            ctx.fillStyle = "#d0d0d0";
            const nameWidth = 80;
            ctx.beginPath();
            ctx.roundRect(textCenterX - nameWidth/2, textY, nameWidth, 12, 4);
            ctx.fill();
            
            // Profession Line
            if (node.profession) {
                ctx.fillStyle = "#e8e8e8";
                const profWidth = 60;
                ctx.beginPath();
                ctx.roundRect(textCenterX - profWidth/2, textY + 18, profWidth, 10, 4);
                ctx.fill();
            }
            
            return;
        }

        // --- LOD 2 (High Detail) ---
        
        // Image
        const imgData = this.imageManager.get(node, useHighRes);
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.clip();
        
        if (imgData && imgData.loaded) {
            ctx.drawImage(imgData.img, imgX, imgY, imgSize, imgSize);
        } else {
            ctx.fillStyle = "#eee";
            ctx.fillRect(imgX, imgY, imgSize, imgSize);
            ctx.fillStyle = "#aaa";
            ctx.font = "24px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(node.name.charAt(0), centerX, centerY);
        }
        ctx.restore();

        // Text
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        const textCenterX = x + w / 2;
        let textY = imgY + imgSize + 15;

        // Name
        ctx.fillStyle = CONFIG.textColor;
        ctx.font = CONFIG.fontMain;
        
        // Name Logic: Show full if hovered, otherwise truncated (cached)
        const maxWidth = CONFIG.cardWidth - 10;
        let nameText;
        if (node === this.hoveredNode) {
            nameText = node.name;
        } else {
            nameText = this.getFittedText(ctx, node, 'name', node.name, maxWidth);
        }
        ctx.fillText(nameText, textCenterX, textY);
        
        // Facebook Icon
        if (node.fb) {
            ctx.drawImage(this.imageManager.facebookIcon, x + w - 24, y + 8, 16, 16);
        }

        textY += 18;

        // Profession
        if (node.profession) {
            ctx.fillStyle = "#666";
            ctx.font = CONFIG.fontSub;
            
            // Profession Logic: Show full if hovered, otherwise truncated (cached)
            let profText;
            if (node === this.hoveredNode) {
                profText = node.profession;
            } else {
                profText = this.getFittedText(ctx, node, 'prof', node.profession, maxWidth);
            }
            ctx.fillText(profText, textCenterX, textY);
            
            textY += 16;
        }

        // Dates (Corners)
        ctx.fillStyle = "#888";
        ctx.font = CONFIG.fontSmall;
        const padding = 10;
        const footerY = y + h - 15;

        // Birth (Bottom Left)
        if (node.birth) {
            ctx.textAlign = "left";
            ctx.fillText(node.birth, x + padding, footerY);
        }

        // Death (Bottom Right)
        if (node.death) {
            ctx.textAlign = "right";
            ctx.fillText(node.death, x + w - padding, footerY);
        }
    }

    drawConnections(ctx) {
        const scale = this.transform.k;
        const getLineWidth = (baseWidth) => Math.max(baseWidth * scale, 1) / scale;
        
        ctx.strokeStyle = "#ccc";

        // View bounds for connection culling
        const viewL = -this.transform.x / scale;
        const viewT = -this.transform.y / scale;
        const viewW = this.canvas.width / (window.devicePixelRatio||1) / scale;
        const viewH = this.canvas.height / (window.devicePixelRatio||1) / scale;
        const viewB = viewT + viewH;
        
        // Bucket Range
        const minBucket = Math.floor((viewL - CONFIG.cardWidth) / this.layoutEngine.bucketSize);
        const maxBucket = Math.floor((viewL + viewW + CONFIG.cardWidth) / this.layoutEngine.bucketSize);

        // Connections often span vertical layers (parent -> child), so we check a slightly larger vertical range
        // Or we iterate visible layers and draw outgoing connections.
        
        this.layoutEngine.layers.forEach((layer, depth) => {
             if (!layer) return;
             // Check if layer or the one below it is visible (since connections go down)
             const nextLayerY = this.layoutEngine.getYForDepth(depth + 1);
             if (nextLayerY < viewT || layer.y > viewB) return;

             // Iterate ALL nodes in this visible layer to ensure connections are drawn
             // even if parent is horizontally off-screen
             for (const node of layer.allNodes) {
                 // 1. Partner connections
                 if (node.partnerNode && node.id < node.partnerNode.id) {
                     ctx.save();
                     const nodeDepth = node.depth || 0;
                     const baseThick = Math.max(1.5, 5 - nodeDepth * 0.5); 
                     ctx.lineWidth = getLineWidth(baseThick);
                     ctx.setLineDash([6 / scale, 4 / scale]); 
                     
                     ctx.beginPath();
                     const yLevel = node.y + CONFIG.cardHeight * 0.8;
                     const x1 = node.x + CONFIG.cardWidth/2;
                     const x2 = node.partnerNode.x - CONFIG.cardWidth/2;
                     ctx.moveTo(x1, yLevel);
                     ctx.lineTo(x2, yLevel);
                     ctx.stroke();
                     ctx.restore();
                 }

                 // 2. Children connections
                 if (node.children && node.children.length > 0) {
                     node.children.forEach(child => {
                         const father = child.fid ? this.layoutEngine.nodes.get(child.fid) : null;
                         const mother = child.mid ? this.layoutEngine.nodes.get(child.mid) : null;
                         const hasTwoParents = father && mother;
                         
                         if (hasTwoParents && node.id !== father.id) return;
                         
                         let originX = node.x;
                         let originY = node.y + CONFIG.cardHeight; 
                         if (hasTwoParents) {
                             originX = (father.x + mother.x) / 2;
                             originY = father.y + CONFIG.cardHeight * 0.8;
                         }
                         const destX = child.x;
                         const destY = child.y;
                         const midY = (originY + destY) / 2;

                         const childDepth = child.depth || 0;
                         const thickness = Math.max(1.5, 8 - childDepth * 0.7);
                         
                         ctx.lineWidth = getLineWidth(thickness);

                         ctx.beginPath();
                         ctx.moveTo(originX, originY);
                         ctx.bezierCurveTo(originX, midY, destX, midY, destX, destY);
                         ctx.stroke();
                     });
                 }
             }
        });
    }

    drawTimeline(ctx, h) {
        // Calculate levels
        const levels = {};
        this.layoutEngine.nodes.forEach(n => {
                const lvl = Math.round(n.y);
                if (!levels[lvl]) levels[lvl] = [];
                if (n.birth && typeof n.birth === 'number') levels[lvl].push(n.birth);
        });

        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.font = "bold 12px Arial";
        
        Object.keys(levels).forEach(yPos => {
            const births = levels[yPos];
            if (births.length > 0) {
                const avg = Math.round(births.reduce((a,b)=>a+b,0)/births.length);
                // Calculate screen Y
                const screenY = (parseInt(yPos) * this.transform.k) + this.transform.y;
                
                if (screenY > 0 && screenY < h) {
                    ctx.fillText(avg, 20, screenY);
                    // Draw small tick
                    ctx.fillRect(10, screenY, 5, 1);
                }
            }
        });
        ctx.restore();
    }
}

// Global redraw trigger for image loading
let appInstance = null;
function requestRedraw() {
    if (appInstance) appInstance.requestRender();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    appInstance = new TreeRenderer('treeCanvas', rawNodes);
    setupSearch();

    // Check URL for specific node selection (e.g., ?id=28)
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    if (idParam) {
        const nodeId = parseInt(idParam);
        // Access nodes from the layout engine which uses a Map
        const node = appInstance.layoutEngine.nodes.get(nodeId);
        if (node) {
            appInstance.selectNode(node);
        }
    } else {
        // Only fit to screen if no ID is provided
        appInstance.fitToScreen();
    }
});

function setupSearch() {
    const input = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');
    let currentMatches = [];
    let selectedIndex = 0;

    function selectResult(node) {
        const internalNode = appInstance.layoutEngine.nodes.get(node.id);
        if (internalNode) {
            appInstance.selectNode(internalNode);
        }
        
        input.value = '';
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
    }

    function renderList() {
        resultsContainer.innerHTML = '';
        currentMatches.forEach((node, index) => {
            const div = document.createElement('div');
            div.className = `search-result-item${index === selectedIndex ? ' selected' : ''}`;
            
            let imgHtml = `<div class="search-avatar">${node.name[0]}</div>`;
            if (node.image) {
                imgHtml = `<img src="${CONFIG.thumbnailPath + node.image}" class="search-avatar" onerror="this.parentElement.innerHTML='<div class=\\'search-avatar\\'>${node.name[0]}</div>'">`;
            }

            // Add profession if exists
            const nameDisplay = node.profession ? `${node.name} - ${node.profession}` : node.name;

            div.innerHTML = `
                ${imgHtml}
                <div class="search-info">
                    <span class="search-name">${nameDisplay}</span>
                    <span class="search-meta">${node.birth || '?'} - ${node.death || '?'}</span>
                </div>
            `;
            
            div.addEventListener('click', () => selectResult(node));
            
            // Mouse enter sets selected index for keyboard continuity
            div.addEventListener('mouseenter', () => {
                selectedIndex = index;
                updateSelection();
            });

            resultsContainer.appendChild(div);
        });
    }

    function updateSelection() {
        const items = resultsContainer.children;
        for (let i = 0; i < items.length; i++) {
            if (i === selectedIndex) items[i].classList.add('selected');
            else items[i].classList.remove('selected');
        }
        
        // Ensure visible
        if (items[selectedIndex]) {
            const item = items[selectedIndex];
            const containerTop = resultsContainer.scrollTop;
            const containerBottom = containerTop + resultsContainer.clientHeight;
            const itemTop = item.offsetTop;
            const itemBottom = itemTop + item.offsetHeight;

            if (itemTop < containerTop) {
                resultsContainer.scrollTop = itemTop;
            } else if (itemBottom > containerBottom) {
                resultsContainer.scrollTop = itemBottom - resultsContainer.clientHeight;
            }
        }
    }

    input.addEventListener('keydown', (e) => {
        if (resultsContainer.style.display === 'none') return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % currentMatches.length;
            updateSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + currentMatches.length) % currentMatches.length;
            updateSelection();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentMatches[selectedIndex]) {
                selectResult(currentMatches[selectedIndex]);
            }
        }
    });

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        // Filter nodes
        const matches = rawNodes.filter(node => 
            node.name.toLowerCase().includes(query)
        );

        currentMatches = matches.slice(0, 10);
        selectedIndex = 0; // Reset selection to top

        if (currentMatches.length > 0) {
            resultsContainer.style.display = 'block';
            renderList();
        } else {
            resultsContainer.style.display = 'none';
        }
    });

    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            resultsContainer.style.display = 'none';
        }
    });
}