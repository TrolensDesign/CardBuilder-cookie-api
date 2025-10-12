// Modern Properties JavaScript for Cookie API Card Builder

// Update card properties panel
function updateCardProperties() {
    const cardPropertiesPanel = document.getElementById('card-properties');
    const elementPropertiesPanel = document.getElementById('element-properties');
    
    if (cardPropertiesPanel && elementPropertiesPanel) {
        cardPropertiesPanel.style.display = 'block';
        elementPropertiesPanel.style.display = 'none';
    }
    
    // Update card property values
    const widthInput = document.getElementById('card-width');
    const heightInput = document.getElementById('card-height');
    const bgTypeSelect = document.getElementById('bg-type');
    const bgColorInput = document.getElementById('bg-color');
    const bgImageInput = document.getElementById('bg-image');
    const bgTransparentCheckbox = document.getElementById('bg-transparent');
    
    if (widthInput) widthInput.value = cardElement.width;
    if (heightInput) heightInput.value = cardElement.height;
    if (bgTypeSelect) bgTypeSelect.value = cardElement.bg_type;
    if (bgColorInput) bgColorInput.value = cardElement.bg;
    if (bgImageInput) bgImageInput.value = cardElement.bg_image;
    if (bgTransparentCheckbox) bgTransparentCheckbox.checked = cardElement.bg_transparent;
}

// Update element properties panel with modern UX
function updateElementProperties() {
    if (selectedElement === 'card') {
        updateCardProperties();
        return;
    }
    
    // Handle multi-selection
    if (selectedElements.length > 1) {
        updateMultiSelectProperties();
        return;
    }
    
    const element = elements.find(e => e.id === selectedElement);
    if (!element) {
        return;
    }
    
    
    // Update property fields with current values
    updateBasicProperties(element);
    updateTypeSpecificProperties(element);
    
    // Update JSON live preview
    if (typeof updateJSON === 'function') {
        updateJSON();
    }
    
    // Add property change listeners
    addPropertyListeners();
}

// Hide all property sections
function hideAllPropertySections() {
    const sections = [
        'text-properties',
        'image-properties', 
        'profile-properties',
        'progress-properties'
    ];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'none';
        }
    });
}

// Update properties panel for multi-selection
function updateMultiSelectProperties() {
    // Hide all property sections
    hideAllPropertySections();
    
    // Show only basic properties section with multi-select info
    const basicSection = document.getElementById('basic-properties');
    if (basicSection) {
        basicSection.style.display = 'block';
        
        // Update section header to show selection count
        const header = basicSection.querySelector('.section-header h4');
        if (header) {
            header.textContent = `Position & Size (${selectedElements.length} elements)`;
        }
        
        // Show multi-select info instead of individual properties
        const propertyGrid = basicSection.querySelector('.property-grid');
        if (propertyGrid) {
            propertyGrid.innerHTML = `
                <div class="multi-select-info">
                    <div class="multi-select-count">
                        <span class="count-badge">${selectedElements.length}</span>
                        <span>elements selected</span>
                    </div>
                    <div class="multi-select-actions">
                        <button class="action-btn" onclick="resizeSelectedElements(1.1)" title="Increase size (+10%)">
                            <span>🔍+</span>
                            <span>Grow</span>
                        </button>
                        <button class="action-btn" onclick="resizeSelectedElements(0.9)" title="Decrease size (-10%)">
                            <span>🔍-</span>
                            <span>Shrink</span>
                        </button>
                        <button class="action-btn danger" onclick="deleteSelectedElements()" title="Delete all selected">
                            <span>🗑️</span>
                            <span>Delete All</span>
                        </button>
                    </div>
                    <div class="multi-select-hint">
                        Use <kbd>Ctrl+Click</kbd> to select multiple elements<br>
                        Use <kbd>Ctrl++</kbd> and <kbd>Ctrl+-</kbd> for quick resize
                    </div>
                </div>
            `;
        }
    }
}

// Update basic properties
function updateBasicProperties(element) {
    document.getElementById('prop-x').value = element.x.toFixed(1);
    document.getElementById('prop-y').value = element.y.toFixed(1);
    document.getElementById('prop-opacity').value = element.opacity;
    document.getElementById('prop-layer').value = element.layer;
    
    // Show/hide Variable Mode switch for text, image, and profile elements
    const positionVariableMode = document.getElementById('position-variable-mode');
    if (positionVariableMode) {
        if (element.type === 'text' || element.type === 'image' || element.type === 'discord_profile' || element.type === 'roblox_profile') {
            positionVariableMode.parentElement.parentElement.style.display = 'flex';
            // Update variable fields if they exist
            if (element.xVariable) {
                document.getElementById('prop-x-variable').value = element.xVariable;
            }
            if (element.yVariable) {
                document.getElementById('prop-y-variable').value = element.yVariable;
            }
            if (element.opacityVariable) {
                document.getElementById('prop-opacity-variable').value = element.opacityVariable;
            }
            if (element.layerVariable) {
                document.getElementById('prop-layer-variable').value = element.layerVariable;
            }
            if (element.widthVariable) {
                document.getElementById('prop-width-variable').value = element.widthVariable;
            }
            if (element.heightVariable) {
                document.getElementById('prop-height-variable').value = element.heightVariable;
            }
        } else {
            positionVariableMode.parentElement.parentElement.style.display = 'none';
            // Reset variable mode for non-text/image elements
            positionVariableMode.checked = false;
            document.getElementById('normal-position-fields').style.display = 'grid';
            document.getElementById('variable-position-fields').style.display = 'none';
            const normalSizeFields = document.getElementById('normal-size-fields');
            const variableSizeFields = document.getElementById('variable-size-fields');
            if (normalSizeFields && variableSizeFields) {
                normalSizeFields.style.display = 'grid';
                variableSizeFields.style.display = 'none';
            }
        }
    }
    
    // Hide width/height for text elements (they are auto-sized)
    const widthItem = document.getElementById('width-item');
    const heightItem = document.getElementById('height-item');
    const autoWidthItem = document.getElementById('auto-width-item');
    
    if (element.type === 'text') {
        widthItem.style.display = 'none';
        heightItem.style.display = 'none';
        autoWidthItem.style.display = 'none';
    } else {
        heightItem.style.display = 'flex';
        document.getElementById('prop-height').value = element.height.toFixed(1);
        
        // Show Auto Width switch for profile elements, Width field for others
        if (element.type === 'discord_profile' || element.type === 'roblox_profile') {
            // Update Auto Width checkbox
            const profileAutoWidth = document.getElementById('prop-profile-auto-width');
            if (profileAutoWidth) {
                profileAutoWidth.checked = element.widthAuto || element.width === 'auto';
                element.widthAuto = profileAutoWidth.checked;
            }
            
            // Always hide Width field for profiles, always show Auto Width switch
            widthItem.style.display = 'none';
            autoWidthItem.style.display = 'flex';
        } else {
            // Show Width field for non-profile elements
            widthItem.style.display = 'flex';
            autoWidthItem.style.display = 'none';
            document.getElementById('prop-width').value = element.width.toFixed(1);
        }
    }
}

// Update type-specific properties
function updateTypeSpecificProperties(element) {
    
    // Show/hide type-specific properties
    const textProps = document.getElementById('text-properties');
    const imageProps = document.getElementById('image-properties');
    const profileProps = document.getElementById('profile-properties');
    const progressProps = document.getElementById('progress-properties');
    
    
    if (textProps) {
        textProps.style.display = element.type === 'text' ? 'block' : 'none';
    }
    if (imageProps) imageProps.style.display = element.type === 'image' ? 'block' : 'none';
    if (profileProps) profileProps.style.display = (element.type === 'discord_profile' || element.type === 'roblox_profile') ? 'block' : 'none';
    if (progressProps) progressProps.style.display = element.type === 'progressbar' ? 'block' : 'none';
    
    // Hide position and height fields for profiles
    const positionFields = document.querySelectorAll('#prop-x, #prop-y, #prop-height');
    positionFields.forEach(field => {
        if (field) {
            const row = field.closest('.property-row');
            if (row) {
                if (element.type === 'discord_profile' || element.type === 'roblox_profile') {
                    row.style.display = 'none';
                } else {
                    row.style.display = 'flex';
                }
            }
        }
    });
    
    // Handle width input for profiles
    const widthInput = document.getElementById('prop-width');
    
    if (element.type === 'discord_profile' || element.type === 'roblox_profile') {
        if (widthInput) widthInput.style.display = 'none';
    } else {
        if (widthInput) widthInput.style.display = 'block';
    }
    
    // Update type-specific fields
    switch (element.type) {
        case 'text':
            updateTextProperties(element);
            break;
        case 'image':
            updateImageProperties(element);
            break;
        case 'discord_profile':
            updateDiscordProfileProperties(element);
            break;
        case 'roblox_profile':
            updateRobloxProfileProperties(element);
            break;
        case 'progressbar':
            updateProgressBarProperties(element);
            break;
    }
}

// Update text properties
function updateTextProperties(element) {
    const propText = document.getElementById('prop-text');
    const propFontSize = document.getElementById('prop-font-size');
    const propFontFamily = document.getElementById('prop-font-family');
    const propTextColor = document.getElementById('prop-text-color');
    const propTextColorHex = document.getElementById('prop-text-color-hex');
    
    if (propText) propText.value = element.text;
    if (propFontSize) propFontSize.value = element.fontSize;
    if (propFontFamily) propFontFamily.value = element.fontFamily;
    if (propTextColor) propTextColor.value = element.textColor;
    if (propTextColorHex) propTextColorHex.value = element.textColor;
    
    // Update variable fields if they exist
    if (element.fontSizeVariable) {
        document.getElementById('prop-font-size-variable').value = element.fontSizeVariable;
    }
    if (element.textColorVariable) {
        document.getElementById('prop-text-color-variable').value = element.textColorVariable;
    }
    if (element.fontFamilyVariable) {
        document.getElementById('prop-font-family-variable').value = element.fontFamilyVariable;
    }
}

// Update image properties
function updateImageProperties(element) {
    const propImageUrl = document.getElementById('prop-image-url');
    const propImageRadius = document.getElementById('prop-image-radius');
    const propImageRadiusInput = document.getElementById('prop-image-radius-input');
    if (propImageUrl) propImageUrl.value = element.imageUrl || '';
    if (propImageRadius) propImageRadius.value = element.borderRadius || 1;
    if (propImageRadiusInput) propImageRadiusInput.value = element.borderRadius || 1;
    
    // Update variable fields if they exist
    if (element.imageUrlVariable) {
        document.getElementById('prop-image-url-variable').value = element.imageUrlVariable;
    }
    if (element.borderRadiusVariable) {
        document.getElementById('prop-image-radius-variable').value = element.borderRadiusVariable;
    }
}

// Update Discord profile properties
function updateDiscordProfileProperties(element) {
    const propName = document.getElementById('prop-name');
    const propNameLabel = document.getElementById('prop-name-label');
    const propSubtitle = document.getElementById('prop-subtitle');
    const propSubtitleSlider = document.getElementById('prop-subtitle-slider');
    
    if (propNameLabel) propNameLabel.textContent = 'Discord ID';
    if (propName) {
        propName.value = element.userId || '';
        propName.placeholder = '1011787830567120898';
    }
    if (propSubtitle) propSubtitle.value = element.borderRadius || 1;
    if (propSubtitleSlider) propSubtitleSlider.value = element.borderRadius || 1;
    
    // Update variable fields if they exist
    if (element.userIdVariable) {
        document.getElementById('prop-name-variable').value = element.userIdVariable;
    }
    if (element.borderRadiusVariable) {
        document.getElementById('prop-subtitle-variable').value = element.borderRadiusVariable;
    }
    
    const profileAutoWidth = document.getElementById('prop-profile-auto-width');
    if (profileAutoWidth) {
        profileAutoWidth.checked = element.widthAuto || element.width === 'auto';
        element.widthAuto = profileAutoWidth.checked;
    }
}

// Update Roblox profile properties
function updateRobloxProfileProperties(element) {
    const propName = document.getElementById('prop-name');
    const propNameLabel = document.getElementById('prop-name-label');
    const propSubtitle = document.getElementById('prop-subtitle');
    const propSubtitleSlider = document.getElementById('prop-subtitle-slider');
    
    if (propNameLabel) propNameLabel.textContent = 'Username';
    if (propName) {
        propName.value = element.name || '';
        propName.placeholder = 'redxxxkiller';
    }
    if (propSubtitle) propSubtitle.value = element.borderRadius || 1;
    if (propSubtitleSlider) propSubtitleSlider.value = element.borderRadius || 1;
    
    const profileAutoWidth = document.getElementById('prop-profile-auto-width');
    if (profileAutoWidth) {
        profileAutoWidth.checked = element.widthAuto || element.width === 'auto';
        element.widthAuto = profileAutoWidth.checked;
    }
}

// Update progress bar properties
function updateProgressBarProperties(element) {
    const propProgressValue = document.getElementById('prop-progress-value');
    const propProgressMax = document.getElementById('prop-progress-max');
    const propProgressColor = document.getElementById('prop-progress-color');
    const propProgressBgColor = document.getElementById('prop-progress-bg-color');
    const propProgressBorderRadius = document.getElementById('prop-progress-border-radius');
    const propProgressBorderRadiusInput = document.getElementById('prop-progress-border-radius-input');
    
    if (propProgressValue) propProgressValue.value = element.progressValue;
    if (propProgressMax) propProgressMax.value = element.progressMax;
    if (propProgressColor) propProgressColor.value = element.progressColor;
    if (propProgressBgColor) propProgressBgColor.value = element.progressBgColor;
    if (propProgressBorderRadius) propProgressBorderRadius.value = element.progressBorderRadius;
    if (propProgressBorderRadiusInput) propProgressBorderRadiusInput.value = element.progressBorderRadius;
    
    // Update hex fields
    if (element.progressColor) {
        document.getElementById('prop-progress-color-hex').value = element.progressColor;
    }
    if (element.progressBgColor) {
        document.getElementById('prop-progress-bg-color-hex').value = element.progressBgColor;
    }
    
    // Update variable fields if they exist
    if (element.progressValueVariable) {
        document.getElementById('prop-progress-value-variable').value = element.progressValueVariable;
    }
    if (element.progressMaxVariable) {
        document.getElementById('prop-progress-max-variable').value = element.progressMaxVariable;
    }
    if (element.progressColorVariable) {
        document.getElementById('prop-progress-color-variable').value = element.progressColorVariable;
    }
    if (element.progressBgColorVariable) {
        document.getElementById('prop-progress-bg-color-variable').value = element.progressBgColorVariable;
    }
    if (element.progressBorderRadiusVariable) {
        document.getElementById('prop-progress-border-radius-variable').value = element.progressBorderRadiusVariable;
    }
}


// Add property change listeners with modern UX
function addPropertyListeners() {
    const element = elements.find(e => e.id === selectedElement);
    if (!element) return;
    
    // Basic properties
    setupBasicPropertyListeners(element);
    
    // Type-specific properties
    switch (element.type) {
        case 'text':
            setupTextPropertyListeners(element);
            break;
        case 'image':
            setupImagePropertyListeners(element);
            break;
        case 'discord_profile':
            setupDiscordProfilePropertyListeners(element);
            break;
        case 'roblox_profile':
            setupRobloxProfilePropertyListeners(element);
            break;
        case 'progressbar':
            setupProgressBarPropertyListeners(element);
            break;
    }
}

// Setup basic property listeners
function setupBasicPropertyListeners(element) {
    document.getElementById('prop-x').oninput = () => {
        const value = Math.max(parseFloat(document.getElementById('prop-x').value) || 1, 1);
        element.x = value;
        document.getElementById('prop-x').value = value.toFixed(1);
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-y').oninput = () => {
        const value = Math.max(parseFloat(document.getElementById('prop-y').value) || 1, 1);
        element.y = value;
        document.getElementById('prop-y').value = value.toFixed(1);
        updateCanvas();
        updateJSON();
    };
    
    // Width/height listeners (not for text elements)
    if (element.type !== 'text') {
        document.getElementById('prop-width').oninput = () => {
            element.width = parseFloat(document.getElementById('prop-width').value);
            updateCanvas();
            updateJSON();
        };
        
        document.getElementById('prop-height').oninput = () => {
            element.height = parseFloat(document.getElementById('prop-height').value);
            updateCanvas();
            updateJSON();
        };
    }
    
    document.getElementById('prop-opacity').oninput = () => {
        element.opacity = parseInt(document.getElementById('prop-opacity').value);
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-layer').oninput = () => {
        element.layer = parseInt(document.getElementById('prop-layer').value);
        updateCanvas();
        updateJSON();
    };
    
    // Auto Width checkbox listener (only for profile elements)
    const profileAutoWidth = document.getElementById('prop-profile-auto-width');
    if (profileAutoWidth && (element.type === 'discord_profile' || element.type === 'roblox_profile')) {
        profileAutoWidth.onchange = () => {
            element.widthAuto = profileAutoWidth.checked;
            updateCanvas();
            updateJSON();
        };
    }
    
    // Variable Mode toggle for Position (for text, image, and profile elements)
    if (element.type === 'text' || element.type === 'image' || element.type === 'discord_profile' || element.type === 'roblox_profile') {
        const positionVariableMode = document.getElementById('position-variable-mode');
        if (positionVariableMode) {
            positionVariableMode.onchange = () => {
                const isVariableMode = positionVariableMode.checked;
                const normalPositionFields = document.getElementById('normal-position-fields');
                const variablePositionFields = document.getElementById('variable-position-fields');
                const normalSizeFields = document.getElementById('normal-size-fields');
                const variableSizeFields = document.getElementById('variable-size-fields');
                
                if (isVariableMode) {
                    normalPositionFields.style.display = 'none';
                    variablePositionFields.style.display = 'grid';
                    if (normalSizeFields && variableSizeFields) {
                        normalSizeFields.style.display = 'none';
                        variableSizeFields.style.display = 'grid';
                    }
                } else {
                    normalPositionFields.style.display = 'grid';
                    variablePositionFields.style.display = 'none';
                    if (normalSizeFields && variableSizeFields) {
                        normalSizeFields.style.display = 'grid';
                        variableSizeFields.style.display = 'none';
                    }
                }
                
                updateJSON();
            };
        }
        
        // Variable input listeners
        document.getElementById('prop-x-variable').oninput = () => {
            element.xVariable = document.getElementById('prop-x-variable').value;
            updateJSON();
        };
        
        document.getElementById('prop-y-variable').oninput = () => {
            element.yVariable = document.getElementById('prop-y-variable').value;
            updateJSON();
        };
        
        document.getElementById('prop-opacity-variable').oninput = () => {
            element.opacityVariable = document.getElementById('prop-opacity-variable').value;
            updateJSON();
        };
        
        document.getElementById('prop-layer-variable').oninput = () => {
            element.layerVariable = document.getElementById('prop-layer-variable').value;
            updateJSON();
        };
        
        document.getElementById('prop-width-variable').oninput = () => {
            element.widthVariable = document.getElementById('prop-width-variable').value;
            updateJSON();
        };
        
        document.getElementById('prop-height-variable').oninput = () => {
            element.heightVariable = document.getElementById('prop-height-variable').value;
            updateJSON();
        };
    }
}

// Normalize hex color (convert short #09f to full #0099ff)
function normalizeHexColor(hex) {
    // Remove any whitespace
    hex = hex.trim();
    
    // If no #, add it
    if (!hex.startsWith('#')) {
        hex = '#' + hex;
    }
    
    // Match 3-digit hex (#09f) or 6-digit hex (#0099ff)
    const shortHexMatch = hex.match(/^#([0-9A-Fa-f]{3})$/);
    const fullHexMatch = hex.match(/^#([0-9A-Fa-f]{6})$/);
    
    if (shortHexMatch) {
        // Convert 3-digit to 6-digit: #09f -> #0099ff
        const r = shortHexMatch[1][0];
        const g = shortHexMatch[1][1];
        const b = shortHexMatch[1][2];
        return `#${r}${r}${g}${g}${b}${b}`;
    } else if (fullHexMatch) {
        // Already valid 6-digit hex
        return hex;
    }
    
    // Invalid hex, return as-is
    return hex;
}

// Setup text property listeners
function setupTextPropertyListeners(element) {
    document.getElementById('prop-text').oninput = () => {
        element.text = document.getElementById('prop-text').value;
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-font-size').oninput = () => {
        element.fontSize = parseInt(document.getElementById('prop-font-size').value);
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-font-family').oninput = () => {
        const fontFamily = document.getElementById('prop-font-family').value;
        element.fontFamily = fontFamily;
        
        // Load font dynamically if it's not already loaded
        loadFontDynamically(fontFamily);
        
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-text-color').oninput = () => {
        const colorValue = document.getElementById('prop-text-color').value;
        const normalizedColor = normalizeHexColor(colorValue);
        element.textColor = normalizedColor;
        // Update hex input to match color picker
        document.getElementById('prop-text-color-hex').value = normalizedColor;
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-text-color-hex').oninput = () => {
        const hexValue = document.getElementById('prop-text-color-hex').value;
        const normalizedColor = normalizeHexColor(hexValue);
        element.textColor = normalizedColor;
        
        // Update color picker if it's a valid hex color (3 or 6 digits)
        if (/^#[0-9A-Fa-f]{6}$/.test(normalizedColor)) {
            document.getElementById('prop-text-color').value = normalizedColor;
        }
        updateCanvas();
        updateJSON();
    };
    
    // Text Variable Mode toggle
    const textVariableMode = document.getElementById('text-variable-mode');
    if (textVariableMode) {
        textVariableMode.onchange = () => {
            const isVariableMode = textVariableMode.checked;
            const normalFields = document.getElementById('normal-text-fields');
            const variableFields = document.getElementById('variable-text-fields');
            
            if (isVariableMode) {
                normalFields.style.display = 'none';
                variableFields.style.display = 'grid';
            } else {
                normalFields.style.display = 'grid';
                variableFields.style.display = 'none';
            }
            
            updateJSON();
        };
    }
    
    // Variable input listeners
    document.getElementById('prop-font-size-variable').oninput = () => {
        element.fontSizeVariable = document.getElementById('prop-font-size-variable').value;
        updateJSON();
    };
    
    document.getElementById('prop-text-color-variable').oninput = () => {
        element.textColorVariable = document.getElementById('prop-text-color-variable').value;
        updateJSON();
    };
    
    document.getElementById('prop-font-family-variable').oninput = () => {
        element.fontFamilyVariable = document.getElementById('prop-font-family-variable').value;
        updateJSON();
    };
    
    // Update font count
    updateFontCount();
    
}

// Setup image property listeners
function setupImagePropertyListeners(element) {
    document.getElementById('prop-image-url').oninput = () => {
        element.imageUrl = document.getElementById('prop-image-url').value;
        updateCanvas();
        updateJSON();
    };
    
    // Image border radius - slider and input sync
    const imageRadiusSlider = document.getElementById('prop-image-radius');
    const imageRadiusInput = document.getElementById('prop-image-radius-input');
    
    if (imageRadiusSlider && imageRadiusInput) {
        imageRadiusSlider.oninput = () => {
            const value = parseInt(imageRadiusSlider.value);
            imageRadiusInput.value = value;
            element.borderRadius = value;
            updateCanvas();
            updateJSON();
        };
        
        imageRadiusInput.oninput = () => {
            const value = parseInt(imageRadiusInput.value);
            imageRadiusSlider.value = value;
            element.borderRadius = value;
            updateCanvas();
            updateJSON();
        };
    }
    
    // Image Variable Mode toggle
    const imageVariableMode = document.getElementById('image-variable-mode');
    if (imageVariableMode) {
        imageVariableMode.onchange = () => {
            const isVariableMode = imageVariableMode.checked;
            const normalFields = document.getElementById('normal-image-fields');
            const variableFields = document.getElementById('variable-image-fields');
            
            if (isVariableMode) {
                normalFields.style.display = 'none';
                variableFields.style.display = 'block';
            } else {
                normalFields.style.display = 'block';
                variableFields.style.display = 'none';
            }
            
            updateJSON();
        };
    }
    
    // Variable input listeners
    document.getElementById('prop-image-url-variable').oninput = () => {
        element.imageUrlVariable = document.getElementById('prop-image-url-variable').value;
        updateJSON();
    };
    
    document.getElementById('prop-image-radius-variable').oninput = () => {
        element.borderRadiusVariable = document.getElementById('prop-image-radius-variable').value;
        updateJSON();
    };
}

// Setup Discord profile property listeners
function setupDiscordProfilePropertyListeners(element) {
    document.getElementById('prop-name').oninput = () => {
        const userId = document.getElementById('prop-name').value;
        element.userId = userId;
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-subtitle').oninput = () => {
        const value = Math.min(Math.max(parseInt(document.getElementById('prop-subtitle').value) || 1, 1), 100);
        element.borderRadius = value;
        document.getElementById('prop-subtitle-slider').value = value;
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-subtitle-slider').oninput = () => {
        const value = parseInt(document.getElementById('prop-subtitle-slider').value);
        element.borderRadius = value;
        document.getElementById('prop-subtitle').value = value;
        updateCanvas();
        updateJSON();
    };
    
    // Profile Variable Mode toggle
    const profileVariableMode = document.getElementById('profile-variable-mode');
    if (profileVariableMode) {
        profileVariableMode.onchange = () => {
            const isVariableMode = profileVariableMode.checked;
            const normalFields = document.getElementById('normal-profile-fields');
            const variableFields = document.getElementById('variable-profile-fields');
            
            if (isVariableMode) {
                normalFields.style.display = 'none';
                variableFields.style.display = 'block';
            } else {
                normalFields.style.display = 'block';
                variableFields.style.display = 'none';
            }
            
            updateJSON();
        };
    }
    
    // Variable input listeners
    document.getElementById('prop-name-variable').oninput = () => {
        element.userIdVariable = document.getElementById('prop-name-variable').value;
        updateJSON();
    };
    
    document.getElementById('prop-subtitle-variable').oninput = () => {
        element.borderRadiusVariable = document.getElementById('prop-subtitle-variable').value;
        updateJSON();
    };
}

// Setup Roblox profile property listeners
function setupRobloxProfilePropertyListeners(element) {
    document.getElementById('prop-name').oninput = () => {
        const username = document.getElementById('prop-name').value;
        element.name = username;
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-subtitle').oninput = () => {
        const value = Math.min(Math.max(parseInt(document.getElementById('prop-subtitle').value) || 1, 1), 100);
        element.borderRadius = value;
        document.getElementById('prop-subtitle-slider').value = value;
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-subtitle-slider').oninput = () => {
        const value = parseInt(document.getElementById('prop-subtitle-slider').value);
        element.borderRadius = value;
        document.getElementById('prop-subtitle').value = value;
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-profile-auto-width').onchange = () => {
        const isAuto = document.getElementById('prop-profile-auto-width').checked;
        element.widthAuto = isAuto;
        if (isAuto) {
            element.width = 'auto';
        } else {
            element.width = element.height;
        }
        updateCanvas();
        updateJSON();
    };
}

// Setup progress bar property listeners
function setupProgressBarPropertyListeners(element) {
    document.getElementById('prop-progress-value').oninput = () => {
        element.progressValue = parseInt(document.getElementById('prop-progress-value').value);
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-progress-max').oninput = () => {
        element.progressMax = parseInt(document.getElementById('prop-progress-max').value);
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-progress-color').oninput = () => {
        const colorValue = document.getElementById('prop-progress-color').value;
        const normalizedColor = normalizeHexColor(colorValue);
        element.progressColor = normalizedColor;
        document.getElementById('prop-progress-color-hex').value = normalizedColor;
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-progress-color-hex').oninput = () => {
        const hexValue = document.getElementById('prop-progress-color-hex').value;
        const normalizedColor = normalizeHexColor(hexValue);
        element.progressColor = normalizedColor;
        // Update color picker if it's a valid hex color (3 or 6 digits)
        if (/^#[0-9A-Fa-f]{6}$/.test(normalizedColor)) {
            document.getElementById('prop-progress-color').value = normalizedColor;
        }
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-progress-bg-color').oninput = () => {
        const colorValue = document.getElementById('prop-progress-bg-color').value;
        const normalizedColor = normalizeHexColor(colorValue);
        element.progressBgColor = normalizedColor;
        document.getElementById('prop-progress-bg-color-hex').value = normalizedColor;
        updateCanvas();
        updateJSON();
    };
    
    document.getElementById('prop-progress-bg-color-hex').oninput = () => {
        const hexValue = document.getElementById('prop-progress-bg-color-hex').value;
        const normalizedColor = normalizeHexColor(hexValue);
        element.progressBgColor = normalizedColor;
        // Update color picker if it's a valid hex color (3 or 6 digits)
        if (/^#[0-9A-Fa-f]{6}$/.test(normalizedColor)) {
            document.getElementById('prop-progress-bg-color').value = normalizedColor;
        }
        updateCanvas();
        updateJSON();
    };
    
    // Progress border radius - slider and input sync
    const progressBorderRadiusSlider = document.getElementById('prop-progress-border-radius');
    const progressBorderRadiusInput = document.getElementById('prop-progress-border-radius-input');
    
    if (progressBorderRadiusSlider && progressBorderRadiusInput) {
        progressBorderRadiusSlider.oninput = () => {
            const value = parseInt(progressBorderRadiusSlider.value);
            progressBorderRadiusInput.value = value;
            element.progressBorderRadius = value;
            updateCanvas();
            updateJSON();
        };
        
        progressBorderRadiusInput.oninput = () => {
            const value = parseInt(progressBorderRadiusInput.value);
            progressBorderRadiusSlider.value = value;
            element.progressBorderRadius = value;
            updateCanvas();
            updateJSON();
        };
    }
    
    // Progress Variable Mode toggle
    const progressVariableMode = document.getElementById('progress-variable-mode');
    if (progressVariableMode) {
        progressVariableMode.onchange = () => {
            const isVariableMode = progressVariableMode.checked;
            const normalFields = document.getElementById('normal-progress-fields');
            const variableFields = document.getElementById('variable-progress-fields');
            
            if (isVariableMode) {
                normalFields.style.display = 'none';
                variableFields.style.display = 'block';
            } else {
                normalFields.style.display = 'block';
                variableFields.style.display = 'none';
            }
            
            updateJSON();
        };
    }
    
    // Variable input listeners
    document.getElementById('prop-progress-value-variable').oninput = () => {
        element.progressValueVariable = document.getElementById('prop-progress-value-variable').value;
        updateJSON();
    };
    
    document.getElementById('prop-progress-max-variable').oninput = () => {
        element.progressMaxVariable = document.getElementById('prop-progress-max-variable').value;
        updateJSON();
    };
    
    document.getElementById('prop-progress-color-variable').oninput = () => {
        element.progressColorVariable = document.getElementById('prop-progress-color-variable').value;
        updateJSON();
    };
    
    document.getElementById('prop-progress-bg-color-variable').oninput = () => {
        element.progressBgColorVariable = document.getElementById('prop-progress-bg-color-variable').value;
        updateJSON();
    };
    
    document.getElementById('prop-progress-border-radius-variable').oninput = () => {
        element.progressBorderRadiusVariable = document.getElementById('prop-progress-border-radius-variable').value;
        updateJSON();
    };
}


// Update layers panel with modern design
function updateLayersPanel() {
    const layersList = document.getElementById('layers-list');
    
    // Always show Card element first
    const cardHtml = `
        <div class="layer-item card-layer ${selectedElement === 'card' ? 'selected' : ''}" data-id="card">
            <div class="layer-icon">🖼️</div>
            <div class="layer-info">
                <div class="layer-name">Card</div>
                <div class="layer-details">Canvas Properties</div>
            </div>
            <div class="layer-controls">
                <button class="layer-btn" onclick="selectElement('card')" title="Select Card">✓</button>
            </div>
        </div>
    `;
    
    // Add elements if any exist
    let elementsHtml = '';
    if (elements.length > 0) {
        const sortedElements = [...elements].sort((a, b) => b.layer - a.layer);
        elementsHtml = sortedElements.map(element => {
            const icon = getElementIcon(element.type);
            const name = getElementDisplayName(element);
            const details = getElementDetails(element);
            const isSelected = selectedElement === element.id;
            
            return `
                <div class="layer-item ${isSelected ? 'selected' : ''}" data-id="${element.id}">
                    <div class="layer-icon">${icon}</div>
                    <div class="layer-info">
                        <div class="layer-name">${name}</div>
                        <div class="layer-details">${details}</div>
                    </div>
                    <div class="layer-controls">
                        <button class="layer-btn" onclick="moveLayerUp(${element.id})" title="Move Up">↑</button>
                        <button class="layer-btn" onclick="moveLayerDown(${element.id})" title="Move Down">↓</button>
                        <button class="layer-btn delete" onclick="deleteElementFromLayer(${element.id})" title="Delete">×</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    layersList.innerHTML = cardHtml + elementsHtml;
    
    // Add click listeners to layer items
    layersList.querySelectorAll('.layer-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('layer-btn')) {
                const id = parseInt(item.dataset.id);
                selectElement(id);
            }
        });
    });
}

// Get element icon
function getElementIcon(type) {
    const icons = {
        text: 'T',
        image: '🖼',
        discord_profile: '💬',
        roblox_profile: '🎮',
        progressbar: '📊',
    };
    return icons[type] || '?';
}

// Get element display name
function getElementDisplayName(element) {
    if (element.type === 'text') {
        return element.text || 'Text';
    } else if (element.type === 'image') {
        return 'Image';
    } else if (element.type === 'discord_profile') {
        return element.userId ? `Discord (${element.userId})` : 'Discord Profile';
    } else if (element.type === 'roblox_profile') {
        return element.name ? 'Roblox User' : 'Roblox Profile';
    } else if (element.type === 'progressbar') {
        return `Progress (${element.progressValue}/${element.progressMax})`;
    } else if (element.type === 'shape') {
        return 'Shape';
    }
    return element.type;
}

// Get element details
function getElementDetails(element) {
    let details = '';
    
    if (element.type === 'text') {
        details = `${element.fontSize}px ${element.fontFamily}`;
    } else if (element.type === 'image') {
        details = `${Math.round(element.width)}×${Math.round(element.height)}`;
    } else if (element.type === 'discord_profile') {
        details = `Radius: ${element.borderRadius || 100}`;
    } else if (element.type === 'roblox_profile') {
        details = element.subtitle || 'Profile';
    } else if (element.type === 'progressbar') {
        details = `${Math.round(element.width)}×${Math.round(element.height)}`;
    } else if (element.type === 'shape') {
        details = `${Math.round(element.width)}×${Math.round(element.height)}`;
    } else {
        details = 'Element';
    }
    
    return `Layer: ${element.layer || 1} | ${details}`;
}

// Make getElementDetails globally available
window.getElementDetails = getElementDetails;

// Move layer up
function moveLayerUp(id) {
    const element = elements.find(e => e.id === id);
    if (element) {
        element.layer = Math.max(...elements.map(e => e.layer), 0) + 1;
        updateCanvas();
        updateJSON();
        showToast('Layer moved up! ⬆️', 'success');
    }
}

// Move layer down
function moveLayerDown(id) {
    const element = elements.find(e => e.id === id);
    if (element) {
        element.layer = Math.max(1, element.layer - 1);
        updateCanvas();
        updateJSON();
        showToast('Layer moved down! ⬇️', 'success');
    }
}

// Delete element from layer
function deleteElementFromLayer(id) {
    const element = elements.find(e => e.id === id);
    if (element && confirm(`Are you sure you want to delete this ${getElementDisplayName(element)}?`)) {
        elements = elements.filter(e => e.id !== id);
        if (selectedElement === id) {
            selectedElement = 'card';
            updateElementProperties();
        }
        updateCanvas();
        updateQuotas();
        updateJSON();
        updateCanvasStatus();
        showToast('Element deleted! 🗑️', 'success');
    }
}

// Global variable to store fonts
let allFonts = [];

// Load Google Fonts dynamically
window.loadGoogleFonts = async function loadGoogleFonts() {
    console.log('Loading Google Fonts...');
    
    try {
        // Use Google Fonts Developer API with real API key
        const response = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyA6LHzi_fNOdhWedqV-amqLBJqZEfaAkV8&sort=popularity');
        const data = await response.json();
        
        const fontCount = document.getElementById('font-count');
        
        if (data.items) {
            // Store fonts globally
            allFonts = data.items;
            
            // Update count
            if (fontCount) {
                fontCount.textContent = data.items.length;
            }
            
            console.log(`✅ Loaded ${data.items.length} Google Fonts`);
            
            // Initialize autocomplete
            initializeFontAutocomplete();
        }
    } catch (error) {
        console.error('Failed to load Google Fonts:', error);
        console.log('Using fallback fonts');
        loadFallbackFonts();
    }
}

// Fallback fonts if API fails
function loadFallbackFonts() {
    const fallbackFonts = [
        'Inter', 'Roboto', 'Open Sans', 'DM Sans', 'JetBrains Mono', 
        'Poppins', 'Nunito', 'Source Sans Pro', 'Lato', 'Montserrat', 
        'Raleway', 'Ubuntu', 'Playfair Display', 'Merriweather', 'Oswald', 
        'Lora', 'Oleo Script', 'Pacifico', 'Dancing Script', 'Caveat', 
        'Comfortaa', 'Fredoka', 'Quicksand', 'Rubik', 'Work Sans',
        'Irish Grover', 'Comic Sans MS', 'Times New Roman', 'Arial', 'Helvetica',
        'Georgia', 'Verdana', 'Trebuchet MS', 'Impact', 'Arial Black',
        'Courier New', 'Palatino', 'Garamond', 'Bookman', 'Avant Garde',
        'Futura', 'Century Gothic', 'Lucida Console', 'Monaco', 'Consolas',
        'Tahoma', 'Geneva', 'Baskerville', 'Didot', 'Bodoni MT',
        'Brush Script MT', 'Chalkduster', 'Copperplate', 'Papyrus', 'Bradley Hand',
        'Chalkboard', 'Marker Felt', 'Trattatello', 'Zapfino', 'American Typewriter',
        'Andale Mono', 'Apple Chancery', 'Apple Color Emoji', 'Apple SD Gothic Neo',
        'Arial Hebrew', 'Arial Unicode MS', 'Bangla Sangam MN', 'Baskerville',
        'Big Caslon', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps',
        'Bradley Hand', 'Brush Script MT', 'Chalkboard', 'Chalkboard SE',
        'Chalkduster', 'Charter', 'Cochin', 'Comic Sans MS', 'Copperplate',
        'Courier', 'Courier New', 'Didot', 'DIN Alternate', 'DIN Condensed',
        'Futura', 'Geneva', 'Georgia', 'Gill Sans', 'Gill Sans MT',
        'Gill Sans MT Condensed', 'Gill Sans MT Ext Condensed Bold',
        'Gill Sans Ultra Bold', 'Gill Sans Ultra Bold Condensed',
        'Gill Sans Ultra Light', 'Gloucester MT Extra Condensed',
        'Goudy Bookletter 1911', 'Goudy Old Style', 'Goudy Stout',
        'GoudyHandtooled BT', 'GoudyOLSt BT', 'Granada', 'Graphite',
        'Gujarati MT', 'Gujarati Sangam MN', 'Gurmukhi MN', 'Hannotate SC',
        'Hannotate TC', 'HanziPen SC', 'HanziPen TC', 'HeadlineA',
        'Heiti SC', 'Heiti TC', 'Helvetica', 'Helvetica CY', 'Helvetica Neue',
        'Helvetica Neue Condensed Black', 'Helvetica Neue Condensed Bold',
        'Helvetica Neue Light', 'Helvetica Neue Medium', 'Helvetica Neue Thin',
        'Helvetica Neue UltraLight', 'Helvetica Neue UltraLight Condensed',
        'Herculanum', 'Hiragino Kaku Gothic Pro', 'Hiragino Kaku Gothic ProN',
        'Hiragino Kaku Gothic Std', 'Hiragino Kaku Gothic StdN',
        'Hiragino Maru Gothic Pro', 'Hiragino Maru Gothic ProN',
        'Hiragino Mincho Pro', 'Hiragino Mincho ProN', 'Hiragino Sans',
        'Hiragino Sans GB', 'Hoefler Text', 'Hoefler Text Ornaments',
        'Impact', 'InaiMathi', 'ITC Avant Garde Gothic', 'ITC Bookman',
        'ITC Chancery', 'ITC Cheltenham', 'ITC Garamond', 'ITC Stone Sans',
        'ITC Stone Serif', 'Jazz LET', 'Jazz LET Plain', 'Kailasa',
        'Kannada MN', 'Kannada Sangam MN', 'Kefa', 'Khmer MN', 'Khmer Sangam MN',
        'Kohinoor Bangla', 'Kohinoor Devanagari', 'Kohinoor Gujarati',
        'Kohinoor Telugu', 'Kokonor', 'KufiStandardGK', 'Lao MN', 'Lao Sangam MN',
        'LastResort', 'Latha', 'Leelawadee', 'Ling Wai SC', 'Ling Wai TC',
        'Lucida Grande', 'Lucida Sans', 'Lucida Sans Typewriter',
        'Lucida Sans Unicode', 'Malayalam MN', 'Malayalam Sangam MN',
        'Marker Felt', 'Menlo', 'Microsoft Sans Serif', 'MingLiU',
        'MingLiU-ExtB', 'MingLiU_HKSCS', 'MingLiU_HKSCS-ExtB',
        'Minion Pro', 'Mistral', 'Modern No. 20', 'Monaco', 'Monaco CY',
        'Mshtakan', 'Mukta Mahee', 'Muna', 'Myanmar MN', 'Myanmar Sangam MN',
        'Nadeem', 'Nanum Brush Script', 'Nanum Gothic', 'Nanum Myeongjo',
        'Nanum Pen Script', 'New Peninim MT', 'News Gothic MT',
        'Noteworthy', 'Noteworthy Light', 'Noto Nastaliq Urdu',
        'Noto Sans', 'Noto Sans CJK HK', 'Noto Sans CJK JP',
        'Noto Sans CJK KR', 'Noto Sans CJK SC', 'Noto Sans CJK TC',
        'Noto Sans Devanagari', 'Noto Sans Gujarati', 'Noto Sans Gurmukhi',
        'Noto Sans Kannada', 'Noto Sans Malayalam', 'Noto Sans Oriya',
        'Noto Sans Tamil', 'Noto Sans Telugu', 'Noto Serif',
        'Noto Serif CJK HK', 'Noto Serif CJK JP', 'Noto Serif CJK KR',
        'Noto Serif CJK SC', 'Noto Serif CJK TC', 'Optima',
        'Oriya MN', 'Oriya Sangam MN', 'Osaka', 'Palatino',
        'Palatino CY', 'Papyrus', 'PCMyungjo', 'Perpetua',
        'PingFang HK', 'PingFang SC', 'PingFang TC', 'Plantagenet Cherokee',
        'PT Mono', 'PT Sans', 'PT Sans Caption', 'PT Sans Narrow',
        'PT Serif', 'PT Serif Caption', 'Raanana', 'Rockwell',
        'Sana', 'Sangam MN', 'Savoye LET', 'Savoye LET Plain',
        'Seravek', 'Shree Devanagari 714', 'SignPainter',
        'SignPainter-HouseScript', 'Silom', 'Sinhala MN',
        'Sinhala Sangam MN', 'Skia', 'Snell Roundhand',
        'Snell Roundhand Black', 'Songti SC', 'Songti TC',
        'STFangsong', 'STHeiti', 'STKaiti', 'STSong',
        'Stylus', 'Sukhumvit Set', 'Superclarendon',
        'Sylfaen', 'Tahoma', 'Tamil MN', 'Tamil Sangam MN',
        'Telugu MN', 'Telugu Sangam MN', 'Thonburi',
        'Times', 'Times CY', 'Times New Roman', 'Times New Roman CY',
        'Trattatello', 'Trebuchet MS', 'Tsukushi A Round Gothic',
        'Tsukushi B Round Gothic', 'Verdana', 'Verdana Pro',
        'Waseem', 'Webdings', 'Wide Latin', 'Wingdings',
        'Wingdings 2', 'Wingdings 3', 'Xingkai SC', 'Yuanti SC',
        'Yuppy SC', 'Zapf Dingbats', 'Zapfino'
    ];
    
    // Convert to Google Fonts API format
    allFonts = fallbackFonts.map(font => ({
        family: font,
        category: font.includes('Script') || font.includes('Brush') || font.includes('Chalk') ? 'handwriting' : 
                 font.includes('Mono') || font.includes('Courier') || font.includes('Console') ? 'monospace' :
                 font.includes('Times') || font.includes('Georgia') || font.includes('Garamond') ? 'serif' : 'sans-serif',
        variants: ['400', '700']
    }));
    
    const fontCount = document.getElementById('font-count');
    
    console.log('Updating font count:', fontCount, 'Fallback fonts length:', fallbackFonts.length);
    if (fontCount) {
        fontCount.textContent = fallbackFonts.length;
        console.log('Font count updated to:', fontCount.textContent);
    } else {
        console.error('Font count element not found');
    }
    
    // Initialize autocomplete with fallback fonts
    initializeFontAutocomplete();
}

// Load font dynamically
function loadFontDynamically(fontFamily) {
    if (!fontFamily || fontFamily.trim() === '') return;
    
    // Check if font is already loaded
    const fontName = fontFamily.replace(/\s+/g, '+');
    const existingLink = document.querySelector(`link[href*="${fontName}"]`);
    
    if (!existingLink) {
        // Create new link element for the font
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;500;600;700&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        
        console.log(`Loaded font dynamically: ${fontFamily}`);
    }
}

// Initialize font autocomplete
function initializeFontAutocomplete() {
    const fontInput = document.getElementById('prop-font-family');
    const fontDropdown = document.getElementById('font-dropdown');
    const fontSearch = document.getElementById('font-search');
    const fontList = document.getElementById('font-list');
    
    
    // Test if dropdown is visible
    if (fontDropdown) {
    }
    
    if (!fontInput || !fontDropdown || !fontSearch || !fontList) {
        console.error('Missing elements for font autocomplete');
        return;
    }
    
    let selectedIndex = -1;
    
    // Show dropdown on focus
    fontInput.addEventListener('focus', () => {
        showFontDropdown();
    });
    
    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!fontInput.contains(e.target) && !fontDropdown.contains(e.target)) {
            hideFontDropdown();
        }
    });
    
    // Search functionality
    fontSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterFonts(query);
    });
    
    // Keyboard navigation
    fontInput.addEventListener('keydown', (e) => {
        const items = fontList.querySelectorAll('.font-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelection(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelection(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && items[selectedIndex]) {
                selectFont(items[selectedIndex].dataset.fontFamily);
            }
        } else if (e.key === 'Escape') {
            hideFontDropdown();
        }
    });
    
    function showFontDropdown() {
        
        fontDropdown.style.display = 'block';
        fontDropdown.style.visibility = 'visible';
        fontDropdown.style.opacity = '1';
        fontDropdown.style.position = 'absolute';
        fontDropdown.style.zIndex = '1000';
        
        fontSearch.value = '';
        filterFonts('');
        fontSearch.focus();
    }
    
    function hideFontDropdown() {
        fontDropdown.style.display = 'none';
        selectedIndex = -1;
    }
    
    function filterFonts(query) {
        fontList.innerHTML = '';
        selectedIndex = -1;
        
        const filteredFonts = allFonts.filter(font => 
            font.family.toLowerCase().includes(query)
        ).slice(0, 50); // Limit to 50 results for performance
        
        filteredFonts.forEach((font, index) => {
            const item = document.createElement('div');
            item.className = 'font-item';
            item.dataset.fontFamily = font.family;
            item.innerHTML = `
                <div class="font-item-name" style="font-family: '${font.family}', sans-serif">${font.family}</div>
                <div class="font-item-preview">${font.category} • ${font.variants.length} variants</div>
            `;
            
            item.addEventListener('click', () => selectFont(font.family));
            
            fontList.appendChild(item);
        });
    }
    
    function updateSelection(items) {
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === selectedIndex);
        });
        
        if (selectedIndex >= 0 && items[selectedIndex]) {
            items[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }
    
    function selectFont(fontFamily) {
        fontInput.value = fontFamily;
        hideFontDropdown();
        
        // Trigger change event
        const event = new Event('input', { bubbles: true });
        fontInput.dispatchEvent(event);
    }
}

// Update font count (legacy function)
function updateFontCount() {
    const fontOptions = document.getElementById('font-options');
    const fontCount = document.getElementById('font-count');
    
    if (fontOptions && fontCount) {
        const count = fontOptions.querySelectorAll('option').length;
        fontCount.textContent = count;
    }
}