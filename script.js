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
        this.root = null;
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
            if (node.pid) {
                node.partnerNode = this.nodes.get(node.pid);
            }

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
        this.calculateSubtree(this.root, 0, new Set());
        
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
        let subtreeWidth = 0;
        const hasPartner = !!node.partnerNode;
        const selfWidth = hasPartner ? (nodeWidth * 2 + CONFIG.partnerSpacing) : nodeWidth;

        if (node.children.length === 0) {
            subtreeWidth = selfWidth;
        } else {
            const childGroups = [];
            let i = 0;
            const children = node.children;
            const processedChildren = new Set();

            while (i < children.length) {
                const child = children[i];
                if (processedChildren.has(child.id)) { i++; continue; }
                
                let groupWidth = 0;
                let partner = null;
                if (child.pid) {
                    partner = children.find(c => c.id === child.pid);
                }

                let childW = this.calculateSubtree(child, depth + 1, visited);
                
                if (partner) {
                        processedChildren.add(partner.id);
                }
                processedChildren.add(child.id);

                childGroups.push({ node: child, width: Math.max(childW, child.w) });
                i++;
            }

            let totalChildrenWidth = 0;
            childGroups.forEach((g, idx) => {
                    totalChildrenWidth += g.width;
                    if (idx < childGroups.length - 1) totalChildrenWidth += CONFIG.horizontalSpacing;
            });

            subtreeWidth = Math.max(selfWidth, totalChildrenWidth);
        }
        
        return subtreeWidth;
    }

    layout() {
            if (!this.root) return;
            this.resetPositions();
            this.maxDepth = 0;
            this.widths(this.root, 0); 
            this.layers = []; 
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

    assignCoordinates(node, x, depth) {
        if(!node) return;

        node.depth = depth;
        node.y = this.getYForDepth(depth);
        
        const hasPartner = !!node.partnerNode;
        const blockWidth = hasPartner ? (CONFIG.cardWidth * 2 + CONFIG.partnerSpacing) : CONFIG.cardWidth;
        
        if (hasPartner) {
            node.x = x - (blockWidth / 2) + (CONFIG.cardWidth / 2);
            node.partnerNode.x = node.x + CONFIG.cardWidth + CONFIG.partnerSpacing;
            node.partnerNode.y = node.y;
            this.addToSpatialIndex(node.partnerNode, depth);
        } else {
            node.x = x;
        }

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
        const maxBucket = Math.floor((viewR + CONFIG.cardWidth) / this.layoutEngine.bucketSize);

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

        this.layoutEngine.layers.forEach((layer, depth) => {
             if (!layer) return;
             const nextLayerY = this.layoutEngine.getYForDepth(depth + 1);
             if (nextLayerY < viewT || layer.y > viewB) return;

             for (const node of layer.allNodes) {
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

            const nameDisplay = node.profession ? `${node.name} - ${node.profession}` : node.name;

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

        const matches = rawNodes.filter(node => 
            node.name.toLowerCase().includes(query)
        );

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