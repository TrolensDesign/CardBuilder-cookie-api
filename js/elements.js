// Modern Elements JavaScript for Cookie API Card Builder

// Add element with improved UX
function addElement(type) {
    // Check if type is supported
    if (!LIMITS.hasOwnProperty(type)) {
        console.warn(`Element type '${type}' is not supported`);
        showToast('Element type not supported!', 'error');
        return;
    }
    
    if (elements.filter(e => e.type === type).length >= LIMITS[type]) {
        showToast(`Limit reached for ${type} elements (${LIMITS[type]})`, 'error');
        return;
    }

    const element = {
        id: elementIdCounter++,
        type: type,
        x: 50,
        y: 50,
        width: getDefaultWidth(type),
        height: getDefaultHeight(type),
        widthAuto: type === 'roblox_profile' || type === 'text' || type === 'discord_profile',
        heightAuto: type === 'text', // Text elements auto-adjust height
        opacity: 100,
        layer: elements.length > 0 ? Math.max(...elements.map(e => e.layer || 0), 0) + 1 : 1,
        text: type === 'text' ? 'Sample Text' : '',
        fontSize: 16,
        fontFamily: 'Inter',
        textColor: '#ffffff',
        imageUrl: '',
        avatarUrl: '',
        name: '',
        subtitle: 'Status',
        userId: type === 'discord_profile' ? '1011787830567120898' : undefined,
        borderRadius: type === 'discord_profile' || type === 'image' ? 1 : undefined,
        user: type === 'roblox_profile' ? '' : undefined,
        transparency: type === 'roblox_profile' ? '100' : undefined,
        progressValue: 60,
        progressMax: 100,
        progressColor: '#10b981',
        progressBgColor: '#334155',
        progressBorderRadius: 0,
    };

    elements.push(element);
    updateCanvas();
    updateQuotas();
    updateJSON();
    updateCanvasStatus();
    updateTemplateButtons(); // Update template button states
    selectElement(element.id);
    
    // Show success message
    showToast(`${getElementDisplayName(element)} added! ✨`, 'success');
}

// Get default width for element type
function getDefaultWidth(type) {
    const defaults = {
        text: 'auto', // Text always auto-sizes
        image: 100,
        discord_profile: 50,
        roblox_profile: 'auto',
        progressbar: 200,
    };
    return defaults[type] || 100;
}

// Get default height for element type
function getDefaultHeight(type) {
    const defaults = {
        text: 'auto', // Text always auto-sizes
        image: 100,
        discord_profile: 50,
        roblox_profile: 50,
        progressbar: 20,
    };
    return defaults[type] || 100;
}

// Create element div with modern styling
function createElementDiv(element, zoom) {
    const div = document.createElement('div');
    div.className = 'canvas-element';
    div.dataset.id = element.id;
    div.dataset.type = element.type;
    
    if (selectedElement === element.id || selectedElements.includes(element.id)) {
        div.classList.add('selected');
    }
    
    div.style.left = (element.x * zoom) + 'px';
    div.style.top = (element.y * zoom) + 'px';
    
    // Handle auto sizing for text elements
    if (element.type === 'text') {
        div.style.width = 'auto';
        div.style.height = 'auto';
        div.style.minWidth = '20px'; // Small minimum width
        div.style.minHeight = 'auto';
        div.style.maxWidth = 'none'; // Allow text to expand
        div.style.lineHeight = '1.2'; // Better line spacing
    } else {
        // Handle auto width for other elements
        if (element.widthAuto || element.width === 'auto') {
            div.style.width = (element.height * zoom) + 'px';
        } else {
            div.style.width = (element.width * zoom) + 'px';
        }
        // Handle auto height
        if (element.heightAuto || element.height === 'auto') {
            div.style.height = 'auto';
        } else {
            div.style.height = (element.height * zoom) + 'px';
        }
    }
    div.style.opacity = element.opacity / 100;
    
    // Create content based on type
    let content = '';
    try {
        content = renderElementContent(element, zoom);
    } catch (error) {
        console.error('Error rendering element:', error);
        content = createErrorContent();
    }
    
    div.innerHTML = content;
    
    // Add resize handles
    if (selectedElement === element.id) {
        if (element.type === 'text') {
            // No resize handles for text elements - they auto-size
            // Text elements will auto-adjust their size based on content and font size
        } else {
            // Full resize handles for other elements
            div.innerHTML += `
                <div class="resize-handle nw"></div>
                <div class="resize-handle ne"></div>
                <div class="resize-handle sw"></div>
                <div class="resize-handle se"></div>
            `;
        }
    }
    
    // Add multi-select border if element is part of multi-selection
    if (selectedElements.length > 1 && selectedElements.includes(element.id)) {
        div.classList.add('multi-selected');
    }
    
    // Add event listeners
    setupElementEventListeners(div, element);
    
    return div;
}

// Render element content based on type
function renderElementContent(element, zoom) {
    switch (element.type) {
        case 'text':
            return renderTextElement(element, zoom);
        case 'image':
            return renderImageElement(element, zoom);
        case 'discord_profile':
            return renderDiscordProfileElement(element, zoom);
        case 'roblox_profile':
            return renderRobloxProfileElement(element, zoom);
        case 'progressbar':
            return renderProgressBarElement(element, zoom);
        default:
            return createErrorContent();
    }
}

// Render text element
function renderTextElement(element, zoom) {
    return `<div style="
        font-family: ${element.fontFamily};
        font-size: ${element.fontSize * zoom}px;
        color: ${element.textColor};
        text-align: left;
        padding: 1px 2px 1px 0px;
        white-space: pre-wrap;
        line-height: 1.2;
        display: inline-block;
        align-items: flex-start;
        justify-content: flex-start;
        min-height: auto;
        height: auto;
        width: auto;
        max-width: none;
        box-sizing: border-box;
        word-wrap: break-word;
        overflow-wrap: break-word;
    ">${element.text || 'Sample Text'}</div>`;
}

// Render image element
function renderImageElement(element, zoom) {
    if (element.imageUrl && element.imageUrl.trim() !== '') {
        const borderRadius = element.borderRadius || 1;
        const borderRadiusPx = (borderRadius / 100) * (Math.min(element.width, element.height) * zoom / 2);
        return `<div style="position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: ${borderRadiusPx}px;">
            <img src="${element.imageUrl}" style="width: 100%; height: 100%; object-fit: fill; border-radius: ${borderRadiusPx}px; display: block; box-sizing: border-box;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #f0f0f0;
                border: 2px dashed #ccc;
                display: none;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #666;
                font-size: 12px;
                text-align: center;
                padding: 8px;
                box-sizing: border-box;
                border-radius: ${borderRadiusPx}px;
            ">
                <div style="font-size: ${(element.width * zoom < 80) || (element.height * zoom < 80) ? '16px' : '24px'}; ${(element.width * zoom < 80) || (element.height * zoom < 80) ? '' : 'margin-bottom: 8px;'}">🖼️</div>
                ${(element.width * zoom < 80) || (element.height * zoom < 80) ? '' : '<div>Image failed to load</div>'}
            </div>
        </div>`;
    } else {
        const borderRadius = element.borderRadius || 1;
        const borderRadiusPx = (borderRadius / 100) * (Math.min(element.width, element.height) * zoom / 2);
        const isSmall = (element.width * zoom < 80) || (element.height * zoom < 80);
        
        return `<div style="
            width: 100%;
            height: 100%;
            background: #f0f0f0;
            border: 2px dashed #ccc;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 12px;
            text-align: center;
            padding: 8px;
            box-sizing: border-box;
            border-radius: ${borderRadiusPx}px;
        ">
            <div style="font-size: ${isSmall ? '16px' : '24px'}; ${isSmall ? '' : 'margin-bottom: 8px;'}">🖼️</div>
            ${isSmall ? '' : '<div>Click to add image URL</div>'}
        </div>`;
    }
}

// Render Discord profile element
function renderDiscordProfileElement(element, zoom) {
    const borderRadius = element.borderRadius || 1;
    const borderRadiusPx = (borderRadius / 100) * (Math.min(element.width, element.height) * zoom / 2);
    const userId = element.userId;
    
    if (userId && userId.trim() !== '') {
        const isYourId = userId === '1011787830567120898';
        let avatarUrl;
        
        if (isYourId) {
            avatarUrl = `https://cdn.discordapp.com/avatars/1011787830567120898/51b35a89cc0046bd8720770163fe680f.png`;
        } else {
            const defaultIndex = parseInt(userId) % 5;
            avatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
        }
        
        return `<img src="${avatarUrl}" 
            style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: ${borderRadiusPx}px;
            " 
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        >
        <div style="
            width: 100%;
            height: 100%;
            border-radius: ${borderRadiusPx}px;
            background: #5865f2;
            display: none;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
        ">D</div>`;
    } else {
        return `<div style="
            width: 100%;
            height: 100%;
            border-radius: ${borderRadiusPx}px;
            background: #5865f2;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
        ">D</div>`;
    }
}

// Render Roblox profile element
function renderRobloxProfileElement(element, zoom) {
    const borderRadius = element.borderRadius || 1;
    const borderRadiusPx = (borderRadius / 100) * (Math.min(element.width, element.height) * zoom / 2);
    const username = element.name;
    
    if (username && username.trim() !== '') {
        const avatarUrl = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${username}&size=150x150&format=Png`;
        return `<img src="${avatarUrl}" 
            style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: ${borderRadiusPx}px;
            " 
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        >
        <div style="
            width: 100%;
            height: 100%;
            border-radius: ${borderRadiusPx}px;
            background: linear-gradient(135deg, #00a2ff, #0066cc);
            display: none;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
        ">🎮</div>`;
    } else {
        return `<div style="
            width: 100%;
            height: 100%;
            border-radius: ${borderRadiusPx}px;
            background: linear-gradient(135deg, #00a2ff, #0066cc);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
        ">🎮<br><span style="font-size: 10px;">Roblox</span></div>`;
    }
}

// Render progress bar element
function renderProgressBarElement(element, zoom) {
    const progressPercent = (element.progressValue / element.progressMax) * 100;
    const borderRadiusPx = (element.progressBorderRadius / 100) * (Math.min(element.width, element.height) * zoom / 2);
    return `<div style="
        width: 100%;
        height: 100%;
        background: ${element.progressBgColor};
        border-radius: ${borderRadiusPx}px;
        overflow: hidden;
        position: relative;
    ">
        <div style="
            width: ${progressPercent}%;
            height: 100%;
            background: ${element.progressColor};
            transition: width 0.3s ease;
            border-radius: ${borderRadiusPx}px;
        "></div>
    </div>`;
}


// Create error content
function createErrorContent() {
    return `<div style="
        width: 100%;
        height: 100%;
        background: #ef4444;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
    ">Error</div>`;
}

// Setup element event listeners
function setupElementEventListeners(div, element) {
    // Click to select
    div.addEventListener('click', (e) => {
        e.stopPropagation();
        selectElement(element.id, e);
    });
    
    // Double click to edit
    div.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        if (element.type === 'text') {
            // Focus on text input
            const textInput = document.getElementById('prop-text');
            if (textInput) {
                textInput.focus();
                textInput.select();
            }
        }
    });
    
    // Mouse down for drag
    div.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('resize-handle')) {
            e.stopPropagation();
            startResize(element.id, e.target.className.split(' ')[1]);
        } else {
            e.stopPropagation();
            cleanupDragListeners();
            startDrag(element.id, e);
        }
    });
    
    // Touch events for mobile
    div.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('resize-handle')) {
            startResize(element.id, e.target.className.split(' ')[1]);
        } else {
            cleanupDragListeners();
            startDrag(element.id, e);
        }
    });
}

// Select element with multi-selection support
function selectElement(id, event = null) {
    // Handle multi-selection with Ctrl/Cmd key
    if (event && (event.ctrlKey || event.metaKey)) {
        if (id === 'card') return; // Don't multi-select card
        
        if (selectedElements.includes(id)) {
            // Remove from selection
            selectedElements = selectedElements.filter(elId => elId !== id);
            if (selectedElements.length === 0) {
                selectedElement = 'card';
            } else if (selectedElement === id) {
                selectedElement = selectedElements[0];
            }
        } else {
            // Add to selection
            selectedElements.push(id);
            selectedElement = id;
        }
    } else {
        // Single selection
        selectedElement = id;
        selectedElements = id === 'card' ? [] : [id];
    }
    
    updateCanvas();
    updateCanvasStatus();
    updateElementProperties();
    updateQuickActionsState();
    
    // If selecting card, update card properties
    if (id === 'card') {
        updateCardProperties();
    }
    
    // Show selection feedback
    if (id !== 'card') {
        const element = elements.find(e => e.id === id);
        if (element) {
            const count = selectedElements.length;
            if (count > 1) {
                showToast(`${count} elements selected`, 'info');
            } else {
                showToast(`${getElementDisplayName(element)} selected`, 'info');
            }
        }
    }
    
    // Update layers panel to show selection
    if (typeof updateLayersPanel === 'function') {
        updateLayersPanel();
    }
    
    // Force update properties panel
    setTimeout(() => {
        updateElementProperties();
    }, 100);
}

// Start drag with improved UX and multi-selection support
function startDrag(id, e) {
    const element = elements.find(el => el.id === id);
    if (!element) return;
    
    const startX = e.clientX || (e.touches && e.touches[0].clientX);
    const startY = e.clientY || (e.touches && e.touches[0].clientY);
    const zoom = parseFloat(document.getElementById('canvas-zoom').value);
    
    // Check if Shift key is pressed for axis locking
    const isShiftPressed = e.shiftKey || (e.touches && e.touches.length > 1);
    let axisLock = null; // null = no lock, 'x' = lock to X axis, 'y' = lock to Y axis
    
    // Get all elements to move (selected elements or just the clicked one)
    const elementsToMove = selectedElements.length > 1 && selectedElements.includes(id) 
        ? selectedElements.map(elId => elements.find(el => el.id === elId)).filter(Boolean)
        : [element];
    
    // Store initial positions for all elements
    const initialPositions = elementsToMove.map(el => ({
        element: el,
        startX: el.x,
        startY: el.y
    }));
    
    e.preventDefault();
    
    function onMouseMove(e) {
        e.preventDefault();
        const currentX = e.clientX || (e.touches && e.touches[0].clientX);
        const currentY = e.clientY || (e.touches && e.touches[0].clientY);
        const deltaX = (currentX - startX) / zoom;
        const deltaY = (currentY - startY) / zoom;
        
        // Determine axis lock based on current movement (dynamic)
        if (isShiftPressed) {
            // Always recalculate axis lock based on current movement
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                axisLock = 'y'; // Lock Y axis, allow X movement
            } else {
                axisLock = 'x'; // Lock X axis, allow Y movement
            }
        }
        
        // Show axis lock indicator when Shift is pressed (even before axis is determined)
        if (isShiftPressed) {
            if (elementsToMove.length === 1) {
                showAxisLockIndicator(axisLock, elementsToMove[0].id, deltaX, deltaY);
            } else if (elementsToMove.length > 1) {
                showAxisLockIndicator(axisLock, elementsToMove[0].id, deltaX, deltaY);
            }
        }
        
        // Move all selected elements with snap guides
        if (elementsToMove.length > 1) {
            // Multi-select: apply snap guides to the group as a whole
            const groupSnap = applyGroupSnapGuides(elementsToMove, initialPositions, deltaX, deltaY, isShiftPressed, axisLock);
            
            // Apply the snapped movement to all elements
            initialPositions.forEach(({ element: el, startX: elStartX, startY: elStartY }, index) => {
                const newX = elStartX + groupSnap.deltaX;
                const newY = elStartY + groupSnap.deltaY;
                
                el.x = Math.max(1, newX);
                el.y = Math.max(1, newY);
            });
        } else {
            // Single element: apply snap guides to individual element
            initialPositions.forEach(({ element: el, startX: elStartX, startY: elStartY }) => {
                let newX = elStartX + deltaX;
                let newY = elStartY + deltaY;
                
                // Apply axis locking
                if (isShiftPressed && axisLock) {
                    if (axisLock === 'x') {
                        // Lock X axis - keep original X position
                        newX = elStartX;
                        // Show visual feedback for Y-axis movement
                        showAxisLockIndicator('y', el.id, deltaX, deltaY);
                    } else if (axisLock === 'y') {
                        // Lock Y axis - keep original Y position
                        newY = elStartY;
                        // Show visual feedback for X-axis movement
                        showAxisLockIndicator('x', el.id, deltaX, deltaY);
                    }
                }
                    
                // Apply snap guides
                const snapped = applySnapGuides(el, newX, newY);
                
                el.x = Math.max(1, snapped.x);
                el.y = Math.max(1, snapped.y);
            });
        }
        
        updateCanvas();
        updateElementProperties();
        updateJSON();
    }
    
    function onMouseUp(e) {
        e.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('touchmove', onMouseMove);
        document.removeEventListener('touchend', onMouseUp);
        
        // Hide snap guides after drag ends
        setTimeout(() => {
            hideAllSnapGuides();
        }, 100);
        
        // Hide axis lock indicator
        const indicator = document.getElementById('axis-lock-indicator');
        const lineIndicator = document.getElementById('axis-lock-line');
        if (indicator) {
            indicator.style.display = 'none';
        }
        if (lineIndicator) {
            lineIndicator.style.display = 'none';
        }
        
        if (isMobileDevice()) {
            document.body.style.overflow = '';
        }
    }
    
    document.addEventListener('mousemove', onMouseMove, { passive: false });
    document.addEventListener('mouseup', onMouseUp, { passive: false });
    document.addEventListener('touchmove', onMouseMove, { passive: false });
    document.addEventListener('touchend', onMouseUp, { passive: false });
    
    if (isMobileDevice()) {
        document.body.style.overflow = 'hidden';
    }
}

// Start resize with improved UX
function startResize(id, direction) {
    const element = elements.find(el => el.id === id);
    const startX = event.clientX;
    const startY = event.clientY;
    const startElementX = element.x;
    const startElementY = element.y;
    const startWidth = element.width;
    const startHeight = element.height;
    const zoom = parseFloat(document.getElementById('canvas-zoom').value);
    
    function onMouseMove(e) {
        const deltaX = (e.clientX - startX) / zoom;
        const deltaY = (e.clientY - startY) / zoom;
        
        if (direction.includes('e')) {
            element.width = Math.max(10, startWidth + deltaX);
        }
        if (direction.includes('w')) {
            element.width = Math.max(10, startWidth - deltaX);
            element.x = Math.max(1, startElementX + deltaX);
        }
        
        // For text elements, adjust fontSize based on width change
        if (element.type === 'text') {
            const widthChange = element.width - startWidth;
            const fontSizeChange = Math.round(widthChange * 0.3); // Scale factor
            element.fontSize = Math.max(8, Math.min(72, (element.fontSize || 16) + fontSizeChange));
            
            // Update fontSize input in properties panel
            const fontSizeInput = document.getElementById('prop-font-size');
            if (fontSizeInput) {
                fontSizeInput.value = element.fontSize;
            }
            
            // Text elements auto-adjust height, so we don't need to set it manually
        }
        if (direction.includes('s')) {
            element.height = Math.max(10, startHeight + deltaY);
        }
        if (direction.includes('n')) {
            element.height = Math.max(10, startHeight - deltaY);
            element.y = Math.max(1, startElementY + deltaY);
        }
        
        updateCanvas();
        updateElementProperties();
        updateJSON();
    }
    
    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

// Delete element with confirmation
function deleteElement() {
    if (!selectedElement || selectedElement === 'card') {
        showToast('Please select an element to delete!', 'warning');
        return;
    }
    
    const element = elements.find(e => e.id === selectedElement);
    if (!element) {
        showToast('Element not found!', 'error');
        return;
    }
    
    if (confirm(`Are you sure you want to delete this ${getElementDisplayName(element)}?`)) {
        elements = elements.filter(e => e.id !== selectedElement);
        selectedElement = 'card';
        updateCanvas();
        updateQuotas();
        updateJSON();
        updateCanvasStatus();
        updateElementProperties();
        updateQuickActionsState();
        updateTemplateButtons(); // Update template button states
        showToast('Element deleted! 🗑️', 'success');
    }
}

// Get element display name
function getElementDisplayName(element) {
    const names = {
        text: 'Text',
        image: 'Image',
        discord_profile: 'Discord Profile',
        roblox_profile: 'Roblox Profile',
        progressbar: 'Progress Bar',
    };
    return names[element.type] || element.type;
}

// Multi-select resize function
function resizeSelectedElements(scaleFactor) {
    if (selectedElements.length === 0) return;
    
    selectedElements.forEach(elementId => {
        const element = elements.find(el => el.id === elementId);
        if (element) {
            element.width = Math.max(10, element.width * scaleFactor);
            element.height = Math.max(10, element.height * scaleFactor);
            
            // For text elements, also adjust fontSize
            if (element.type === 'text') {
                element.fontSize = Math.max(8, Math.min(72, element.fontSize * scaleFactor));
            }
        }
    });
    
    updateCanvas();
    updateElementProperties();
    updateJSON();
}

// Multi-select delete function
function deleteSelectedElements() {
    if (selectedElements.length === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedElements.length} selected elements?`)) {
        elements = elements.filter(el => !selectedElements.includes(el.id));
        selectedElements = [];
        selectedElement = 'card';
        
        updateCanvas();
        updateQuotas();
        updateJSON();
        updateLayersPanel();
        updateCanvasStatus();
        updateElementProperties();
        updateTemplateButtons(); // Update template button states
        
        showToast('Selected elements deleted! 🗑️', 'success');
    }
}

// Global cleanup function for drag listeners
function cleanupDragListeners() {
    const events = ['mousemove', 'mouseup', 'touchmove', 'touchend'];
    events.forEach(eventType => {
        const dummyHandler = () => {};
        document.removeEventListener(eventType, dummyHandler);
    });
}

// Add window blur listener to clean up drag listeners
window.addEventListener('blur', cleanupDragListeners);
window.addEventListener('beforeunload', cleanupDragListeners);

// Snap Guides System
let snapGuides = {
    horizontal: [],
    vertical: []
};

// Get actual width of element (handles auto-sizing)
function getElementActualWidth(element) {
    if (element.type === 'text') {
        // For text elements, estimate width based on text content and font size
        const text = element.text || 'Sample Text';
        const fontSize = element.fontSize || 16;
        const fontFamily = element.fontFamily || 'Inter';
        
        // Create a temporary canvas to measure text
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = `${fontSize}px ${fontFamily}`;
        const textWidth = context.measureText(text).width;
        
        // Add some padding and return estimated width
        return Math.max(textWidth + 8, 20); // Minimum 20px width
    } else if (element.type === 'discord_profile' || element.type === 'roblox_profile') {
        // For profile elements, use the actual width property (not auto)
        return Number(element.width) || Number(element.height) || 50; // Fallback to height or default
    } else if (element.widthAuto || element.width === 'auto') {
        return element.height; // For other auto-width elements
    } else {
        return element.width;
    }
}

// Get actual height of element (handles auto-sizing)
function getElementActualHeight(element) {
    if (element.type === 'text') {
        // For text elements, estimate height based on font size and line count
        const fontSize = element.fontSize || 16;
        const text = element.text || 'Sample Text';
        const lines = text.split('\n').length;
        const lineHeight = fontSize * 1.2; // Line height multiplier
        
        return Math.max(lines * lineHeight + 4, fontSize + 4); // Add padding
    } else if (element.type === 'discord_profile' || element.type === 'roblox_profile') {
        // For profile elements, use the actual height property
        return Number(element.height) || 50; // Fallback to default
    } else if (element.heightAuto || element.height === 'auto') {
        return element.width; // For other elements with auto height
    } else {
        return element.height;
    }
}

// Apply snap guides to a group of elements (multi-select)
function applyGroupSnapGuides(elementsToMove, initialPositions, deltaX, deltaY, isShiftPressed, axisLock) {
    if (!snapGuidesEnabled) return { deltaX, deltaY };
    
    // Calculate group bounding box
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    initialPositions.forEach(({ element: el, startX: elStartX, startY: elStartY }) => {
        const newX = elStartX + deltaX;
        const newY = elStartY + deltaY;
        const width = getElementActualWidth(el);
        const height = getElementActualHeight(el);
        
        minX = Math.min(minX, newX);
        minY = Math.min(minY, newY);
        maxX = Math.max(maxX, newX + width);
        maxY = Math.max(maxY, newY + height);
    });
    
    const groupWidth = maxX - minX;
    const groupHeight = maxY - minY;
    const groupCenterX = minX + groupWidth / 2;
    const groupCenterY = minY + groupHeight / 2;
    
    let snappedDeltaX = deltaX;
    let snappedDeltaY = deltaY;
    
    // Apply axis locking
    if (isShiftPressed && axisLock) {
        if (axisLock === 'x') {
            snappedDeltaX = 0;
            showAxisLockIndicator('y', elementsToMove[0].id, deltaX, deltaY);
        } else if (axisLock === 'y') {
            snappedDeltaY = 0;
            showAxisLockIndicator('x', elementsToMove[0].id, deltaX, deltaY);
        }
    }
    
    // Calculate guides for the group
    const guides = calculateGroupSnapGuides(elementsToMove);
    const snapThreshold = 5;
    
    // Check horizontal snaps (Y position)
    guides.horizontal.forEach(guide => {
        let snapY = guide.y;
        
        // Adjust snap position based on guide type
        if (guide.type === 'canvas-center') {
            snapY = guide.y - groupHeight / 2; // Center of group to canvas center
        } else if (guide.type === 'canvas-edge') {
            if (guide.y === 0) {
                snapY = guide.y; // Top of group to top of canvas
            } else {
                snapY = guide.y - groupHeight; // Bottom of group to bottom of canvas
            }
        } else if (guide.type === 'element-center' || guide.type === 'center-center-h') {
            snapY = guide.y - groupHeight / 2; // Center of group to center of other element
        } else if (guide.type === 'element-top' || guide.type === 'edge-top') {
            snapY = guide.y; // Top of group to top of other element
        } else if (guide.type === 'element-bottom' || guide.type === 'edge-bottom') {
            snapY = guide.y - groupHeight; // Bottom of group to bottom of other element
        } else if (guide.type === 'center-edge-h') {
            snapY = guide.y - groupHeight / 2; // Center of group to edge of other element
        }
        
        const newGroupY = minY + snappedDeltaY;
        const distance = Math.abs(newGroupY - snapY);
        if (distance <= snapThreshold) {
            snappedDeltaY = snapY - minY;
            showSnapGuide('horizontal', guide.y, guide.type, guide.strength);
        }
    });
    
    // Check vertical snaps (X position)
    guides.vertical.forEach(guide => {
        let snapX = guide.x;
        
        // Adjust snap position based on guide type
        if (guide.type === 'canvas-center') {
            snapX = guide.x - groupWidth / 2; // Center of group to canvas center
        } else if (guide.type === 'canvas-edge') {
            if (guide.x === 0) {
                snapX = guide.x; // Left of group to left of canvas
            } else {
                snapX = guide.x - groupWidth; // Right of group to right of canvas
            }
        } else if (guide.type === 'element-center' || guide.type === 'center-center-v') {
            snapX = guide.x - groupWidth / 2; // Center of group to center of other element
        } else if (guide.type === 'element-left' || guide.type === 'edge-left') {
            snapX = guide.x; // Left of group to left of other element
        } else if (guide.type === 'element-right' || guide.type === 'edge-right') {
            snapX = guide.x - groupWidth; // Right of group to right of other element
        } else if (guide.type === 'center-edge-v') {
            snapX = guide.x - groupWidth / 2; // Center of group to edge of other element
        }
        
        const newGroupX = minX + snappedDeltaX;
        const distance = Math.abs(newGroupX - snapX);
        if (distance <= snapThreshold) {
            snappedDeltaX = snapX - minX;
            showSnapGuide('vertical', guide.x, guide.type, guide.strength);
        }
    });
    
    return { deltaX: snappedDeltaX, deltaY: snappedDeltaY };
}

// Calculate snap guides for a group of elements
function calculateGroupSnapGuides(elementsToMove) {
    if (!snapGuidesEnabled) return { horizontal: [], vertical: [] };
    
    const guides = {
        horizontal: [],
        vertical: []
    };
    
    // Add canvas boundaries
    const canvasWidth = parseInt(document.getElementById('card-width').value);
    const canvasHeight = parseInt(document.getElementById('card-height').value);
    
    // Canvas center lines
    guides.horizontal.push({ y: canvasHeight / 2, type: 'canvas-center', strength: 'strong' });
    guides.vertical.push({ x: canvasWidth / 2, type: 'canvas-center', strength: 'strong' });
    
    // Canvas edges
    guides.horizontal.push({ y: 0, type: 'canvas-edge', strength: 'medium' });
    guides.horizontal.push({ y: canvasHeight, type: 'canvas-edge', strength: 'medium' });
    guides.vertical.push({ x: 0, type: 'canvas-edge', strength: 'medium' });
    guides.vertical.push({ x: canvasWidth, type: 'canvas-edge', strength: 'medium' });
    
    // Other elements' edges and centers (excluding selected elements)
    const selectedIds = elementsToMove.map(el => el.id);
    elements.forEach(otherElement => {
        if (selectedIds.includes(otherElement.id)) return;
        
        const otherWidth = getElementActualWidth(otherElement);
        const otherHeight = getElementActualHeight(otherElement);
        
        // Element edges
        guides.horizontal.push({ y: otherElement.y, type: 'element-top', strength: 'strong', elementId: otherElement.id });
        guides.horizontal.push({ y: otherElement.y + otherHeight, type: 'element-bottom', strength: 'strong', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x, type: 'element-left', strength: 'strong', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x + otherWidth, type: 'element-right', strength: 'strong', elementId: otherElement.id });
        
        // Element centers
        guides.horizontal.push({ y: otherElement.y + otherHeight / 2, type: 'element-center', strength: 'medium', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x + otherWidth / 2, type: 'element-center', strength: 'medium', elementId: otherElement.id });
        
        // Center-to-center alignment guides
        guides.horizontal.push({ y: otherElement.y + otherHeight / 2, type: 'center-center-h', strength: 'strong', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x + otherWidth / 2, type: 'center-center-v', strength: 'strong', elementId: otherElement.id });
        
        // Center-to-edge alignment guides
        guides.horizontal.push({ y: otherElement.y, type: 'center-edge-h', strength: 'medium', elementId: otherElement.id });
        guides.horizontal.push({ y: otherElement.y + otherHeight, type: 'center-edge-h', strength: 'medium', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x, type: 'center-edge-v', strength: 'medium', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x + otherWidth, type: 'center-edge-v', strength: 'medium', elementId: otherElement.id });
        
        // Edge-to-edge alignment guides
        guides.horizontal.push({ y: otherElement.y, type: 'edge-top', strength: 'medium', elementId: otherElement.id });
        guides.horizontal.push({ y: otherElement.y + otherHeight, type: 'edge-bottom', strength: 'medium', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x, type: 'edge-left', strength: 'medium', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x + otherWidth, type: 'edge-right', strength: 'medium', elementId: otherElement.id });
    });
    
    return guides;
}

// Calculate snap guides for an element
function calculateSnapGuides(element, excludeId = null) {
    if (!snapGuidesEnabled) return { horizontal: [], vertical: [] };
    
    const guides = {
        horizontal: [],
        vertical: []
    };
    
    // Add canvas boundaries
    const canvasWidth = parseInt(document.getElementById('card-width').value);
    const canvasHeight = parseInt(document.getElementById('card-height').value);
    
    // Canvas center lines
    guides.horizontal.push({ y: canvasHeight / 2, type: 'canvas-center', strength: 'strong' });
    guides.vertical.push({ x: canvasWidth / 2, type: 'canvas-center', strength: 'strong' });
    
    // Canvas edges
    guides.horizontal.push({ y: 0, type: 'canvas-edge', strength: 'medium' });
    guides.horizontal.push({ y: canvasHeight, type: 'canvas-edge', strength: 'medium' });
    guides.vertical.push({ x: 0, type: 'canvas-edge', strength: 'medium' });
    guides.vertical.push({ x: canvasWidth, type: 'canvas-edge', strength: 'medium' });
    
    // Other elements' edges and centers
    elements.forEach(otherElement => {
        if (otherElement.id === element.id || otherElement.id === excludeId) return;
        
        // Get actual dimensions for text elements
        const otherWidth = getElementActualWidth(otherElement);
        const otherHeight = getElementActualHeight(otherElement);
        const elementWidth = getElementActualWidth(element);
        const elementHeight = getElementActualHeight(element);
        
        // Element edges
        guides.horizontal.push({ y: otherElement.y, type: 'element-top', strength: 'strong', elementId: otherElement.id });
        guides.horizontal.push({ y: otherElement.y + otherHeight, type: 'element-bottom', strength: 'strong', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x, type: 'element-left', strength: 'strong', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x + otherWidth, type: 'element-right', strength: 'strong', elementId: otherElement.id });
        
        // Element centers
        guides.horizontal.push({ y: otherElement.y + otherHeight / 2, type: 'element-center', strength: 'medium', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x + otherWidth / 2, type: 'element-center', strength: 'medium', elementId: otherElement.id });
        
        // Align with other element's edges (for precise alignment)
        guides.horizontal.push({ y: otherElement.y - elementHeight, type: 'align-bottom-top', strength: 'weak', elementId: otherElement.id });
        guides.horizontal.push({ y: otherElement.y + otherHeight, type: 'align-top-bottom', strength: 'weak', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x - elementWidth, type: 'align-right-left', strength: 'weak', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x + otherWidth, type: 'align-left-right', strength: 'weak', elementId: otherElement.id });
        
        // Add direct edge-to-edge alignment guides
        guides.horizontal.push({ y: otherElement.y, type: 'edge-top', strength: 'medium', elementId: otherElement.id });
        guides.horizontal.push({ y: otherElement.y + otherHeight, type: 'edge-bottom', strength: 'medium', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x, type: 'edge-left', strength: 'medium', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x + otherWidth, type: 'edge-right', strength: 'medium', elementId: otherElement.id });
        
        // Add center-to-center alignment guides (element center to other element center)
        guides.horizontal.push({ y: otherElement.y + otherHeight / 2, type: 'center-center-h', strength: 'strong', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x + otherWidth / 2, type: 'center-center-v', strength: 'strong', elementId: otherElement.id });
        
        // Add center-to-edge alignment guides (element center to other element edge)
        guides.horizontal.push({ y: otherElement.y, type: 'center-edge-h', strength: 'medium', elementId: otherElement.id });
        guides.horizontal.push({ y: otherElement.y + otherHeight, type: 'center-edge-h', strength: 'medium', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x, type: 'center-edge-v', strength: 'medium', elementId: otherElement.id });
        guides.vertical.push({ x: otherElement.x + otherWidth, type: 'center-edge-v', strength: 'medium', elementId: otherElement.id });
    });
    
    return guides;
}

// Find closest snap guide
function findClosestSnapGuide(position, guides, snapThreshold = 5) {
    let closestGuide = null;
    let closestDistance = snapThreshold;
    
    guides.forEach(guide => {
        const distance = Math.abs(position - guide.position);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestGuide = guide;
        }
    });
    
    return closestGuide;
}

// Apply snap guides to element position
function applySnapGuides(element, newX, newY) {
    if (!snapGuidesEnabled) return { x: newX, y: newY };
    
    const guides = calculateSnapGuides(element);
    const snapThreshold = 5; // pixels
    
    // Get actual element dimensions for proper snapping
    const elementWidth = getElementActualWidth(element);
    const elementHeight = getElementActualHeight(element);
    
    let snappedX = newX;
    let snappedY = newY;
    let hasSnapped = false;
    
    // Check horizontal snaps (Y position)
    guides.horizontal.forEach(guide => {
        let snapY = guide.y;
        
        // Adjust snap position based on guide type
        if (guide.type === 'align-bottom-top') {
            snapY = guide.y + elementHeight; // Bottom of current element to top of guide
        } else if (guide.type === 'align-top-bottom') {
            snapY = guide.y - elementHeight; // Top of current element to bottom of guide
        } else if (guide.type === 'edge-top') {
            snapY = guide.y; // Top edge alignment
        } else if (guide.type === 'edge-bottom') {
            snapY = guide.y - elementHeight; // Bottom edge alignment
        } else if (guide.type === 'center-center-h') {
            snapY = guide.y - elementHeight / 2; // Center of current element to center of other element
        } else if (guide.type === 'center-edge-h') {
            snapY = guide.y - elementHeight / 2; // Center of current element to edge of other element
        } else if (guide.type === 'canvas-center') {
            snapY = guide.y - elementHeight / 2; // Center of current element to canvas center
        }
        
        const distance = Math.abs(newY - snapY);
        if (distance <= snapThreshold) {
            snappedY = snapY;
            hasSnapped = true;
            // Show guide at the guide's position (center of other element), not the snap position
            showSnapGuide('horizontal', guide.y, guide.type, guide.strength);
        }
    });
    
    // Check vertical snaps (X position)
    guides.vertical.forEach(guide => {
        let snapX = guide.x;
        
        // Adjust snap position based on guide type
        if (guide.type === 'align-right-left') {
            snapX = guide.x + elementWidth; // Right of current element to left of guide
        } else if (guide.type === 'align-left-right') {
            snapX = guide.x - elementWidth; // Left of current element to right of guide
        } else if (guide.type === 'edge-left') {
            snapX = guide.x; // Left edge alignment
        } else if (guide.type === 'edge-right') {
            snapX = guide.x - elementWidth; // Right edge alignment
        } else if (guide.type === 'center-center-v') {
            snapX = guide.x - elementWidth / 2; // Center of current element to center of other element
        } else if (guide.type === 'center-edge-v') {
            snapX = guide.x - elementWidth / 2; // Center of current element to edge of other element
        } else if (guide.type === 'canvas-center') {
            snapX = guide.x - elementWidth / 2; // Center of current element to canvas center
        }
        
        const distance = Math.abs(newX - snapX);
        if (distance <= snapThreshold) {
            snappedX = snapX;
            hasSnapped = true;
            // Show guide at the guide's position (center of other element), not the snap position
            showSnapGuide('vertical', guide.x, guide.type, guide.strength);
        }
    });
    
    if (hasSnapped) {
    }
    
    return { x: snappedX, y: snappedY };
}

// Show axis lock indicator with visual line
function showAxisLockIndicator(lockedAxis, elementId, deltaX = 0, deltaY = 0) {
    const canvas = document.getElementById('canvas');
    let indicator = document.getElementById('axis-lock-indicator');
    let lineIndicator = document.getElementById('axis-lock-line');
    
    // Remove existing indicators
    if (indicator) indicator.remove();
    if (lineIndicator) lineIndicator.remove();
    
    // Create text indicator
    indicator = document.createElement('div');
    indicator.id = 'axis-lock-indicator';
    indicator.className = 'axis-lock-indicator';
    canvas.appendChild(indicator);
    
    // Create line indicator
    lineIndicator = document.createElement('div');
    lineIndicator.id = 'axis-lock-line';
    lineIndicator.className = 'axis-lock-line';
    
    // Add to body instead of canvas to avoid positioning issues
    document.body.appendChild(lineIndicator);
    
    const element = elements.find(e => e.id === elementId);
    if (!element) return;
    
    const zoom = parseFloat(document.getElementById('canvas-zoom').value);
    const elementCenterX = element.x + (getElementActualWidth(element) / 2);
    const elementCenterY = element.y + (getElementActualHeight(element) / 2);
    
    // Position text indicator in top-right corner
    indicator.style.position = 'absolute';
    indicator.style.top = '10px';
    indicator.style.right = '10px';
    indicator.style.background = 'rgba(0, 0, 0, 0.8)';
    indicator.style.color = 'white';
    indicator.style.padding = '8px 12px';
    indicator.style.borderRadius = '4px';
    indicator.style.fontSize = '12px';
    indicator.style.fontWeight = 'bold';
    indicator.style.display = 'block';
    indicator.style.zIndex = '10000';
    
    // Style line indicator
    lineIndicator.style.position = 'absolute';
    lineIndicator.style.background = 'rgba(255, 215, 0, 0.8)';
    lineIndicator.style.boxShadow = '0 0 6px rgba(255, 215, 0, 0.5)';
    lineIndicator.style.zIndex = '999999';
    lineIndicator.style.pointerEvents = 'none';
    lineIndicator.style.display = 'block';
    lineIndicator.style.border = 'none';
    lineIndicator.style.outline = 'none';
    
    // Force visibility
    lineIndicator.style.visibility = 'visible';
    lineIndicator.style.opacity = '0.9';
    
    if (lockedAxis === 'x') {
        // X-axis locked - show horizontal line from element center
        indicator.textContent = 'X-axis locked (Y movement only)';
        indicator.style.borderLeft = '3px solid #ff6b35';
        
        // Get canvas position relative to viewport
        const canvasRect = canvas.getBoundingClientRect();
        
        lineIndicator.style.left = `${canvasRect.left}px`;
        lineIndicator.style.width = `${canvasRect.width}px`;
        lineIndicator.style.top = `${canvasRect.top + elementCenterY * zoom}px`;
        lineIndicator.style.height = '3px';
        
    } else if (lockedAxis === 'y') {
        // Y-axis locked - show vertical line from element center
        indicator.textContent = 'Y-axis locked (X movement only)';
        indicator.style.borderLeft = '3px solid #34a853';
        
        // Get canvas position relative to viewport
        const canvasRect = canvas.getBoundingClientRect();
        
        lineIndicator.style.top = `${canvasRect.top}px`;
        lineIndicator.style.height = `${canvasRect.height}px`;
        lineIndicator.style.left = `${canvasRect.left + elementCenterX * zoom}px`;
        lineIndicator.style.width = '3px';
        
    } else {
        // Show diagonal line showing drag direction
        indicator.textContent = 'Shift: Axis lock active';
        indicator.style.borderLeft = '3px solid #ffd700';
        
        // Calculate line direction and length
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * zoom;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        
        lineIndicator.style.left = `${elementCenterX * zoom}px`;
        lineIndicator.style.top = `${elementCenterY * zoom}px`;
        lineIndicator.style.width = `${Math.max(length, 100)}px`;
        lineIndicator.style.height = '3px';
        lineIndicator.style.transformOrigin = '0 50%';
        lineIndicator.style.transform = `rotate(${angle}deg)`;
        
    }
    
    // Auto-hide after 3 seconds
    clearTimeout(indicator.hideTimeout);
    indicator.hideTimeout = setTimeout(() => {
        if (indicator) indicator.style.display = 'none';
        if (lineIndicator) lineIndicator.style.display = 'none';
    }, 3000);
}

// Show snap guide line
function showSnapGuide(orientation, position, type, strength, permanent = false) {
    const canvas = document.getElementById('canvas');
    const zoom = parseFloat(document.getElementById('canvas-zoom').value);
    
    // Scale position by zoom
    const scaledPosition = position * zoom;
    
    
    let guideId = `snap-guide-${orientation}-${type}`;
    let guide = document.getElementById(guideId);
    
    if (!guide) {
        guide = document.createElement('div');
        guide.id = guideId;
        guide.className = `snap-guide snap-guide-${orientation} snap-guide-${strength}`;
        canvas.appendChild(guide);
    }
    
    // Determine color based on type
    let backgroundColor;
    if (type === 'canvas-center') {
        backgroundColor = 'rgba(239, 68, 68, 0.7)'; // Red for canvas center
    } else if (type.includes('center-')) {
        backgroundColor = 'rgba(59, 130, 246, 0.6)'; // Blue for center alignment
    } else if (orientation === 'horizontal') {
        backgroundColor = 'rgba(255, 107, 53, 0.4)'; // Orange for horizontal lines
    } else {
        backgroundColor = 'rgba(52, 168, 83, 0.4)'; // Green for vertical lines
    }
    
    // Position the guide with zoom scaling
    if (orientation === 'horizontal') {
        guide.style.top = scaledPosition + 'px';
        guide.style.left = '0';
        guide.style.width = '100%';
        guide.style.height = (type === 'canvas-center' || type.includes('center-')) ? '2px' : '1px'; // Thicker for center guides
        guide.style.backgroundColor = backgroundColor;
        
        // For center guides, add a visual indicator showing it goes through element center
        if (type.includes('center-')) {
            guide.style.boxShadow = `0 0 8px ${backgroundColor}, inset 0 0 0 2px rgba(255,255,255,0.3)`;
            
            // Add center indicator dots at regular intervals
            guide.style.backgroundImage = `repeating-linear-gradient(
                to right,
                transparent 0px,
                transparent 8px,
                rgba(255,255,255,0.6) 8px,
                rgba(255,255,255,0.6) 10px
            )`;
        }
    } else {
        guide.style.left = scaledPosition + 'px';
        guide.style.top = '0';
        guide.style.width = (type === 'canvas-center' || type.includes('center-')) ? '2px' : '1px'; // Thicker for center guides
        guide.style.height = '100%';
        guide.style.backgroundColor = backgroundColor;
        
        // For center guides, add a visual indicator showing it goes through element center
        if (type.includes('center-')) {
            guide.style.boxShadow = `0 0 8px ${backgroundColor}, inset 0 0 0 2px rgba(255,255,255,0.3)`;
            
            // Add center indicator dots at regular intervals
            guide.style.backgroundImage = `repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent 8px,
                rgba(255,255,255,0.6) 8px,
                rgba(255,255,255,0.6) 10px
            )`;
        }
    }
    
    // Force visibility and override any CSS
    guide.style.display = 'block';
    guide.style.visibility = 'visible';
    guide.style.opacity = (type === 'canvas-center' || type.includes('center-')) ? '0.8' : '0.6'; // Higher opacity for center guides
    guide.style.zIndex = '1001';
    guide.style.position = 'absolute';
    guide.style.pointerEvents = 'none';
    
    // Force specific colors for special guide types
    if (type === 'canvas-center') {
        guide.style.backgroundColor = 'rgba(239, 68, 68, 0.8) !important';
        guide.style.setProperty('background-color', 'rgba(239, 68, 68, 0.8)', 'important');
    } else if (type.includes('center-')) {
        guide.style.backgroundColor = 'rgba(59, 130, 246, 0.6) !important';
        guide.style.setProperty('background-color', 'rgba(59, 130, 246, 0.6)', 'important');
        
        // Add center cross indicator
        const centerCross = document.createElement('div');
        centerCross.className = 'center-cross-indicator';
        centerCross.style.position = 'absolute';
        centerCross.style.width = '8px';
        centerCross.style.height = '8px';
        centerCross.style.backgroundColor = 'rgba(255,255,255,0.8)';
        centerCross.style.border = '1px solid rgba(59, 130, 246, 0.8)';
        centerCross.style.borderRadius = '50%';
        centerCross.style.top = '50%';
        centerCross.style.left = '50%';
        centerCross.style.transform = 'translate(-50%, -50%)';
        centerCross.style.zIndex = '1002';
        centerCross.style.pointerEvents = 'none';
        guide.appendChild(centerCross);
    }
    
    // Subtle glow effect with different colors for orientation and type
    if (type === 'canvas-center') {
        guide.style.boxShadow = '0 0 6px rgba(239, 68, 68, 0.4), 0 0 3px rgba(239, 68, 68, 0.3)';
    } else if (type.includes('center-')) {
        guide.style.boxShadow = '0 0 6px rgba(59, 130, 246, 0.5), 0 0 3px rgba(59, 130, 246, 0.3)';
    } else if (orientation === 'horizontal') {
        guide.style.boxShadow = '0 0 4px rgba(255, 107, 53, 0.3), 0 0 2px rgba(255, 107, 53, 0.2)';
    } else {
        guide.style.boxShadow = '0 0 4px rgba(52, 168, 83, 0.3), 0 0 2px rgba(52, 168, 83, 0.2)';
    }
    
    
    // Only auto-hide if not permanent
    if (!permanent) {
        clearTimeout(guide.hideTimeout);
        guide.hideTimeout = setTimeout(() => {
            guide.style.display = 'none';
        }, 1000); // Longer display time for better visibility
    }
}

// Hide all snap guides
function hideAllSnapGuides() {
    const guides = document.querySelectorAll('.snap-guide');
    guides.forEach(guide => {
        guide.style.display = 'none';
        if (guide.hideTimeout) {
            clearTimeout(guide.hideTimeout);
        }
    });
}

// Toggle snap guides
function toggleSnapGuides() {
    snapGuidesEnabled = !snapGuidesEnabled;
    const button = document.getElementById('snap-guides-toggle');
    if (button) {
        button.innerHTML = snapGuidesEnabled ? '<span>🧲</span><span>Snap: On</span>' : '<span>🧲</span><span>Snap: Off</span>';
        button.classList.toggle('active', snapGuidesEnabled);
    }
    
    if (!snapGuidesEnabled) {
        hideAllSnapGuides();
    }
    
    showToast(`Snap guides ${snapGuidesEnabled ? 'enabled' : 'disabled'}`, 'info');
}

// Test snap guides visibility
function testSnapGuides() {
    console.log('Testing snap guides...');
    
    // Clear any existing guides
    hideAllSnapGuides();
    
    // Show PERMANENT test lines
    showSnapGuide('horizontal', 50, 'test-h', 'strong', true);
    showSnapGuide('vertical', 100, 'test-v', 'strong', true);
    showSnapGuide('horizontal', 150, 'test-h2', 'medium', true);
    showSnapGuide('vertical', 200, 'test-v2', 'medium', true);
    
    console.log('PERMANENT test snap guides created');
    
    // Check if guides are actually in DOM
    setTimeout(() => {
        const guides = document.querySelectorAll('.snap-guide');
        console.log(`Found ${guides.length} snap guides in DOM:`, guides);
        guides.forEach((guide, index) => {
            const computedStyle = window.getComputedStyle(guide);
            console.log(`Guide ${index}:`, {
                id: guide.id,
                className: guide.className,
                style: guide.style.cssText,
                computedStyle: {
                    display: computedStyle.display,
                    visibility: computedStyle.visibility,
                    opacity: computedStyle.opacity,
                    backgroundColor: computedStyle.backgroundColor,
                    width: computedStyle.width,
                    height: computedStyle.height,
                    top: computedStyle.top,
                    left: computedStyle.left,
                    zIndex: computedStyle.zIndex
                },
                offsetTop: guide.offsetTop,
                offsetLeft: guide.offsetLeft,
                offsetWidth: guide.offsetWidth,
                offsetHeight: guide.offsetHeight,
                visible: guide.offsetWidth > 0 && guide.offsetHeight > 0
            });
        });
    }, 100);
}

// Quick test function for immediate verification

// Test function to show red canvas center lines
function testRedCanvasCenter() {
    console.log('Testing red canvas center lines...');
    hideAllSnapGuides();
    
    const canvas = document.getElementById('canvas');
    const canvasWidth = parseInt(document.getElementById('card-width').value);
    const canvasHeight = parseInt(document.getElementById('card-height').value);
    const zoom = parseFloat(document.getElementById('canvas-zoom').value);
    
    // Create direct red lines without using showSnapGuide
    const hLine = document.createElement('div');
    hLine.id = 'test-red-horizontal';
    hLine.style.position = 'absolute';
    hLine.style.top = (canvasHeight / 2 * zoom) + 'px';
    hLine.style.left = '0';
    hLine.style.width = '100%';
    hLine.style.height = '3px';
    hLine.style.backgroundColor = '#ef4444';
    hLine.style.zIndex = '2000';
    hLine.style.display = 'block';
    hLine.style.boxShadow = '0 0 8px rgba(239, 68, 68, 0.6)';
    canvas.appendChild(hLine);
    
    const vLine = document.createElement('div');
    vLine.id = 'test-red-vertical';
    vLine.style.position = 'absolute';
    vLine.style.left = (canvasWidth / 2 * zoom) + 'px';
    vLine.style.top = '0';
    vLine.style.width = '3px';
    vLine.style.height = '100%';
    vLine.style.backgroundColor = '#ef4444';
    vLine.style.zIndex = '2000';
    vLine.style.display = 'block';
    vLine.style.boxShadow = '0 0 8px rgba(239, 68, 68, 0.6)';
    canvas.appendChild(vLine);
    
    console.log('Direct red lines created - should be clearly visible');
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (hLine.parentNode) hLine.remove();
        if (vLine.parentNode) vLine.remove();
        console.log('Red test lines removed');
    }, 5000);
}

// Make test functions globally available
window.testRedCanvasCenter = testRedCanvasCenter;

// Mobile touch optimizations
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
}