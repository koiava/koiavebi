/**
 * FAMILY TREE CONFIGURATION & DATA
 */
const CONFIG = {
    cardWidth: 140,  
    cardHeight: 180, 
    horizontalSpacing: 30, 
    
    // Dynamic Vertical Spacing Configuration
    verticalSpacingBase: 230, 
    verticalSpacingFactor: 200, 
    
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

/**
 * IMAGE MANAGER
 * Handles loading and caching of profile images.
 */
class ImageManager {
    constructor() {
        this.thumbnails = new Map();
        this.fullImages = new Map();
        this.placeholderCache = new Map();
        
        // Simple blue placeholder (Base64)
        this.facebookIcon = new Image();
        this.facebookIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGP8//8/AyUYGhoKgPj/gXTA/wHRCCTG3///B0QjYwMDKQaA+H9ANAIAAOvD/fexx48hAAAAAElFTkSuQmCC';
        
        const realFb = new Image();
        realFb.onload = () => { this.facebookIcon = realFb; requestRedraw(); };
        realFb.src = 'images/icons/fb.png';
        
        // Helper canvas for color extraction
        this.helperCanvas = document.createElement('canvas');
        this.helperCanvas.width = 1;
        this.helperCanvas.height = 1;
        this.helperCtx = this.helperCanvas.getContext('2d', { willReadFrequently: true });
    }
    
    _computeAverageColor(img) {
        try {
            this.helperCtx.clearRect(0, 0, 1, 1);
            this.helperCtx.drawImage(img, 0, 0, 1, 1);
            const p = this.helperCtx.getImageData(0, 0, 1, 1).data;
            if (p[3] < 5) return null; 
            return `rgb(${p[0]},${p[1]},${p[2]})`;
        } catch(e) {
            return null;
        }
    }
    
    _load(src, map, key, nameForFallback) {
        if (map.has(key)) return map.get(key);
        
        const imgObj = { img: new Image(), loaded: false, error: false, avgColor: null };
        imgObj.img.src = src;
        
        map.set(key, imgObj); 

        imgObj.img.onload = () => {
            imgObj.loaded = true;
            imgObj.avgColor = this._computeAverageColor(imgObj.img);
            requestRedraw();
        };
        imgObj.img.onerror = () => {
            imgObj.error = true;
            imgObj.avgColor = null; 
        };
        return imgObj;
    }

    get(node, highQuality) {
        if (!node.image) return null;

        let thumb = this._load(CONFIG.thumbnailPath + node.image, this.thumbnails, node.image, node.name);

        if (highQuality) {
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
        // Safe check for nodes array
        const safeNodes = Array.isArray(nodes) ? nodes : [];
        this.nodes = new Map(safeNodes.map(n => [n.id, { ...n, w: CONFIG.cardWidth, h: CONFIG.cardHeight, x: 0, y: 0, children: [] }]));
        this.trees = []; // Supports multiple disconnected trees
        this.root = null; // Main root (first tree)
        this.layers = []; 
        this.bucketSize = 1000; 
        this.maxDepth = 0; 
        
        if (this.nodes.size > 0) {
            this.buildHierarchy();
        }
    }

    buildHierarchy() {
        // Link partners and children
        this.nodes.forEach(node => {
            // Initialize partners array to handle multiple partners
            node.partners = [];

            // 1. Current Partner (pid)
            if (node.pid) {
                const partner = this.nodes.get(node.pid);
                if (partner) {
                    node.partnerNode = partner; // Keep legacy ref for safety
                    node.partners.push({ node: partner, type: 'current' });
                }
            }

            // 2. Previous Partners (prevpids)
            if (node.prevpids && Array.isArray(node.prevpids)) {
                node.prevpids.forEach(pid => {
                    const prevPartner = this.nodes.get(pid);
                    if (prevPartner) {
                        node.partners.push({ node: prevPartner, type: 'previous' });
                    }
                });
            }

            this.nodes.forEach(potentialChild => {
                if (potentialChild.fid === node.id || potentialChild.mid === node.id) {
                    if (!node.children.includes(potentialChild)) {
                        node.children.push(potentialChild);
                    }
                }
            });
        });

        // IDENTIFY DISCONNECTED TREES (FOREST)
        const visited = new Set();
        
        // Helper to find all connected nodes (Component)
        const getComponent = (startNode) => {
            const component = new Set();
            const stack = [startNode];
            while(stack.length > 0) {
                const n = stack.pop();
                if(component.has(n.id)) continue;
                component.add(n.id);
                
                // Add neighbors: children, partners, parents
                n.children.forEach(c => stack.push(c));
                if(n.partners) n.partners.forEach(p => stack.push(p.node));
                if(n.fid && this.nodes.has(n.fid)) stack.push(this.nodes.get(n.fid));
                if(n.mid && this.nodes.has(n.mid)) stack.push(this.nodes.get(n.mid));
            }
            return component;
        };

        // Scan all nodes to find unconnected components
        this.nodes.forEach(node => {
            if (visited.has(node.id)) return;
            
            const componentIds = getComponent(node);
            componentIds.forEach(id => visited.add(id));
            
            // Find Root for this specific component
            // Root is someone with NO parents inside this component
            let possibleRoots = [];
            componentIds.forEach(id => {
                const n = this.nodes.get(id);
                const hasFather = n.fid && componentIds.has(n.fid);
                const hasMother = n.mid && componentIds.has(n.mid);
                if (!hasFather && !hasMother) {
                    possibleRoots.push(n);
                }
            });
            
            // Heuristic: Prefer ID 1 or lowest ID (usually oldest entry)
            possibleRoots.sort((a, b) => a.id - b.id);
            const compRoot = possibleRoots.length > 0 ? possibleRoots[0] : node;
            
            this.trees.push({ root: compRoot, ids: componentIds });
        });

        // Set primary root to first tree's root for legacy/default view
        if (this.trees.length > 0) this.root = this.trees[0].root;
    }

    // Main Layout Function
    layout() {
        this.resetPositions();
        this.layers = []; // Global layers
        
        // 1. Calculate stats for each tree (depth, width)
        let globalMaxDepth = 0;
        
        this.trees.forEach(tree => {
            this.maxDepth = 0; // Reset local max depth tracker
            this.widths(tree.root, 0);
            tree.maxDepth = this.maxDepth;
            tree.width = tree.root._treeWidth;
            if (tree.maxDepth > globalMaxDepth) globalMaxDepth = tree.maxDepth;
        });
        
        this.maxDepth = globalMaxDepth; // Set global max depth for gap calculations
        
        // 2. Position trees side-by-side
        let currentXCursor = 0;
        const treeSpacing = 150; // Gap between independent trees
        
        this.trees.forEach(tree => {
            // BOTTOM ALIGNMENT LOGIC:
            // Shift shallower trees DOWN so their leaves align with the deepest tree.
            // If GlobalMax=5, TreeMax=3. Tree needs to start at level 2 (5-3).
            const depthOffset = globalMaxDepth - tree.maxDepth;
            
            // Assign coordinates relative to 0
            this.assignCoordinates(tree.root, 0, 0, depthOffset);
            
            // Calculate bounds of this tree to shift it
            let minX = Infinity, maxX = -Infinity;
            tree.ids.forEach(id => {
                const n = this.nodes.get(id);
                minX = Math.min(minX, n.x - CONFIG.cardWidth/2);
                maxX = Math.max(maxX, n.x + CONFIG.cardWidth/2);
            });
            
            const treeWidth = maxX - minX;
            const shiftX = currentXCursor - minX;
            
            // Apply Shift to all nodes in this tree
            tree.ids.forEach(id => {
                const n = this.nodes.get(id);
                n.x += shiftX;
            });
            
            currentXCursor += treeWidth + treeSpacing;
        });
        
        // 3. Build Global Spatial Index (Layers)
        this.nodes.forEach(node => {
            // Use globalDepth for consistent layer indexing
            this.addToSpatialIndex(node, node.globalDepth || 0);
        });
    }

    resetPositions() {
        this.nodes.forEach(n => { n._w = 0; n.x = 0; n.y = 0; });
    }

    widths(node, depth = 0) {
        if(!node) return 0;
        
        this.maxDepth = Math.max(this.maxDepth, depth);

        // Width of Node + All Partners
        const partnerCount = node.partners ? node.partners.length : 0;
        const myWidth = CONFIG.cardWidth + (partnerCount * (CONFIG.cardWidth + CONFIG.partnerSpacing));
        
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

            // Mark partners as visited so we don't process them as siblings
            if (child.partners) {
                child.partners.forEach(p => visitedChildren.add(p.node.id));
            }

            const w = this.widths(child, depth + 1); 
            groups.push({ node: child, width: w });
            childrenWidth += w;
        }
        
        childrenWidth += (groups.length - 1) * CONFIG.horizontalSpacing;
        
        node._childrenTotalWidth = childrenWidth;
        node._treeWidth = Math.max(myWidth, childrenWidth);
        node._childGroups = groups;
        return node._treeWidth;
    }

    getYForDepth(depth) {
        let y = 50; 
        for (let i = 0; i < depth; i++) {
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
                buckets: new Map(), 
                allNodes: [] 
            };
        }
        const layer = this.layers[depth];
        
        const bucketIndex = Math.floor(node.x / this.bucketSize);
        if (!layer.buckets.has(bucketIndex)) {
            layer.buckets.set(bucketIndex, []);
        }
        layer.buckets.get(bucketIndex).push(node);
        layer.allNodes.push(node);
    }

    getNodesInRect(x, y, width, height) {
        const results = [];
        const minBucket = Math.floor(x / this.bucketSize);
        const maxBucket = Math.floor((x + width) / this.bucketSize);

        this.layers.forEach(layer => {
            if (!layer) return;
            if (layer.y > y + height || layer.y + CONFIG.cardHeight < y) return;

            for (let b = minBucket; b <= maxBucket; b++) {
                const bucket = layer.buckets.get(b);
                if (bucket) {
                    for (const node of bucket) {
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

    assignCoordinates(node, x, depth, depthOffset = 0) {
        if(!node) return;

        // Apply global offset to depth so trees align at the bottom
        const globalDepth = depth + depthOffset;
        node.depth = depth; // Local depth relative to tree root
        node.globalDepth = globalDepth; // Global depth for spatial index and drawing layers
        node.y = this.getYForDepth(globalDepth);
        
        const partnerCount = node.partners ? node.partners.length : 0;
        const blockWidth = CONFIG.cardWidth + (partnerCount * (CONFIG.cardWidth + CONFIG.partnerSpacing));
        
        node.x = x - (blockWidth / 2) + (CONFIG.cardWidth / 2);
        
        // NOTE: We do NOT add to spatial index here because x will be shifted later.
        // Spatial indexing happens in layout() after final shifting.

        if (node.partners) {
            let currentX = node.x;
            node.partners.forEach(p => {
                currentX += CONFIG.cardWidth + CONFIG.partnerSpacing;
                p.node.x = currentX;
                p.node.y = node.y;
                p.node.depth = depth;
                p.node.globalDepth = globalDepth;
            });
        }

        if (node._childGroups && node._childGroups.length > 0) {
            let currentX = x - (node._childrenTotalWidth / 2); 
            
            node._childGroups.forEach(group => {
                const childCenter = currentX + (group.width / 2);
                this.assignCoordinates(group.node, childCenter, depth + 1, depthOffset);
                currentX += group.width + CONFIG.horizontalSpacing;
            });
        }
    }

    getBounds() {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        if (this.nodes.size === 0) return { minX: 0, maxX: 100, minY: 0, maxY: 100, width: 100, height: 100 };
        
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
        this.ctx = this.canvas.getContext('2d', { alpha: false }); 
        this.layoutEngine = new TreeLayout(nodes);
        this.imageManager = new ImageManager();
        this.selectedNodeId = null; 
        this.hoveredNode = null; 
        this.mouseX = 0;
        this.mouseY = 0;
        
        // State
        this.transform = { x: 0, y: 0, k: 0.8 }; 
        this.isDragging = false;
        this.lastPos = { x: 0, y: 0 };
        this.lastPinchDist = 0; 

        // --- PERFORMANCE OPTIMIZATION: INTERACTION STATE ---
        this.isInteracting = false;
        this.interactionTimer = null;

        // Double tap state
        this.lastTapTime = 0;
        
        // Simple mobile detection (UA or Screen Width)
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.matchMedia && window.matchMedia("(max-width: 768px)").matches);
        
        this.init();
    }

    init() {
        this.layoutEngine.layout();
        this.bindEvents();
        this.resize();
        
        requestAnimationFrame(() => this.loop());
        const loadingEl = document.getElementById('loading');
        if(loadingEl) loadingEl.style.opacity = 0;
    }

    // New Helper: Manage Interaction State
    setInteraction(active) {
        if (active) {
            // Immediate high-performance mode
            if (!this.isInteracting) {
                this.isInteracting = true;
                this.requestRender();
            }
            if (this.interactionTimer) clearTimeout(this.interactionTimer);
        } else {
            // Debounce the return to high quality
            if (this.interactionTimer) clearTimeout(this.interactionTimer);
            this.interactionTimer = setTimeout(() => {
                this.isInteracting = false;
                this.requestRender();
            }, 200); // 200ms delay to ensure motion stopped
        }
    }
    
    fitToScreen() {
        const bounds = this.layoutEngine.getBounds();
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);
        const padding = 60; 

        const scaleX = (width - padding * 2) / bounds.width;
        const scaleY = (height - padding * 2) / bounds.height;
        
        let scale = Math.min(scaleX, scaleY);
        scale = Math.min(scale, 1.0); 

        this.transform.k = scale;
        this.transform.x = (width - bounds.width * scale) / 2 - bounds.minX * scale;
        this.transform.y = (height - bounds.height * scale) / 2 - bounds.minY * scale;

        this.requestRender();
    }

    bindEvents() {
        const c = this.canvas;
        
        window.addEventListener('resize', () => this.resize());

        c.addEventListener('mousedown', e => this.startDrag(e.clientX, e.clientY));
        c.addEventListener('mousemove', e => this.drag(e.clientX, e.clientY));
        c.addEventListener('mouseup', () => this.endDrag());
        c.addEventListener('mouseleave', () => this.endDrag());
        
        c.addEventListener('dblclick', e => this.handleDoubleClick(e));
        
        c.addEventListener('wheel', e => this.zoom(e), {passive: false});

        // Touch support
        c.addEventListener('touchstart', e => {
            if(e.touches.length === 1) {
                this.startDrag(e.touches[0].clientX, e.touches[0].clientY);
                this.handleTap(e.touches[0].clientX, e.touches[0].clientY);
            } else if (e.touches.length === 2) {
                this.isDragging = false; 
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                this.lastPinchDist = Math.sqrt(dx * dx + dy * dy);
                this.lastPos = {
                    x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
                    y: (e.touches[0].clientY + e.touches[1].clientY) / 2
                };
                this.setInteraction(true); // Signal interaction start
            }
        }, {passive: false});
        
        c.addEventListener('touchmove', e => {
            e.preventDefault(); 
            if(e.touches.length === 1 && this.isDragging) {
                this.drag(e.touches[0].clientX, e.touches[0].clientY);
            } else if (e.touches.length === 2) {
                this.setInteraction(true); // Keep interaction alive
                
                const t1 = e.touches[0];
                const t2 = e.touches[1];
                const currentX = (t1.clientX + t2.clientX) / 2;
                const currentY = (t1.clientY + t2.clientY) / 2;
                
                const dx = currentX - this.lastPos.x;
                const dy = currentY - this.lastPos.y;
                this.transform.x += dx;
                this.transform.y += dy;
                
                const dist = Math.sqrt(Math.pow(t1.clientX - t2.clientX, 2) + Math.pow(t1.clientY - t2.clientY, 2));
                if (this.lastPinchDist > 0) {
                    const scale = dist / this.lastPinchDist;
                    const newK = Math.min(Math.max(0.02, this.transform.k * scale), 5);
                    
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
        this.setInteraction(true); // Start interaction mode
        if (this.hoveredNode) {
            this.hoveredNode = null;
            this.requestRender();
        }
    }

    drag(x, y) {
        if (this.isDragging) {
            this.setInteraction(true); // Refresh interaction timer
            const dx = x - this.lastPos.x;
            const dy = y - this.lastPos.y;
            this.transform.x += dx;
            this.transform.y += dy;
            this.lastPos = { x, y };
            this.requestRender();
        } else {
            // Only hover check if NOT engaging in high-performance interaction
            if (!this.isInteracting) {
                this.handleHover(x, y);
            }
        }
    }

    handleHover(sx, sy) {
        this.mouseX = sx;
        this.mouseY = sy;

        const pos = this.screenToWorld(sx, sy);
        let cursor = 'grab';
        
        const candidates = this.layoutEngine.getNodesInRect(pos.x, pos.y, 1, 1);
        let hovered = null;

        for (const node of candidates) {
            const hw = CONFIG.cardWidth / 2;
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
        this.setInteraction(false); // Signal end of interaction (start debounce)
        if (this.canvas.style.cursor === 'grabbing') {
            this.canvas.style.cursor = 'grab';
        }
    }

    zoom(e) {
        e.preventDefault();
        this.setInteraction(true); // Signal interaction
        
        const zoomSpeed = 0.001;
        const zoomFactor = Math.exp(-e.deltaY * zoomSpeed);
        
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const newScale = Math.min(Math.max(0.02, this.transform.k * zoomFactor), 5);
        
        this.transform.x = mouseX - (mouseX - this.transform.x) * (newScale / this.transform.k);
        this.transform.y = mouseY - (mouseY - this.transform.y) * (newScale / this.transform.k);
        this.transform.k = newScale;
        
        this.requestRender();
        
        // Since wheel events don't have an "end", we rely on setInteraction(false) being called 
        // by the logic inside setInteraction(true) which isn't possible directly.
        // Instead, we call setInteraction(false) immediately after true, which resets the debounce timer.
        this.setInteraction(false);
    }

    screenToWorld(sx, sy) {
        return {
            x: (sx - this.transform.x) / this.transform.k,
            y: (sy - this.transform.y) / this.transform.k
        };
    }

    handleTap(sx, sy) {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (now - this.lastTapTime < DOUBLE_TAP_DELAY) {
             this.handleDoubleClick({clientX: sx, clientY: sy});
             this.lastTapTime = 0;
        } else {
             this.lastTapTime = now;
             this.handleClick({clientX: sx, clientY: sy});
        }
    }

    handleDoubleClick(e) {
        const pos = this.screenToWorld(e.clientX, e.clientY);
        let clickedNode = null;
        
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
            this.selectedNodeId = null; 
            const url = new URL(window.location);
            url.searchParams.delete('id');
            window.history.replaceState({}, '', url);

            this.requestRender();
        }
    }

    selectNode(node) {
        this.selectedNodeId = node.id;
        
        const targetScale = 2.5; 
        const rect = this.canvas.getBoundingClientRect();
        
        this.transform.k = targetScale;
        this.transform.x = (rect.width / 2) - (node.x * targetScale);
        this.transform.y = (rect.height / 2) - ((node.y + CONFIG.cardHeight / 2) * targetScale);
        
        const url = new URL(window.location);
        url.searchParams.set('id', node.id);
        window.history.replaceState({}, '', url);

        this.requestRender();
    }

    handleClick(e) {
        if (this.isDragging && (Math.abs(e.clientX - this.lastPos.x) > 5 || Math.abs(e.clientY - this.lastPos.y) > 5)) return; 

        const pos = this.screenToWorld(e.clientX, e.clientY);
        
        const candidates = this.layoutEngine.getNodesInRect(pos.x, pos.y, 1, 1);
        
        for (const node of candidates) {
            const hw = CONFIG.cardWidth / 2;
            if (pos.x >= node.x - hw && pos.x <= node.x + hw &&
                pos.y >= node.y && pos.y <= node.y + CONFIG.cardHeight) {
                
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

        // Draw Connections
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
                'Total Frame': tEnd - tStart,
                'Mode': (this.isInteracting && this.isMobile) ? 'FAST (Mobile)' : 'HQ'
            });
        }
    }

    drawDebugInfo(ctx, metrics) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); 
        
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(10, 10, 200, 180);
        
        ctx.fillStyle = "#0f0";
        ctx.font = "12px monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        
        let y = 20;
        ctx.fillText("Performance (ms)", 20, y);
        y += 20;
        
        for (const [label, time] of Object.entries(metrics)) {
            ctx.fillStyle = label === 'Total Frame' ? '#fff' : '#0f0';
            const val = typeof time === 'number' ? time.toFixed(2) : time;
            ctx.fillText(`${label}: ${val}`, 20, y);
            y += 15;
        }
        
        ctx.restore();
    }
    
    getFittedText(ctx, node, type, text, maxWidth) {
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
        // If interacting (dragging/zooming) AND on mobile, FORCE LOD 0 (Abstract/Fast)
        let lod = 2; // High
        
        if (this.isInteracting && this.isMobile) {
            lod = 0; // Force Fast Mode
        } else {
            // Normal LOD logic based on zoom
            if (scale < 0.1) lod = 0; 
            else if (scale < 0.3) lod = 1; 
        }

        // Only use high res images if static and really close (disabled during interaction on mobile)
        const useHighRes = (!this.isInteracting || !this.isMobile) && scale > 1.2;

        const viewL = -this.transform.x / scale;
        const viewT = -this.transform.y / scale;
        const viewW = this.canvas.width / (window.devicePixelRatio||1) / scale;
        const viewH = this.canvas.height / (window.devicePixelRatio||1) / scale;
        const viewR = viewL + viewW;
        const viewB = viewT + viewH;

        const minBucket = Math.floor((viewL - CONFIG.cardWidth) / this.layoutEngine.bucketSize);
        const maxBucket = Math.floor((viewL + viewW + CONFIG.cardWidth) / this.layoutEngine.bucketSize);

        this.layoutEngine.layers.forEach(layer => {
            if (!layer) return;
            if (layer.y + CONFIG.cardHeight < viewT || layer.y > viewB) return;

            for (let b = minBucket; b <= maxBucket; b++) {
                const bucket = layer.buckets.get(b);
                if (!bucket) continue;

                for (const node of bucket) {
                    if (node.x + halfW < viewL || node.x - halfW > viewR) continue;
                    if (node === this.hoveredNode) continue; 
                    this.drawSingleNode(ctx, node, lod, useHighRes);
                }
            }
        });

        if (this.hoveredNode) {
             this.drawSingleNode(ctx, this.hoveredNode, lod, useHighRes);
        }
    }

    drawSingleNode(ctx, node, lod, useHighRes) {
        const x = node.x - CONFIG.cardWidth / 2;
        const y = node.y;
        const w = CONFIG.cardWidth;
        const h = CONFIG.cardHeight;
        const r = 8; 

        // Common: Background & Border
        ctx.fillStyle = CONFIG.defaultColor;
        
        // Shadow: ONLY if High LOD. If Mobile, disable shadow during interaction
        const showShadow = lod === 2 && (!this.isMobile || !this.isInteracting);
        if (showShadow) {
            ctx.shadowColor = "rgba(0,0,0,0.1)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetY = 2;
        }
        
        ctx.beginPath();
        // Use regular rect if interacting on MOBILE for extreme speed, roundRect otherwise
        if (this.isInteracting && this.isMobile) {
             ctx.rect(x, y, w, h);
        } else {
             ctx.roundRect(x, y, w, h, r);
        }
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

        const imgSize = CONFIG.avatarSize;
        const imgX = x + (w - imgSize) / 2; 
        const imgY = y + 15;
        const radius = imgSize / 2;
        const centerX = imgX + radius;
        const centerY = imgY + radius;

        // --- LOD < 2 (Abstract/Fast View) ---
        if (lod < 2) {
            // 1. Avatar Circle 
            const imgData = this.imageManager.get(node, false);
            ctx.fillStyle = (imgData && imgData.avgColor) ? imgData.avgColor : "#e0e0e0";
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();

            // 2. Text Lines (Abstract rectangles)
            const textCenterX = x + w / 2;
            let textY = imgY + imgSize + 20;
            
            // Name Line
            ctx.fillStyle = "#d0d0d0";
            const nameWidth = 80;
            ctx.fillRect(textCenterX - nameWidth/2, textY, nameWidth, 12);
            
            // Profession Line
            if (node.profession) {
                ctx.fillStyle = "#e8e8e8";
                const profWidth = 60;
                ctx.fillRect(textCenterX - profWidth/2, textY + 18, profWidth, 10);
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
        
        const maxWidth = CONFIG.cardWidth - 10;
        let nameText;

        // Construct full name with default last name
        const lastName = node.lastname || 'ქოიავა';
        const fullName = `${lastName} ${node.name}`;

        if (node === this.hoveredNode) {
            nameText = fullName;
        } else {
            // Use fullName for fitting, but keep 'name' key since it represents the name slot
            nameText = this.getFittedText(ctx, node, 'name', fullName, maxWidth);
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
            
            let profText;
            if (node === this.hoveredNode) {
                profText = node.profession;
            } else {
                profText = this.getFittedText(ctx, node, 'prof', node.profession, maxWidth);
            }
            ctx.fillText(profText, textCenterX, textY);
            
            textY += 16;
        }

        // Dates
        ctx.fillStyle = "#888";
        ctx.font = CONFIG.fontSmall;
        const padding = 10;
        const footerY = y + h - 15;

        if (node.birth) {
            ctx.textAlign = "left";
            ctx.fillText(node.birth, x + padding, footerY);
        }

        if (node.death) {
            ctx.textAlign = "right";
            ctx.fillText(node.death, x + w - padding, footerY);
        }
    }

    drawConnections(ctx) {
        // PERFORMANCE: If we are interacting (moving) AND on mobile, skip drawing connections entirely.
        if (this.isInteracting && this.isMobile) return;

        const scale = this.transform.k;
        const getLineWidth = (baseWidth) => Math.max(baseWidth * scale, 1) / scale;
        
        ctx.strokeStyle = "#ccc";

        const viewL = -this.transform.x / scale;
        const viewT = -this.transform.y / scale;
        const viewW = this.canvas.width / (window.devicePixelRatio||1) / scale;
        const viewH = this.canvas.height / (window.devicePixelRatio||1) / scale;
        const viewB = viewT + viewH;
        
        const minBucket = Math.floor((viewL - CONFIG.cardWidth) / this.layoutEngine.bucketSize);
        const maxBucket = Math.floor((viewL + viewW + CONFIG.cardWidth) / this.layoutEngine.bucketSize);

        const connectionDrop = 25; // Base Distance
        const partnerStep = 20;     // Extra distance per partner index

        this.layoutEngine.layers.forEach((layer, depth) => {
             if (!layer) return;
             const nextLayerY = this.layoutEngine.getYForDepth(depth + 1);
             if (nextLayerY < viewT || layer.y > viewB) return;

             for (const node of layer.allNodes) {
                 
                 // 1. Draw Connections for ALL partners (Current & Previous)
                 if (node.partners && node.partners.length > 0) {
                     node.partners.forEach((partner, index) => {
                        // Draw U-shape connection
                        ctx.save();
                        // Use globalDepth for line thickness consistency
                        const nodeDepth = node.globalDepth || 0;
                        const baseThick = Math.max(1.5, 5 - nodeDepth * 0.5); 
                        ctx.lineWidth = getLineWidth(baseThick);
                        
                        // DASHED for Previous, SOLID for Current
                        if (partner.type === 'previous') {
                            ctx.setLineDash([8 / scale, 6 / scale]);
                        } else {
                            ctx.setLineDash([]); 
                        }

                        const bottomY = node.y + CONFIG.cardHeight;
                        // STAGGERED VERTICAL DROP
                        const currentDrop = connectionDrop + (index * partnerStep);
                        const targetY = bottomY + currentDrop;
                        
                        const x1 = node.x;
                        const x2 = partner.node.x;
                        const radius = 10; 

                        ctx.beginPath();
                        ctx.moveTo(x1, bottomY);
                        // Down
                        ctx.lineTo(x1, targetY - radius);
                        // Corner 1
                        ctx.quadraticCurveTo(x1, targetY, x1 + radius, targetY);
                        // Across
                        ctx.lineTo(x2 - radius, targetY);
                        // Corner 2
                        ctx.quadraticCurveTo(x2, targetY, x2, targetY - radius);
                        // Up
                        ctx.lineTo(x2, bottomY);
                        
                        ctx.stroke();
                        ctx.restore();
                     });
                 }

                 // 2. Children Connections
                 if (node.children && node.children.length > 0) {
                     node.children.forEach(child => {
                         const father = child.fid ? this.layoutEngine.nodes.get(child.fid) : null;
                         const mother = child.mid ? this.layoutEngine.nodes.get(child.mid) : null;
                         const hasTwoParents = father && mother;
                         
                         let originX = node.x;
                         let originY = node.y + CONFIG.cardHeight; 
                         
                         if (hasTwoParents) {
                             // FIX: Determine which parent is the "anchor" (the one who lists the other as a partner)
                             // This ensures we pick the correct partner index and U-curve height.
                             
                             let anchor = father; // Default fallback
                             let partnerIndex = 0;
                             let foundRelationship = false;

                             // Check if Father has Mother as partner
                             if (father.partners) {
                                 const idx = father.partners.findIndex(p => p.node.id == mother.id);
                                 if (idx !== -1) {
                                     anchor = father;
                                     partnerIndex = idx;
                                     foundRelationship = true;
                                 }
                             }

                             // Check if Mother has Father as partner (Override if found here and not above, or implies mother is primary)
                             if (!foundRelationship && mother.partners) {
                                 const idx = mother.partners.findIndex(p => p.node.id == father.id);
                                 if (idx !== -1) {
                                     anchor = mother;
                                     partnerIndex = idx;
                                     foundRelationship = true;
                                 }
                             }

                             // CRITICAL: Only draw this connection when we are visiting the ANCHOR node.
                             // This prevents double drawing and ensures we use the coordinates of the node that owns the U-curve.
                             if (node.id !== anchor.id) return;

                             originX = (father.x + mother.x) / 2;
                             
                             const currentDrop = connectionDrop + (partnerIndex * partnerStep);
                             // Connect to the bottom of the specific U bracket
                             originY = anchor.y + CONFIG.cardHeight + currentDrop;
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
                const screenY = (parseInt(yPos) * this.transform.k) + this.transform.y;
                
                if (screenY > 0 && screenY < h) {
                    ctx.fillText(avg, 20, screenY);
                    ctx.fillRect(10, screenY, 5, 1);
                }
            }
        });
        ctx.restore();
    }
}

// Global redraw trigger
let appInstance = null;
function requestRedraw() {
    if (appInstance) appInstance.requestRender();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Ensure rawNodes exists (from data.js)
    if (typeof rawNodes === 'undefined') {
        console.error("rawNodes not found. Is data.js loaded?");
        return;
    }
    appInstance = new TreeRenderer('treeCanvas', rawNodes);
    setupSearch();

    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    if (idParam) {
        const nodeId = parseInt(idParam);
        const node = appInstance.layoutEngine.nodes.get(nodeId);
        if (node) {
            appInstance.selectNode(node);
        }
    } else {
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

            const lastName = node.lastname || 'ქოიავა';
            const fullName = `${lastName} ${node.name}`;
            const nameDisplay = node.profession ? `${fullName} - ${node.profession}` : fullName;

            div.innerHTML = `
                ${imgHtml}
                <div class="search-info">
                    <span class="search-name">${nameDisplay}</span>
                    <span class="search-meta">${node.birth || '?'} - ${node.death || '?'}</span>
                </div>
            `;
            
            div.addEventListener('click', () => selectResult(node));
            
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

    // --- SEO GENERATOR ---
    // This injects data into the DOM so Search Engines can read it, 
    // even though the visual display is on Canvas.
    function generateSEO() {
        if (!rawNodes || rawNodes.length === 0) return;

        // 1. Structured Data (JSON-LD)
        // This tells Google explicitly "Here is a list of People"
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "Dataset",
            "name": "Koiava Family Tree - ქოიავების გვარის გენეოლოგია",
            "description": "Family tree visualization for the Koiava family surname. ქოიავების გვარის ისტორია და გენეოლოგიური ხე.",
            "creator": {
                "@type": "Person",
                "familyName": "Koiava"
            },
            "hasPart": rawNodes.map(node => {
                const lastName = node.lastname || 'Koiava';
                const fullName = `${lastName} ${node.name}`; // Georgian Order
                return {
                    "@type": "Person",
                    "name": fullName,
                    "givenName": node.name,
                    "familyName": lastName,
                    "birthDate": node.birth ? node.birth.toString() : undefined,
                    "deathDate": node.death ? node.death.toString() : undefined,
                    "jobTitle": node.profession
                };
            })
        };

        const scriptEl = document.createElement('script');
        scriptEl.type = "application/ld+json";
        scriptEl.text = JSON.stringify(schemaData);
        document.head.appendChild(scriptEl);

        // 2. Semantic HTML Content (Visually Hidden)
        // This provides actual keywords for the crawler to index.
        const seoContainer = document.createElement('div');
        seoContainer.id = "seo-content";
        // 'visually-hidden' style pattern standard for accessibility/SEO
        seoContainer.style.cssText = "position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;";
        
        let htmlContent = `
            <h1>Koiava Family Tree - ქოიავების გვარის გენეოლოგია</h1>
            <p>This interactive tree visualizes the history of the Koiava family. Below is the list of family members included in this tree:</p>
            <ul>
        `;

        rawNodes.forEach(node => {
            const lastName = node.lastname || 'ქოიავა';
            const fullName = `${lastName} ${node.name}`;
            const dates = (node.birth || node.death) ? `(${node.birth || '?'} - ${node.death || '?'})` : '';
            const job = node.profession ? `- ${node.profession}` : '';
            
            // Generate readable list item for crawlers
            htmlContent += `<li>${fullName} ${dates} ${job}</li>`;
        });

        htmlContent += "</ul>";
        seoContainer.innerHTML = htmlContent;
        document.body.appendChild(seoContainer);
    }

    // Run SEO generation
    generateSEO();

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

        const matches = rawNodes.filter(node => {
            const lastName = node.lastname || 'ქოიავა';
            const fullName = `${lastName} ${node.name}`;
            return fullName.toLowerCase().includes(query);
        });

        currentMatches = matches.slice(0, 10);
        selectedIndex = 0; 

        if (currentMatches.length > 0) {
            resultsContainer.style.display = 'block';
            renderList();
        } else {
            resultsContainer.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            resultsContainer.style.display = 'none';
        }
    });
}