// Modern Mobile JavaScript for Cookie API Card Builder
let currentMobilePanel = null;

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
}

function openMobilePanel(panelName) {
    
    // Close any existing panel
    closeMobilePanel();
    
    // Update active button
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.closest('.mobile-nav-btn').classList.add('active');
    
    // Show appropriate panel
    if (panelName === 'tools') {
        showToolsPanel();
    } else if (panelName === 'canvas') {
        showCanvasPanel();
    } else if (panelName === 'properties') {
        showPropertiesPanel();
    }
    
    currentMobilePanel = panelName;
}

function closeMobilePanel() {
    
    // Hide all panels
    hideToolsPanel();
    hideCanvasPanel();
    hidePropertiesPanel();
    
    // Remove active state
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    currentMobilePanel = null;
}

function showToolsPanel() {
    // Create mobile tools overlay
    const overlay = document.createElement('div');
    overlay.id = 'mobile-tools-overlay';
    overlay.className = 'mobile-panel-overlay';
    overlay.innerHTML = `
        <div class="mobile-panel">
            <div class="mobile-panel-header">
                <h3>Tools</h3>
                <button class="mobile-close-btn" onclick="closeMobilePanel()">×</button>
            </div>
            <div class="mobile-panel-content">
                <div class="mobile-section">
                    <h4>Add Elements</h4>
                    <div class="mobile-element-grid">
                        <button class="mobile-element-btn" onclick="addElement('text'); closeMobilePanel();">
                            <span>📝</span>
                            <span>Text</span>
                        </button>
                        <button class="mobile-element-btn" onclick="addElement('image'); closeMobilePanel();">
                            <span>🖼️</span>
                            <span>Image</span>
                        </button>
                        <button class="mobile-element-btn" onclick="addElement('discord_profile'); closeMobilePanel();">
                            <span>👤</span>
                            <span>Discord</span>
                        </button>
                        <button class="mobile-element-btn" onclick="addElement('roblox_profile'); closeMobilePanel();">
                            <span>🎮</span>
                            <span>Roblox</span>
                        </button>
                        <button class="mobile-element-btn" onclick="addElement('progressbar'); closeMobilePanel();">
                            <span>📊</span>
                            <span>Progress</span>
                        </button>
                    </div>
                </div>
                <div class="mobile-section">
                    <h4>Quick Actions</h4>
                    <div class="mobile-action-grid">
                        <button class="mobile-action-btn" onclick="centerElement(); closeMobilePanel();">
                            <span>🎯</span>
                            <span>Center</span>
                        </button>
                        <button class="mobile-action-btn" onclick="alignElement('top'); closeMobilePanel();">
                            <span>⬆️</span>
                            <span>Top</span>
                        </button>
                        <button class="mobile-action-btn" onclick="alignElement('bottom'); closeMobilePanel();">
                            <span>⬇️</span>
                            <span>Bottom</span>
                        </button>
                        <button class="mobile-action-btn" onclick="alignElement('left'); closeMobilePanel();">
                            <span>⬅️</span>
                            <span>Left</span>
                        </button>
                        <button class="mobile-action-btn" onclick="alignElement('right'); closeMobilePanel();">
                            <span>➡️</span>
                            <span>Right</span>
                        </button>
                    </div>
                </div>
                <div class="mobile-section">
                    <h4>Templates</h4>
                    <div class="mobile-template-list">
                        <button class="mobile-template-btn" onclick="loadTemplate('level'); closeMobilePanel();">
                            Level Up
                        </button>
                        <button class="mobile-template-btn" onclick="loadTemplate('achievement'); closeMobilePanel();">
                            Achievement
                        </button>
                        <button class="mobile-template-btn" onclick="loadTemplate('profile'); closeMobilePanel();">
                            Profile
                        </button>
                        <button class="mobile-template-btn" onclick="loadTemplate('discord_card'); closeMobilePanel();">
                            Discord Card
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add touch-friendly styles
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9999;
        display: flex;
        align-items: flex-end;
        backdrop-filter: blur(5px);
    `;
}

function hideToolsPanel() {
    const overlay = document.getElementById('mobile-tools-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function showCanvasPanel() {
    const overlay = document.createElement('div');
    overlay.id = 'mobile-canvas-overlay';
    overlay.className = 'mobile-panel-overlay';
    overlay.innerHTML = `
        <div class="mobile-panel">
            <div class="mobile-panel-header">
                <h3>Canvas</h3>
                <button class="mobile-close-btn" onclick="closeMobilePanel()">×</button>
            </div>
            <div class="mobile-panel-content">
                <div class="mobile-section">
                    <h4>Canvas Size</h4>
                    <div class="mobile-input-group">
                        <label>Width</label>
                        <input type="number" id="mobile-canvas-width" value="${cardElement.width}" min="100" max="1000">
                    </div>
                    <div class="mobile-input-group">
                        <label>Height</label>
                        <input type="number" id="mobile-canvas-height" value="${cardElement.height}" min="50" max="1000">
                    </div>
                    <button class="mobile-apply-btn" onclick="applyCanvasSize(); closeMobilePanel();">
                        Apply Size
                    </button>
                </div>
                <div class="mobile-section">
                    <h4>Background</h4>
                    <div class="mobile-bg-options">
                        <button class="mobile-bg-btn" onclick="setBackgroundType('color'); closeMobilePanel();">
                            <span>🎨</span>
                            <span>Color</span>
                        </button>
                        <button class="mobile-bg-btn" onclick="setBackgroundType('image'); closeMobilePanel();">
                            <span>🖼️</span>
                            <span>Image</span>
                        </button>
                        <button class="mobile-bg-btn" onclick="setBackgroundType('transparent'); closeMobilePanel();">
                            <span>👻</span>
                            <span>Transparent</span>
                        </button>
                    </div>
                </div>
                <div class="mobile-section">
                    <h4>Zoom</h4>
                    <div class="mobile-zoom-controls">
                        <button class="mobile-zoom-btn" onclick="changeZoom(-0.25);">-</button>
                        <span id="mobile-zoom-display">${Math.round(parseFloat(document.getElementById('canvas-zoom').value) * 100)}%</span>
                        <button class="mobile-zoom-btn" onclick="changeZoom(0.25);">+</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9999;
        display: flex;
        align-items: flex-end;
        backdrop-filter: blur(5px);
    `;
}

function hideCanvasPanel() {
    const overlay = document.getElementById('mobile-canvas-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function showPropertiesPanel() {
    const overlay = document.createElement('div');
    overlay.id = 'mobile-properties-overlay';
    overlay.className = 'mobile-panel-overlay';
    
    let content = `
        <div class="mobile-panel">
            <div class="mobile-panel-header">
                <h3>Properties</h3>
                <button class="mobile-close-btn" onclick="closeMobilePanel()">×</button>
            </div>
            <div class="mobile-panel-content">
    `;
    
    if (selectedElement && selectedElement !== 'card') {
        const element = elements.find(e => e.id === selectedElement);
        if (element) {
            content += `
                <div class="mobile-section">
                    <h4>Position</h4>
                    <div class="mobile-input-group">
                        <label>X</label>
                        <input type="number" id="mobile-element-x" value="${element.x}" min="0" step="1">
                    </div>
                    <div class="mobile-input-group">
                        <label>Y</label>
                        <input type="number" id="mobile-element-y" value="${element.y}" min="0" step="1">
                    </div>
                </div>
            `;
            
            if (element.type === 'text') {
                content += `
                    <div class="mobile-section">
                        <h4>Text Properties</h4>
                        <div class="mobile-input-group">
                            <label>Content</label>
                            <textarea id="mobile-element-text" rows="3">${element.text}</textarea>
                        </div>
                        <div class="mobile-input-group">
                            <label>Font Size</label>
                            <input type="number" id="mobile-element-fontsize" value="${element.fontSize}" min="8" max="72">
                        </div>
                        <div class="mobile-input-group">
                            <label>Font Family</label>
                            <select id="mobile-element-fontfamily">
                                <option value="Inter" ${element.fontFamily === 'Inter' ? 'selected' : ''}>Inter</option>
                                <option value="Roboto" ${element.fontFamily === 'Roboto' ? 'selected' : ''}>Roboto</option>
                                <option value="Open Sans" ${element.fontFamily === 'Open Sans' ? 'selected' : ''}>Open Sans</option>
                                <option value="DM Sans" ${element.fontFamily === 'DM Sans' ? 'selected' : ''}>DM Sans</option>
                                <option value="Poppins" ${element.fontFamily === 'Poppins' ? 'selected' : ''}>Poppins</option>
                                <option value="Nunito" ${element.fontFamily === 'Nunito' ? 'selected' : ''}>Nunito</option>
                                <option value="Source Sans Pro" ${element.fontFamily === 'Source Sans Pro' ? 'selected' : ''}>Source Sans Pro</option>
                                <option value="Lato" ${element.fontFamily === 'Lato' ? 'selected' : ''}>Lato</option>
                                <option value="Montserrat" ${element.fontFamily === 'Montserrat' ? 'selected' : ''}>Montserrat</option>
                                <option value="Raleway" ${element.fontFamily === 'Raleway' ? 'selected' : ''}>Raleway</option>
                                <option value="Ubuntu" ${element.fontFamily === 'Ubuntu' ? 'selected' : ''}>Ubuntu</option>
                                <option value="Playfair Display" ${element.fontFamily === 'Playfair Display' ? 'selected' : ''}>Playfair Display</option>
                                <option value="Merriweather" ${element.fontFamily === 'Merriweather' ? 'selected' : ''}>Merriweather</option>
                                <option value="Oswald" ${element.fontFamily === 'Oswald' ? 'selected' : ''}>Oswald</option>
                                <option value="Lora" ${element.fontFamily === 'Lora' ? 'selected' : ''}>Lora</option>
                                <option value="Oleo Script" ${element.fontFamily === 'Oleo Script' ? 'selected' : ''}>Oleo Script</option>
                                <option value="Pacifico" ${element.fontFamily === 'Pacifico' ? 'selected' : ''}>Pacifico</option>
                                <option value="Dancing Script" ${element.fontFamily === 'Dancing Script' ? 'selected' : ''}>Dancing Script</option>
                                <option value="Caveat" ${element.fontFamily === 'Caveat' ? 'selected' : ''}>Caveat</option>
                                <option value="Comfortaa" ${element.fontFamily === 'Comfortaa' ? 'selected' : ''}>Comfortaa</option>
                                <option value="Fredoka" ${element.fontFamily === 'Fredoka' ? 'selected' : ''}>Fredoka</option>
                                <option value="Quicksand" ${element.fontFamily === 'Quicksand' ? 'selected' : ''}>Quicksand</option>
                                <option value="Rubik" ${element.fontFamily === 'Rubik' ? 'selected' : ''}>Rubik</option>
                                <option value="Work Sans" ${element.fontFamily === 'Work Sans' ? 'selected' : ''}>Work Sans</option>
                                <option value="JetBrains Mono" ${element.fontFamily === 'JetBrains Mono' ? 'selected' : ''}>JetBrains Mono</option>
                            </select>
                        </div>
                        <div class="mobile-input-group">
                            <label>Text Color</label>
                            <input type="color" id="mobile-element-textcolor" value="${element.textColor}">
                        </div>
                        <div class="mobile-input-group">
                            <label>Opacity</label>
                            <input type="range" id="mobile-element-opacity" min="0" max="100" value="${element.opacity || 100}">
                            <span id="mobile-opacity-value">${element.opacity || 100}%</span>
                        </div>
                    </div>
                `;
            } else if (element.type === 'image') {
                content += `
                    <div class="mobile-section">
                        <h4>Image Properties</h4>
                        <div class="mobile-input-group">
                            <label>Image URL</label>
                            <input type="url" id="mobile-element-imageurl" value="${element.imageUrl || ''}" placeholder="https://...">
                        </div>
                        <div class="mobile-input-group">
                            <label>Width</label>
                            <input type="number" id="mobile-element-width" value="${element.width}" min="10" max="1000">
                        </div>
                        <div class="mobile-input-group">
                            <label>Height</label>
                            <input type="number" id="mobile-element-height" value="${element.height}" min="10" max="1000">
                        </div>
                        <div class="mobile-input-group">
                            <label>Border Radius</label>
                            <input type="range" id="mobile-element-borderradius" min="0" max="50" value="${element.borderRadius || 0}">
                            <span id="mobile-border-radius-value">${element.borderRadius || 0}px</span>
                        </div>
                        <div class="mobile-input-group">
                            <label>Opacity</label>
                            <input type="range" id="mobile-element-opacity" min="0" max="100" value="${element.opacity || 100}">
                            <span id="mobile-opacity-value">${element.opacity || 100}%</span>
                        </div>
                    </div>
                `;
            } else if (element.type === 'discord_profile' || element.type === 'roblox_profile') {
                const profileType = element.type === 'discord_profile' ? 'Discord' : 'Roblox';
                content += `
                    <div class="mobile-section">
                        <h4>${profileType} Profile Properties</h4>
                        <div class="mobile-input-group">
                            <label>User ID</label>
                            <input type="text" id="mobile-element-userid" value="${element.userId || ''}" placeholder="User ID">
                        </div>
                        <div class="mobile-input-group">
                            <label>Avatar URL</label>
                            <input type="url" id="mobile-element-avatarurl" value="${element.avatarUrl || ''}" placeholder="https://...">
                        </div>
                        <div class="mobile-input-group">
                            <label>Username</label>
                            <input type="text" id="mobile-element-username" value="${element.name || ''}" placeholder="Username">
                        </div>
                        ${element.type === 'discord_profile' ? `
                        <div class="mobile-input-group">
                            <label>Status</label>
                            <select id="mobile-element-status">
                                <option value="online" ${element.status === 'online' ? 'selected' : ''}>Online</option>
                                <option value="idle" ${element.status === 'idle' ? 'selected' : ''}>Idle</option>
                                <option value="dnd" ${element.status === 'dnd' ? 'selected' : ''}>Do Not Disturb</option>
                                <option value="offline" ${element.status === 'offline' ? 'selected' : ''}>Offline</option>
                            </select>
                        </div>
                        ` : ''}
                    </div>
                `;
            } else if (element.type === 'progressbar') {
                content += `
                    <div class="mobile-section">
                        <h4>Progress Bar Properties</h4>
                        <div class="mobile-input-group">
                            <label>Progress Value</label>
                            <input type="range" id="mobile-element-progressvalue" min="0" max="100" value="${element.progressValue || 0}">
                            <span id="mobile-progress-value">${element.progressValue || 0}%</span>
                        </div>
                        <div class="mobile-input-group">
                            <label>Max Value</label>
                            <input type="number" id="mobile-element-progressmax" value="${element.progressMax || 100}" min="1" max="1000">
                        </div>
                        <div class="mobile-input-group">
                            <label>Progress Color</label>
                            <input type="color" id="mobile-element-progresscolor" value="${element.progressColor || '#10b981'}">
                        </div>
                        <div class="mobile-input-group">
                            <label>Background Color</label>
                            <input type="color" id="mobile-element-progressbgcolor" value="${element.progressBgColor || '#334155'}">
                        </div>
                        <div class="mobile-input-group">
                            <label>Border Radius</label>
                            <input type="range" id="mobile-element-borderradius" min="0" max="50" value="${element.progressBorderRadius || 0}">
                            <span id="mobile-border-radius-value">${element.progressBorderRadius || 0}px</span>
                        </div>
                    </div>
                `;
            }
            
            content += `
                <div class="mobile-section">
                    <h4>Actions</h4>
                    <button class="mobile-action-btn" onclick="deleteElement(); closeMobilePanel();">
                        <span>🗑️</span>
                        <span>Delete</span>
                    </button>
                </div>
            `;
        }
    } else {
        content += `
            <div class="mobile-section">
                <p>Select an element to edit its properties</p>
            </div>
        `;
    }
    
    content += `
            </div>
        </div>
    `;
    
    overlay.innerHTML = content;
    document.body.appendChild(overlay);
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9999;
        display: flex;
        align-items: flex-end;
        backdrop-filter: blur(5px);
    `;
    
    // Add event listeners for mobile properties
    addMobilePropertyListeners(element);
}

function hidePropertiesPanel() {
    const overlay = document.getElementById('mobile-properties-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Mobile-specific helper functions
function applyCanvasSize() {
    const width = parseInt(document.getElementById('mobile-canvas-width').value);
    const height = parseInt(document.getElementById('mobile-canvas-height').value);
    
    if (width && height) {
        cardElement.width = width;
        cardElement.height = height;
        updateCanvas();
        updateJSON();
        showToast('Canvas size updated! 📐', 'success');
    }
}

function setBackgroundType(type) {
    cardElement.bg_type = type;
    if (type === 'transparent') {
        cardElement.bg_transparent = true;
    } else {
        cardElement.bg_transparent = false;
        if (type === 'color') {
            cardElement.bg = '#1a1a2e';
        }
    }
    updateCanvas();
    updateJSON();
    showToast(`Background set to ${type}! 🎨`, 'success');
}

function changeZoom(delta) {
    const zoomInput = document.getElementById('canvas-zoom');
    const currentZoom = parseFloat(zoomInput.value);
    const newZoom = Math.max(0.25, Math.min(2.0, currentZoom + delta));
    zoomInput.value = newZoom.toFixed(2);
    updateCanvas();
    
    const display = document.getElementById('mobile-zoom-display');
    if (display) {
        display.textContent = Math.round(newZoom * 100) + '%';
    }
}

// Add event listeners for mobile properties
function addMobilePropertyListeners(element) {
    // Position listeners
    const xInput = document.getElementById('mobile-element-x');
    const yInput = document.getElementById('mobile-element-y');
    
    if (xInput) {
        xInput.addEventListener('input', () => {
            element.x = Math.max(parseFloat(xInput.value) || 1, 1);
            updateCanvas();
            updateJSON();
        });
    }
    
    if (yInput) {
        yInput.addEventListener('input', () => {
            element.y = Math.max(parseFloat(yInput.value) || 1, 1);
            updateCanvas();
            updateJSON();
        });
    }
    
    // Type-specific listeners
    if (element.type === 'text') {
        setupTextMobileListeners(element);
    } else if (element.type === 'image') {
        setupImageMobileListeners(element);
    } else if (element.type === 'discord_profile' || element.type === 'roblox_profile') {
        setupProfileMobileListeners(element);
    } else if (element.type === 'progressbar') {
        setupProgressBarMobileListeners(element);
    }
}

function setupTextMobileListeners(element) {
    const textInput = document.getElementById('mobile-element-text');
    const fontSizeInput = document.getElementById('mobile-element-fontsize');
    const fontFamilySelect = document.getElementById('mobile-element-fontfamily');
    const textColorInput = document.getElementById('mobile-element-textcolor');
    const opacityInput = document.getElementById('mobile-element-opacity');
    const opacityValue = document.getElementById('mobile-opacity-value');
    
    if (textInput) {
        textInput.addEventListener('input', () => {
            element.text = textInput.value;
            updateCanvas();
            updateJSON();
        });
    }
    
    if (fontSizeInput) {
        fontSizeInput.addEventListener('input', () => {
            element.fontSize = Math.max(parseInt(fontSizeInput.value) || 8, 8);
            updateCanvas();
            updateJSON();
        });
    }
    
    if (fontFamilySelect) {
        fontFamilySelect.addEventListener('change', () => {
            element.fontFamily = fontFamilySelect.value;
            updateCanvas();
            updateJSON();
        });
    }
    
    if (textColorInput) {
        textColorInput.addEventListener('change', () => {
            element.textColor = textColorInput.value;
            updateCanvas();
            updateJSON();
        });
    }
    
    if (opacityInput && opacityValue) {
        opacityInput.addEventListener('input', () => {
            element.opacity = parseInt(opacityInput.value);
            opacityValue.textContent = element.opacity + '%';
            updateCanvas();
            updateJSON();
        });
    }
}

function setupImageMobileListeners(element) {
    const imageUrlInput = document.getElementById('mobile-element-imageurl');
    const widthInput = document.getElementById('mobile-element-width');
    const heightInput = document.getElementById('mobile-element-height');
    const borderRadiusInput = document.getElementById('mobile-element-borderradius');
    const borderRadiusValue = document.getElementById('mobile-border-radius-value');
    const opacityInput = document.getElementById('mobile-element-opacity');
    const opacityValue = document.getElementById('mobile-opacity-value');
    
    if (imageUrlInput) {
        imageUrlInput.addEventListener('input', () => {
            element.imageUrl = imageUrlInput.value;
            updateCanvas();
            updateJSON();
        });
    }
    
    if (widthInput) {
        widthInput.addEventListener('input', () => {
            element.width = Math.max(parseInt(widthInput.value) || 10, 10);
            updateCanvas();
            updateJSON();
        });
    }
    
    if (heightInput) {
        heightInput.addEventListener('input', () => {
            element.height = Math.max(parseInt(heightInput.value) || 10, 10);
            updateCanvas();
            updateJSON();
        });
    }
    
    if (borderRadiusInput && borderRadiusValue) {
        borderRadiusInput.addEventListener('input', () => {
            element.borderRadius = parseInt(borderRadiusInput.value);
            borderRadiusValue.textContent = element.borderRadius + 'px';
            updateCanvas();
            updateJSON();
        });
    }
    
    if (opacityInput && opacityValue) {
        opacityInput.addEventListener('input', () => {
            element.opacity = parseInt(opacityInput.value);
            opacityValue.textContent = element.opacity + '%';
            updateCanvas();
            updateJSON();
        });
    }
}

function setupProfileMobileListeners(element) {
    const userIdInput = document.getElementById('mobile-element-userid');
    const avatarUrlInput = document.getElementById('mobile-element-avatarurl');
    const usernameInput = document.getElementById('mobile-element-username');
    const statusSelect = document.getElementById('mobile-element-status');
    
    if (userIdInput) {
        userIdInput.addEventListener('input', () => {
            element.userId = userIdInput.value;
            updateCanvas();
            updateJSON();
        });
    }
    
    if (avatarUrlInput) {
        avatarUrlInput.addEventListener('input', () => {
            element.avatarUrl = avatarUrlInput.value;
            updateCanvas();
            updateJSON();
        });
    }
    
    if (usernameInput) {
        usernameInput.addEventListener('input', () => {
            element.name = usernameInput.value;
            updateCanvas();
            updateJSON();
        });
    }
    
    if (statusSelect) {
        statusSelect.addEventListener('change', () => {
            element.status = statusSelect.value;
            updateCanvas();
            updateJSON();
        });
    }
}

function setupProgressBarMobileListeners(element) {
    const progressValueInput = document.getElementById('mobile-element-progressvalue');
    const progressValueDisplay = document.getElementById('mobile-progress-value');
    const progressMaxInput = document.getElementById('mobile-element-progressmax');
    const progressColorInput = document.getElementById('mobile-element-progresscolor');
    const progressBgColorInput = document.getElementById('mobile-element-progressbgcolor');
    const borderRadiusInput = document.getElementById('mobile-element-borderradius');
    const borderRadiusValue = document.getElementById('mobile-border-radius-value');
    
    if (progressValueInput && progressValueDisplay) {
        progressValueInput.addEventListener('input', () => {
            element.progressValue = parseInt(progressValueInput.value);
            progressValueDisplay.textContent = element.progressValue + '%';
            updateCanvas();
            updateJSON();
        });
    }
    
    if (progressMaxInput) {
        progressMaxInput.addEventListener('input', () => {
            element.progressMax = Math.max(parseInt(progressMaxInput.value) || 1, 1);
            updateCanvas();
            updateJSON();
        });
    }
    
    if (progressColorInput) {
        progressColorInput.addEventListener('change', () => {
            element.progressColor = progressColorInput.value;
            updateCanvas();
            updateJSON();
        });
    }
    
    if (progressBgColorInput) {
        progressBgColorInput.addEventListener('change', () => {
            element.progressBgColor = progressBgColorInput.value;
            updateCanvas();
            updateJSON();
        });
    }
    
    if (borderRadiusInput && borderRadiusValue) {
        borderRadiusInput.addEventListener('input', () => {
            element.progressBorderRadius = parseInt(borderRadiusInput.value);
            borderRadiusValue.textContent = element.progressBorderRadius + 'px';
            updateCanvas();
            updateJSON();
        });
    }
}

// Initialize mobile features
document.addEventListener('DOMContentLoaded', function() {
    if (isMobileDevice()) {
        
        // Add mobile-specific classes
        document.body.classList.add('mobile-device');
        
        // Set default zoom for mobile
        const canvasZoom = document.getElementById('canvas-zoom');
        if (canvasZoom) {
            canvasZoom.value = '0.5';
            updateCanvas();
        }
        
        // Add touch-friendly resize handles
        document.querySelectorAll('.resize-handle').forEach(handle => {
            handle.style.minWidth = '20px';
            handle.style.minHeight = '20px';
        });
    }
});
