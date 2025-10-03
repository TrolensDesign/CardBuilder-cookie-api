// Modern Canvas JavaScript for Cookie API Card Builder

// Canvas resize functionality
function initCanvasResize() {
    const canvas = document.getElementById('canvas');
    const resizeHandle = document.getElementById('canvas-resize-handle');
    const widthInput = document.getElementById('card-width');
    const heightInput = document.getElementById('card-height');
    
    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    // Initializing canvas resize

    if (!resizeHandle) {
        console.error('Resize handle not found! Creating new one...');
        const newHandle = document.createElement('div');
        newHandle.id = 'canvas-resize-handle';
        newHandle.className = 'canvas-resize-handle';
        canvas.appendChild(newHandle);
        return initCanvasResize();
    }

    // Make sure handle is visible and clickable
    resizeHandle.style.display = 'block';
    resizeHandle.style.pointerEvents = 'auto';
    resizeHandle.style.opacity = '1';

    resizeHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = cardElement.width;
        startHeight = cardElement.height;
        
        canvas.classList.add('resize-cursor');
        document.body.style.cursor = 'se-resize';
        document.body.style.userSelect = 'none';
        
        e.preventDefault();
        e.stopPropagation();
    });

    const handleMouseMove = function(e) {
        if (!isResizing) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        // Calculate new dimensions with better constraints
        const newWidth = Math.max(200, Math.min(1200, startWidth + deltaX));
        const newHeight = Math.max(100, Math.min(800, startHeight + deltaY));
        
        // Update inputs, cardElement, and canvas
        const newWidthRounded = Math.round(newWidth);
        const newHeightRounded = Math.round(newHeight);
        
        widthInput.value = newWidthRounded;
        heightInput.value = newHeightRounded;
        
        // Update cardElement to match inputs
        cardElement.width = newWidthRounded;
        cardElement.height = newHeightRounded;
        
        updateCanvas();
        
        // Auto-adjust zoom if canvas is too big
        setTimeout(adjustZoomForCanvasSize, 100);
    };

    const handleMouseUp = function() {
        if (isResizing) {
            isResizing = false;
            canvas.classList.remove('resize-cursor');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            updateJSON();
        }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Add visual feedback
    resizeHandle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
        this.style.opacity = '1';
    });

    resizeHandle.addEventListener('mouseleave', function() {
        if (!isResizing) {
            this.style.transform = 'scale(1)';
            this.style.opacity = '0.8';
        }
    });

    // Alternative: Allow resize by dragging canvas corner area
    canvas.addEventListener('mousedown', function(e) {
        const rect = canvas.getBoundingClientRect();
        const cornerSize = 20;
        const isNearCorner = (
            (e.clientX > rect.right - cornerSize && e.clientY > rect.bottom - cornerSize)
        );

        if (isNearCorner && !e.target.classList.contains('canvas-element')) {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = cardElement.width;
            startHeight = cardElement.height;
            
            canvas.classList.add('resize-cursor');
            document.body.style.cursor = 'se-resize';
            document.body.style.userSelect = 'none';
            
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // Add scroll zoom functionality with smooth zoom
    canvas.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const zoomSelect = document.getElementById('canvas-zoom');
        const currentZoom = parseFloat(zoomSelect.value);
        const zoomStep = 0.1;
        
        let newZoom;
        if (e.deltaY < 0) {
            // Scroll up - zoom in
            newZoom = Math.min(2.0, currentZoom + zoomStep);
        } else {
            // Scroll down - zoom out
            newZoom = Math.max(0.25, currentZoom - zoomStep);
        }
        
        // Round to nearest valid zoom level
        const zoomLevels = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
        const closestZoom = zoomLevels.reduce((prev, curr) => 
            Math.abs(curr - newZoom) < Math.abs(prev - newZoom) ? curr : prev
        );
        
        // Only update if zoom actually changed
        if (closestZoom !== currentZoom) {
            zoomSelect.value = closestZoom;
            updateCanvas();
            updateJSON();
            
            // Show zoom feedback with special styling
            showZoomFeedback(closestZoom);
        }
    });
}

// Quick Actions Functions
function centerElement() {
    if (!selectedElement) {
        showToast('Please select an element first!', 'warning');
        return;
    }
    
    const element = elements.find(e => e.id === selectedElement);
    if (!element) {
        showToast('Element not found!', 'error');
        return;
    }
    
    const canvasWidth = parseInt(document.getElementById('card-width').value);
    const canvasHeight = parseInt(document.getElementById('card-height').value);
    
    // Use actual dimensions for accurate centering
    const elementWidth = getElementActualWidth(element);
    const elementHeight = getElementActualHeight(element);
    
    element.x = (canvasWidth - elementWidth) / 2;
    element.y = (canvasHeight - elementHeight) / 2;
    
    updateCanvas();
    updateElementProperties();
    updateJSON();
    
    showToast('Element centered! 🎯', 'success');
}

function alignElement(direction) {
    if (!selectedElement) {
        showToast('Please select an element first!', 'warning');
        return;
    }
    
    const element = elements.find(e => e.id === selectedElement);
    if (!element) {
        showToast('Element not found!', 'error');
        return;
    }
    
    const canvasWidth = parseInt(document.getElementById('card-width').value);
    const canvasHeight = parseInt(document.getElementById('card-height').value);
    
    // Use actual dimensions for accurate alignment
    const elementWidth = getElementActualWidth(element);
    const elementHeight = getElementActualHeight(element);
    
    switch(direction) {
        case 'top':
            element.y = 0;
            break;
        case 'bottom':
            element.y = canvasHeight - elementHeight;
            break;
        case 'left':
            element.x = 0;
            break;
        case 'right':
            element.x = canvasWidth - elementWidth;
            break;
    }
    
    updateCanvas();
    updateElementProperties();
    updateJSON();
    
    showToast(`Element aligned to ${direction}! ⬆️⬇️⬅️➡️`, 'success');
}

function fitToCanvas() {
    if (!selectedElement) {
        showToast('Please select an element first!', 'warning');
        return;
    }
    
    const element = elements.find(e => e.id === selectedElement);
    if (!element) {
        showToast('Element not found!', 'error');
        return;
    }
    
    
    const canvasWidth = parseInt(document.getElementById('card-width').value);
    const canvasHeight = parseInt(document.getElementById('card-height').value);
    
    // Handle text elements first
    if (element.type === 'text') {
        // For text elements, set size to 72px and center
        const targetSize = Math.min(72, Math.min(canvasWidth, canvasHeight));
        element.fontSize = targetSize;
        
        // Update canvas first to get new dimensions
        updateCanvas();
        
        // Update properties panel to show new fontSize
        updateElementProperties();
        
        // Now center the element with updated dimensions
        const elementWidth = getElementActualWidth(element);
        const elementHeight = getElementActualHeight(element);
        element.x = (canvasWidth - elementWidth) / 2;
        element.y = (canvasHeight - elementHeight) / 2;
    } else if (element.widthAuto || element.width === 'auto') {
        // Handle auto width elements (profiles) - they should maintain square aspect ratio
        const size = Math.min(canvasWidth, canvasHeight);
        element.height = size;
        element.x = (canvasWidth - size) / 2;
        element.y = (canvasHeight - size) / 2;
    } else {
        // Fit element to canvas while maintaining aspect ratio
        const currentWidth = getElementActualWidth(element);
        const currentHeight = getElementActualHeight(element);
        const aspectRatio = currentWidth / currentHeight;
        const canvasAspectRatio = canvasWidth / canvasHeight;
        
        if (aspectRatio > canvasAspectRatio) {
            // Element is wider, fit to width
            element.width = canvasWidth;
            element.height = canvasWidth / aspectRatio;
        } else {
            // Element is taller, fit to height
            element.height = canvasHeight;
            element.width = canvasHeight * aspectRatio;
        }
        
        // Center the element
        element.x = (canvasWidth - element.width) / 2;
        element.y = (canvasHeight - element.height) / 2;
    }
    
    updateCanvas();
    updateElementProperties();
    updateJSON();
    
    showToast('Element fitted to canvas! 📐', 'success');
}

function resetPosition() {
    if (!selectedElement) {
        showToast('Please select an element first!', 'warning');
        return;
    }
    
    const element = elements.find(e => e.id === selectedElement);
    if (!element) {
        showToast('Element not found!', 'error');
        return;
    }
    
    // Reset to default position
    element.x = 50;
    element.y = 50;
    
    // Reset to default size based on type
    switch(element.type) {
        case 'text':
            // Text elements auto-size, so we don't set fixed dimensions
            break;
        case 'discord_profile':
            element.width = 50;
            element.height = 50;
            break;
        case 'roblox_profile':
            element.width = 'auto';
            element.height = 50;
            element.widthAuto = true;
            break;
        case 'image':
            element.width = 100;
            element.height = 100;
            break;
        case 'progressbar':
            element.width = 200;
            element.height = 20;
            break;
        default:
            element.width = 100;
            element.height = 100;
    }
    
    updateCanvas();
    updateElementProperties();
    updateJSON();
    
    showToast('Element position reset! 🔄', 'success');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Only handle shortcuts when not in input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
    }
    
    // Ctrl/Cmd + Z for undo (placeholder)
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        showToast('Undo feature coming soon! ↩️', 'info');
    }
    
    // Ctrl/Cmd + Plus for scaling up selected elements
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        if (selectedElements.length > 1) {
            // Scale up all selected elements
            resizeSelectedElements(1.1);
            showToast(`${selectedElements.length} elements scaled up! 📈`, 'success');
        } else if (selectedElement && selectedElement !== 'card') {
            // Scale up single selected element
            const element = elements.find(el => el.id === selectedElement);
            if (element) {
                if (element.type === 'text') {
                    element.fontSize = Math.min(72, element.fontSize + 2);
                } else {
                    element.width = Math.min(500, element.width * 1.1);
                    element.height = Math.min(500, element.height * 1.1);
                }
                updateCanvas();
                updateElementProperties();
                updateJSON();
                showToast('Element scaled up! 📈', 'success');
            }
        }
    }
    
    // Ctrl/Cmd + Minus for scaling down selected elements
    if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        if (selectedElements.length > 1) {
            // Scale down all selected elements
            resizeSelectedElements(0.9);
            showToast(`${selectedElements.length} elements scaled down! 📉`, 'success');
        } else if (selectedElement && selectedElement !== 'card') {
            // Scale down single selected element
            const element = elements.find(el => el.id === selectedElement);
            if (element) {
                if (element.type === 'text') {
                    element.fontSize = Math.max(8, element.fontSize - 2);
                } else {
                    element.width = Math.max(10, element.width * 0.9);
                    element.height = Math.max(10, element.height * 0.9);
                }
                updateCanvas();
                updateElementProperties();
                updateJSON();
                showToast('Element scaled down! 📉', 'success');
            }
        }
    }
    
    // Delete key to delete selected element
    if (e.key === 'Delete' && selectedElement && selectedElement !== 'card') {
        deleteElement();
    }
    
    // Arrow keys for precise movement
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) && selectedElement && selectedElement !== 'card') {
        e.preventDefault();
        const element = elements.find(e => e.id === selectedElement);
        if (element) {
            const step = e.shiftKey ? 10 : 1; // Shift for larger steps
            switch(e.key) {
                case 'ArrowUp':
                    element.y = Math.max(0, element.y - step);
                    break;
                case 'ArrowDown':
                    element.y = Math.min(cardElement.height - element.height, element.y + step);
                    break;
                case 'ArrowLeft':
                    element.x = Math.max(0, element.x - step);
                    break;
                case 'ArrowRight':
                    const maxX = cardElement.width - (element.widthAuto || element.width === 'auto' ? element.height : element.width);
                    element.x = Math.min(maxX, element.x + step);
                    break;
            }
            updateCanvas();
            updateElementProperties();
            updateJSON();
        }
    }
    
    // Escape to deselect
    if (e.key === 'Escape') {
        selectedElement = 'card';
        updateCanvas();
        updateElementProperties();
        updateQuickActionsState();
    }
});

// Show zoom feedback with special styling
function showZoomFeedback(zoom) {
    const toast = document.createElement('div');
    toast.className = 'toast zoom-feedback';
    toast.innerHTML = `
        <span>🔍</span>
        <span>Zoom: ${Math.round(zoom * 100)}%</span>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 1.5 seconds
    setTimeout(() => {
        toast.remove();
    }, 1500);
}

// Touch device optimizations
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
}

// Auto-adjust zoom to fit canvas in container
function autoAdjustZoom() {
    const canvas = document.getElementById('canvas');
    const container = document.querySelector('.canvas-container');
    if (!canvas || !container) return;
    
    const containerRect = container.getBoundingClientRect();
    const maxWidth = containerRect.width - 40; // 40px padding
    const maxHeight = containerRect.height - 40;
    
    const currentZoom = parseFloat(document.getElementById('canvas-zoom').value);
    const canvasWidth = cardElement.width * currentZoom;
    const canvasHeight = cardElement.height * currentZoom;
    
    if (canvasWidth > maxWidth || canvasHeight > maxHeight) {
        const scaleX = maxWidth / cardElement.width;
        const scaleY = maxHeight / cardElement.height;
        const newZoom = Math.min(scaleX, scaleY, 2.0);
        
        document.getElementById('canvas-zoom').value = Math.max(0.25, newZoom).toFixed(2);
        updateCanvas();
        updateJSON();
    }
}

// Set default zoom to 75% for all devices
const canvasZoom = document.getElementById('canvas-zoom');
if (canvasZoom) {
    canvasZoom.value = '0.75'; // Default to 75% zoom
    updateCanvas();
}

// Auto-adjust zoom based on canvas size
function adjustZoomForCanvasSize() {
    const canvas = document.getElementById('canvas');
    const container = document.querySelector('.canvas-container');
    if (!canvas || !container) return;
    
    const containerRect = container.getBoundingClientRect();
    const maxWidth = containerRect.width - 40; // 40px padding
    const maxHeight = containerRect.height - 40;
    
    const currentZoom = parseFloat(document.getElementById('canvas-zoom').value);
    const canvasWidth = cardElement.width * currentZoom;
    const canvasHeight = cardElement.height * currentZoom;
    
    // If canvas is too big, reduce zoom
    if (canvasWidth > maxWidth || canvasHeight > maxHeight) {
        const scaleX = maxWidth / cardElement.width;
        const scaleY = maxHeight / cardElement.height;
        const newZoom = Math.min(scaleX, scaleY, 0.75); // Max 75%
        
        // Round to nearest valid zoom level
        const zoomLevels = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
        const closestZoom = zoomLevels.reduce((prev, curr) => 
            Math.abs(curr - newZoom) < Math.abs(prev - newZoom) ? curr : prev
        );
        
        // Only update if zoom actually changed
        const currentZoom = parseFloat(document.getElementById('canvas-zoom').value);
        if (Math.abs(closestZoom - currentZoom) > 0.01) {
            document.getElementById('canvas-zoom').value = Math.max(0.25, closestZoom);
            updateCanvas();
            updateJSON();
        }
    }
}

// Adjust canvas zoom for mobile
if (isMobileDevice()) {
    const canvasZoom = document.getElementById('canvas-zoom');
    if (canvasZoom) {
        canvasZoom.value = '0.5'; // Default to 50% zoom on mobile
        updateCanvas();
    }
}

// Auto-adjust zoom on window resize
window.addEventListener('resize', function() {
    setTimeout(autoAdjustZoom, 100);
    setTimeout(adjustZoomForCanvasSize, 100);
});