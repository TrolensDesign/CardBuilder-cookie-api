// Modern Cookie API Card Builder - Main App Logic

// Global state
let elements = [];
let selectedElement = null;
let selectedElements = []; // Array for multi-selection
let elementIdCounter = 1;
let snapGuidesEnabled = true; // Enable/disable snap guides
let currentTheme = 'light';

// Card element (always exists)
const cardElement = {
    id: 'card',
    type: 'card',
    name: 'Card',
    width: 800,
    height: 400,
    bg: '#1a1a2e',
    bg_type: 'color',
    bg_image: '',
    bg_transparent: false
};

// Limits
const LIMITS = {
    text: 100,
    image: 10,
    discord_profile: 10,
    roblox_profile: 10,
    progressbar: 1
};

// Templates
const TEMPLATES = {
    level: {
        name: 'Level Up Card',
        elements: [
            {
                type: 'text',
                text: 'Level Up!',
                x: 50,
                y: 50,
                width: 200,
                height: 30,
                fontSize: 24,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'progressbar',
                x: 50,
                y: 100,
                width: 300,
                height: 20,
                progressValue: 75,
                progressMax: 100,
                progressColor: '#10b981',
                progressBgColor: '#334155'
            }
        ]
    },
    achievement: {
        name: 'Achievement Card',
        elements: [
            {
                type: 'text',
                text: 'Achievement Unlocked!',
                x: 50,
                y: 50,
                width: 250,
                height: 25,
                fontSize: 20,
                fontFamily: 'Inter',
                textColor: '#f59e0b',
            },
            {
                type: 'text',
                text: '🏆 First Steps',
                x: 50,
                y: 100,
                width: 200,
                height: 25,
                fontSize: 16,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            }
        ]
    },
    profile: {
        name: 'Profile Card',
        elements: [
            {
                type: 'discord_profile',
                x: 50,
                y: 50,
                width: 80,
                height: 80,
                userId: '1011787830567120898',
                borderRadius: 0
            },
            {
                type: 'text',
                text: 'Username',
                x: 150,
                y: 60,
                width: 150,
                height: 25,
                fontSize: 18,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'text',
                text: 'Level 25',
                x: 150,
                y: 90,
                width: 100,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#94a3b8',
            }
        ]
    },
    discord_card: {
        name: 'Discord Member Card',
        elements: [
            {
                type: 'discord_profile',
                x: 50,
                y: 50,
                width: 100,
                height: 100,
                userId: '1011787830567120898',
                borderRadius: 50
            },
            {
                type: 'text',
                text: 'Member Name',
                x: 170,
                y: 60,
                width: 180,
                height: 25,
                fontSize: 20,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'text',
                text: 'Member since 2023',
                x: 170,
                y: 95,
                width: 200,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#94a3b8',
            },
            {
                type: 'progressbar',
                x: 170,
                y: 125,
                width: 250,
                height: 15,
                progressValue: 65,
                progressMax: 100,
                progressColor: '#5865f2',
                progressBgColor: '#2f3136',
                progressBorderRadius: 8
            }
        ]
    },
    gaming_profile: {
        name: 'Gaming Profile',
        elements: [
            {
                type: 'roblox_profile',
                x: 50,
                y: 50,
                width: 80,
                height: 80,
                name: 'GamerPro123',
                borderRadius: 40
            },
            {
                type: 'text',
                text: 'GamerPro123',
                x: 150,
                y: 60,
                width: 150,
                height: 25,
                fontSize: 18,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'text',
                text: 'Level 42',
                x: 150,
                y: 90,
                width: 100,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#00a2ff',
            },
            {
                type: 'progressbar',
                x: 150,
                y: 120,
                width: 250,
                height: 12,
                progressValue: 85,
                progressMax: 100,
                progressColor: '#00a2ff',
                progressBgColor: '#1a1a1a',
                progressBorderRadius: 6
            }
        ]
    },
    progress_card: {
        name: 'Progress Card',
        elements: [
            {
                type: 'text',
                text: 'Weekly Progress',
                x: 50,
                y: 50,
                width: 300,
                height: 30,
                fontSize: 22,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'progressbar',
                x: 50,
                y: 90,
                width: 200,
                height: 25,
                progressValue: 75,
                progressMax: 100,
                progressColor: '#10b981',
                progressBgColor: '#374151',
                progressBorderRadius: 10
            },
            {
                type: 'text',
                text: '75% Complete',
                x: 50,
                y: 120,
                width: 200,
                height: 25,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#10b981',
            }
        ]
    },
    achievement_unlock: {
        name: 'Achievement Unlock',
        elements: [
            {
                type: 'text',
                text: '🏆 ACHIEVEMENT UNLOCKED!',
                x: 50,
                y: 50,
                width: 200,
                height: 25,
                fontSize: 24,
                fontFamily: 'Inter',
                textColor: '#fbbf24',
            },
            {
                type: 'text',
                text: 'First Steps',
                x: 50,
                y: 95,
                width: 300,
                height: 30,
                fontSize: 18,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'text',
                text: 'Complete your first task',
                x: 50,
                y: 125,
                width: 200,
                height: 25,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#94a3b8',
            }
        ]
    },
    level_up: {
        name: 'Level Up!',
        elements: [
            {
                type: 'text',
                text: 'LEVEL UP!',
                x: 50,
                y: 50,
                width: 200,
                height: 25,
                fontSize: 26,
                fontFamily: 'Inter',
                textColor: '#10b981',
            },
            {
                type: 'text',
                text: '25 → 26',
                x: 50,
                y: 95,
                width: 200,
                height: 25,
                fontSize: 20,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'progressbar',
                x: 50,
                y: 135,
                width: 300,
                height: 15,
                progressValue: 30,
                progressMax: 100,
                progressColor: '#10b981',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Next level: 30%',
                x: 50,
                y: 160,
                width: 200,
                height: 25,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#10b981',
            }
        ]
    },
    cyberpunk_card: {
        name: 'Cyberpunk Card',
        elements: [
            {
                type: 'text',
                text: 'CYBERPUNK 2077',
                x: 50,
                y: 40,
                width: 200,
                height: 25,
                fontSize: 28,
                fontFamily: 'Inter',
                textColor: '#00ffff',
            },
            {
                type: 'text',
                text: 'NEURAL LINK ACTIVE',
                x: 50,
                y: 80,
                width: 200,
                height: 25,
                fontSize: 16,
                fontFamily: 'Inter',
                textColor: '#ff00ff',
            },
            {
                type: 'discord_profile',
                x: 50,
                y: 120,
                width: 80,
                height: 80,
                userId: '1011787830567120898',
                borderRadius: 40
            },
            {
                type: 'text',
                text: 'V',
                x: 150,
                y: 140,
                width: 200,
                height: 25,
                fontSize: 32,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'text',
                text: 'Netrunner Level 50',
                x: 150,
                y: 180,
                width: 200,
                height: 25,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#00ffff',
            },
            {
                type: 'progressbar',
                x: 50,
                y: 220,
                width: 300,
                height: 20,
                progressValue: 87,
                progressMax: 100,
                progressColor: '#ff00ff',
                progressBgColor: '#1a0a1a',
                progressBorderRadius: 10
            },
            {
                type: 'text',
                text: 'SYSTEM INTEGRITY: 87%',
                x: 50,
                y: 250,
                width: 250,
                height: 20,
                fontSize: 12,
                fontFamily: 'Inter',
                textColor: '#00ff00',
            }
        ]
    },
    glassmorphism_card: {
        name: 'Glassmorphism Card',
        elements: [
            {
                type: 'text',
                text: 'Glass Design',
                x: 50,
                y: 50,
                width: 200,
                height: 25,
                fontSize: 24,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'text',
                text: 'Modern UI Elements',
                x: 50,
                y: 90,
                width: 200,
                height: 25,
                fontSize: 16,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'discord_profile',
                x: 50,
                y: 130,
                width: 70,
                height: 70,
                userId: '1011787830567120898',
                borderRadius: 35
            },
            {
                type: 'text',
                text: 'Designer',
                x: 140,
                y: 150,
                width: 200,
                height: 25,
                fontSize: 20,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'text',
                text: 'Creating beautiful interfaces',
                x: 140,
                y: 180,
                width: 200,
                height: 25,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'progressbar',
                x: 50,
                y: 220,
                width: 350,
                height: 15,
                progressValue: 95,
                progressMax: 100,
                progressColor: '#ffffff',
                progressBgColor: '#000000',
                progressBorderRadius: 8
            }
        ]
    },
    retro_wave_card: {
        name: 'Retro Wave Card',
        elements: [
            {
                type: 'text',
                text: 'RETRO WAVE',
                x: 50,
                y: 30,
                width: 200,
                height: 25,
                fontSize: 26,
                fontFamily: 'Inter',
                textColor: '#ff0080',
            },
            {
                type: 'text',
                text: 'SYNTHWAVE VIBES',
                x: 50,
                y: 65,
                width: 200,
                height: 25,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#00ffff',
            },
            {
                type: 'roblox_profile',
                x: 50,
                y: 100,
                width: 80,
                height: 80,
                name: 'SynthMaster',
                borderRadius: 40
            },
            {
                type: 'text',
                text: 'SYNTH MASTER',
                x: 150,
                y: 120,
                width: 200,
                height: 25,
                fontSize: 18,
                fontFamily: 'Inter',
                textColor: '#ff0080',
            },
            {
                type: 'text',
                text: 'Level 80 • Miami Vice',
                x: 150,
                y: 150,
                width: 200,
                height: 25,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#00ffff',
            },
            {
                type: 'progressbar',
                x: 50,
                y: 200,
                width: 350,
                height: 18,
                progressValue: 92,
                progressMax: 100,
                progressColor: '#ff0080',
                progressBgColor: '#1a0a2e',
                progressBorderRadius: 9
            },
            {
                type: 'text',
                text: 'SYNTH LEVEL: 92/100',
                x: 50,
                y: 230,
                width: 200,
                height: 25,
                fontSize: 12,
                fontFamily: 'Inter',
                textColor: '#ff0080',
            }
        ]
    },
    glassmorphism_advanced: {
        name: 'Advanced Glassmorphism',
        background: 'https://img.freepik.com/premium-vector/black-background-with-square-glass-frame-black-3d-spheres-glass-morphism-style_206325-2814.jpg',
        elements: [
            {
                type: 'text',
                text: 'GLASS MORPHISM',
                x: 50,
                y: 30,
                width: 200,
                height: 25,
                fontSize: 24,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'text',
                text: '3D Glass Spheres & Frames',
                x: 50,
                y: 65,
                width: 350,
                height: 25,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'discord_profile',
                x: 50,
                y: 100,
                width: 80,
                height: 80,
                userId: '1011787830567120898',
                borderRadius: 40
            },
            {
                type: 'text',
                text: 'Designer',
                x: 150,
                y: 120,
                width: 200,
                height: 25,
                fontSize: 20,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'text',
                text: 'Creating 3D glass interfaces',
                x: 150,
                y: 150,
                width: 200,
                height: 25,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            },
            {
                type: 'progressbar',
                x: 50,
                y: 200,
                width: 350,
                height: 16,
                progressValue: 88,
                progressMax: 100,
                progressColor: '#ffffff',
                progressBgColor: '#000000',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'GLASS QUALITY: 88%',
                x: 50,
                y: 225,
                width: 200,
                height: 25,
                fontSize: 12,
                fontFamily: 'Inter',
                textColor: '#ffffff',
            }
        ]
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Initializing Modern Cookie API Card Builder
    
    // Load Google Fonts dynamically
    if (typeof loadGoogleFonts === 'function') {
        loadGoogleFonts();
    }
    
    // Set dark theme as default
    setTheme('dark');
    
    // Initialize snap guides
    const snapToggle = document.getElementById('snap-guides-toggle');
    if (snapToggle) {
        snapToggle.innerHTML = snapGuidesEnabled ? '<span>🧲</span><span>Snap: On</span>' : '<span>🧲</span><span>Snap: Off</span>';
        snapToggle.classList.toggle('active', snapGuidesEnabled);
    }
    
    // Set default zoom to 75%
    const zoomSelect = document.getElementById('canvas-zoom');
    if (zoomSelect) {
        zoomSelect.value = '0.75';
    }
    
    // Add event listeners for JSON mode radio buttons in sidebar
    const jsonModeRadios = document.querySelectorAll('input[name="jsonMode"]');
    jsonModeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateJSON(); // Update JSON when mode changes
        });
    });
    
    // Select Element by default (no more Card tab)
    selectedElement = null;
    
    // Initialize all components
    updateCanvas();
    updateQuotas();
    updateJSON();
    
    // Initialize transparent switch
    initTransparentSwitch();
    
    // Initialize type change
    handleTypeChange();
    updateQuickActionsState();
    updateLayersPanel();
    updateCanvasStatus();
    updateCardProperties();
    updateTemplateButtons(); // Initialize template button states
    initCanvasResize();
    
    // Add event listeners
    setupEventListeners();
    
    // Show welcome message
    showToast('Welcome to Cookie Card Builder! 🍪', 'success');
    
});

// Theme Management - Dark theme only
function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Setup event listeners
function setupEventListeners() {
    
    // Card property listeners
    document.getElementById('card-width').addEventListener('input', function() {
        cardElement.width = parseInt(this.value);
        updateCanvas();
        
        // Auto-adjust zoom if canvas is too big
        setTimeout(adjustZoomForCanvasSize, 100);
    });
    
    document.getElementById('card-height').addEventListener('input', function() {
        cardElement.height = parseInt(this.value);
        updateCanvas();
        
        // Auto-adjust zoom if canvas is too big
        setTimeout(adjustZoomForCanvasSize, 100);
    });
    
    const zoomSelect = document.getElementById('canvas-zoom');
    if (zoomSelect) {
        zoomSelect.addEventListener('change', function() {
            updateCanvas();
            updateJSON();
        });
    }
    
    document.getElementById('bg-type').addEventListener('change', function() {
        cardElement.bg_type = this.value;
        handleBackgroundTypeChange();
        handleTypeChange();
    });
    
    document.getElementById('bg-color').addEventListener('input', function() {
        cardElement.bg = this.value;
        updateCanvas();
    });
    
    document.getElementById('bg-image').addEventListener('input', function() {
        cardElement.bg_image = this.value;
        updateCanvas();
    });
    
    document.getElementById('bg-transparent').addEventListener('change', function() {
        cardElement.bg_transparent = this.checked;
        handleTransparencyToggle();
    });
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.textContent.toLowerCase();
            switchTab(tab);
        });
    });
}

// Transparent Switch Management
function initTransparentSwitch() {
    const transparentSwitch = document.getElementById('bg-transparent');
    const colorPicker = document.getElementById('bg-color');
    const canvas = document.getElementById('canvas');
    
    console.log('Elements found:', {
        transparentSwitch: !!transparentSwitch,
        colorPicker: !!colorPicker,
        canvas: !!canvas
    });
    
    if (transparentSwitch && colorPicker && canvas) {
        transparentSwitch.addEventListener('change', function() {
            console.log('Switch changed:', this.checked);
            try {
                if (this.checked) {
                    // Enable transparent mode
                    console.log('Enabling transparent mode');
                    canvas.classList.add('transparent');
                    colorPicker.disabled = true;
                    if (cardElement) {
                        cardElement.background = 'transparent';
                    }
                } else {
                    // Disable transparent mode
                    console.log('Disabling transparent mode');
                    canvas.classList.remove('transparent');
                    colorPicker.disabled = false;
                    if (cardElement) {
                        cardElement.background = colorPicker.value;
                    }
                }
                try {
                    updateCanvas();
                    updateJSON();
                } catch (error) {
                    console.error('Error updating canvas/JSON:', error);
                }
            } catch (error) {
                console.error('Error in transparent switch change:', error);
            }
        });
        
        // Force initial state
        console.log('Initial switch state:', transparentSwitch.checked);
        try {
            if (transparentSwitch.checked) {
                console.log('Initial: Enabling transparent');
                canvas.classList.add('transparent');
                colorPicker.disabled = true;
                if (cardElement) {
                    cardElement.background = 'transparent';
                }
            } else {
                console.log('Initial: Disabling transparent');
                canvas.classList.remove('transparent');
                colorPicker.disabled = false;
                if (cardElement) {
                    cardElement.background = colorPicker.value;
                }
            }
        } catch (error) {
            console.error('Error in transparent switch init:', error);
        }
        
    }
}

// Update layers panel
function updateLayersPanel() {
    try {
        console.log('updateLayersPanel called, elements.length:', elements.length);
        const layersList = document.getElementById('layers-list');
        if (!layersList) {
            console.error('layers-list element not found!');
            return;
        }
        
        console.log('layers-list element found, clearing innerHTML');
        layersList.innerHTML = '';
        
        // Show "no elements" message if canvas is empty
        if (elements.length === 0) {
            console.log('No elements, showing no-layers message');
            layersList.innerHTML = '<div class="no-layers">No elements added yet</div>';
            updateCanvasStatus();
            return;
        }
        
        console.log('Elements found, proceeding with layers creation');
    
    // Add card layer
    const cardLayer = document.createElement('div');
    cardLayer.className = 'layer-item';
    cardLayer.innerHTML = `
        <div class="layer-icon">🖼️</div>
        <div class="layer-info">
            <div class="layer-name">Card</div>
            <div class="layer-details">Canvas Properties</div>
        </div>
        <div class="layer-controls">
            <button class="layer-btn" onclick="moveLayer('card', 'up')" title="Move Up">⬆️</button>
            <button class="layer-btn" onclick="moveLayer('card', 'down')" title="Move Down">⬇️</button>
        </div>
    `;
    
    // Add click event to select card
    cardLayer.addEventListener('click', (e) => {
        // Don't select if clicking on buttons
        if (e.target.classList.contains('layer-btn') || e.target.closest('.layer-btn')) {
            return;
        }
        selectElement('card');
    });
    
    // Add selected class if card is selected
    if (selectedElement === 'card') {
        cardLayer.classList.add('selected');
    }
    
    layersList.appendChild(cardLayer);
    
    // Ensure all elements have layer property
    elements.forEach(element => {
        if (!element.layer || element.layer === 0) {
            element.layer = elements.length > 0 ? Math.max(...elements.map(e => e.layer || 0), 0) + 1 : 1;
            console.log(`Assigned layer ${element.layer} to element ${element.id} (${element.type})`);
        }
    });
    
    // Add element layers (sorted by layer number)
    const sortedElements = [...elements].sort((a, b) => a.layer - b.layer);
    console.log('Elements with layers:', sortedElements.map(e => ({id: e.id, type: e.type, layer: e.layer, width: e.width, height: e.height})));
    sortedElements.forEach(element => {
        const layerItem = document.createElement('div');
        layerItem.className = 'layer-item';
        
        const layerNumber = element.layer || 1;
        const elementDetails = window.getElementDetails ? window.getElementDetails(element) : `Layer: ${element.layer || 1}`;
        
        console.log(`Element ${element.id} (${element.type}): layer=${layerNumber}, details="${elementDetails}"`);
        
        layerItem.innerHTML = `
            <div class="layer-icon">${getElementIcon(element.type)}</div>
            <div class="layer-info">
                <div class="layer-name">${getElementDisplayName(element)}</div>
                <div class="layer-details">${elementDetails}</div>
            </div>
            <div class="layer-controls">
                <button class="layer-btn" onclick="moveLayer('${element.id}', 'up')" title="Move Up">⬆️</button>
                <button class="layer-btn" onclick="moveLayer('${element.id}', 'down')" title="Move Down">⬇️</button>
                <button class="layer-btn delete" onclick="deleteElement('${element.id}')" title="Delete">🗑️</button>
            </div>
        `;
        
        // Add click event to select element
        layerItem.addEventListener('click', (e) => {
            // Don't select if clicking on buttons
            if (e.target.classList.contains('layer-btn') || e.target.closest('.layer-btn')) {
                return;
            }
            selectElement(element.id);
        });
        
        // Add selected class if element is selected
        if (selectedElement === element.id) {
            layerItem.classList.add('selected');
        }
        
        layersList.appendChild(layerItem);
    });
    
    } catch (error) {
        console.error('Error in updateLayersPanel:', error);
    }
}


// Helper functions for layers
function getElementIcon(type) {
    const icons = {
        text: '📝',
        image: '🖼️',
        discord_profile: '👤',
        roblox_profile: '🎮',
        progressbar: '📊',
    };
    return icons[type] || '📦';
}

function getElementDisplayName(element) {
    if (typeof element === 'string') return element;
    
    switch (element.type) {
        case 'text':
            return element.text || 'Text';
        case 'image':
            return 'Image';
        case 'discord_profile':
            return element.userId ? `Discord (${element.userId.substring(0, 10)}...)` : 'Discord Profile';
        case 'roblox_profile':
            return element.name || 'Roblox Profile';
        case 'progressbar':
            return 'Progress Bar';
        default:
            return element.type;
    }
}

function getElementDetails(element) {
    switch (element.type) {
        case 'text':
            return ` • ${element.fontSize || 16}px ${element.fontFamily || 'Inter'}`;
        case 'image':
            return ` • ${element.width}×${element.height}`;
        case 'discord_profile':
            return ` • Radius: ${element.borderRadius || 1}`;
        case 'roblox_profile':
            return ` • Status`;
        case 'progressbar':
            return ` • ${element.progressValue || 0}/${element.progressMax || 100}`;
        default:
            return '';
    }
}

// Tab Management
function switchTab(tab) {
    console.log('switchTab called with tab:', tab);
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find the clicked button and make it active
    const clickedButton = document.querySelector(`[onclick="switchTab('${tab}')"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetTab = document.getElementById(`${tab}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Update selected element
    if (tab === 'element') {
        selectedElement = null;
    } else if (tab === 'layers') {
        // Update layers panel when switching to layers tab
        console.log('Switching to layers tab, elements.length:', elements.length);
        console.log('Elements:', elements);
        try {
            updateLayersPanel();
            console.log('updateLayersPanel completed successfully');
        } catch (error) {
            console.error('Error in updateLayersPanel:', error);
        }
    }
}

// Make functions globally available
window.switchTab = switchTab;
window.updateLayersPanel = updateLayersPanel;

// Template Management
function loadTemplate(templateName) {
    const template = TEMPLATES[templateName];
    if (!template) {
        showToast('Template not found!', 'error');
        return;
    }
    
    // Check if template contains progressbar and if canvas already has one
    const templateHasProgressbar = template.elements.some(el => el.type === 'progressbar');
    const canvasHasProgressbar = elements.some(el => el.type === 'progressbar');
    
    if (templateHasProgressbar && canvasHasProgressbar) {
        showToast('Canvas already has a progress bar! Only one progress bar is allowed.', 'warning');
        return;
    }
    
    // Don't clear existing elements - just add template elements
    const existingElementsCount = elements.length;
    
    // Add background image as first element if template has one
    if (template.background) {
        const backgroundElement = {
            id: elementIdCounter++,
            type: 'image',
            x: 1,
            y: 1,
            width: cardElement.width,
            height: cardElement.height,
            imageUrl: template.background,
            opacity: 100,
            layer: 1,
            widthAuto: false,
            heightAuto: false
        };
        elements.push(backgroundElement);
    }
    
    // Load template elements
    template.elements.forEach(templateElement => {
        const element = {
            id: elementIdCounter++,
            ...templateElement,
            opacity: 100,
            layer: elements.length > 0 ? Math.max(...elements.map(e => e.layer || 0), 0) + 1 : 1,
            widthAuto: templateElement.type === 'roblox_profile' || templateElement.type === 'text',
            heightAuto: templateElement.type === 'text'
        };
        elements.push(element);
    });
    
    // Update UI
    updateCanvas();
    updateQuotas();
    updateJSON();
    updateLayersPanel();
    updateCanvasStatus();
    updateTemplateButtons(); // Update template button states
    
    const addedCount = elements.length - existingElementsCount;
    showToast(`Added ${template.name} template! (+${addedCount} elements)`, 'success');
}

// Update template button states based on progressbar availability
function updateTemplateButtons() {
    const canvasHasProgressbar = elements.some(el => el.type === 'progressbar');
    
    // Templates that contain progressbar
    const progressbarTemplates = ['level', 'achievement', 'progress_card', 'level_up', 'discord_card', 'gaming_profile', 'cyberpunk_card', 'glassmorphism_card', 'retro_wave_card', 'glassmorphism_advanced'];
    
    progressbarTemplates.forEach(templateName => {
        const button = document.querySelector(`[onclick="loadTemplate('${templateName}')"]`);
        if (button) {
            if (canvasHasProgressbar) {
                button.disabled = true;
                button.style.opacity = '0.5';
                button.title = 'Disabled: Canvas already has a progress bar';
            } else {
                button.disabled = false;
                button.style.opacity = '1';
                button.title = '';
            }
        }
    });
}

// Clear all elements
function clearCanvas() {
    if (elements.length === 0) {
        showToast('Canvas is already empty!', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to clear all elements? This cannot be undone.')) {
        elements = [];
        elementIdCounter = 1;
        selectedElement = 'card';
        selectedElements = [];
        
        // Update UI
        updateCanvas();
        updateQuotas();
        updateJSON();
        updateLayersPanel();
        updateCanvasStatus();
        updateElementProperties();
        updateTemplateButtons(); // Update template button states
        
        showToast('Canvas cleared! 🧹', 'success');
    }
}

// Handle background type change
function handleBackgroundTypeChange() {
    const bgType = document.getElementById('bg-type').value;
    const colorRow = document.getElementById('color-row');
    const imageRow = document.getElementById('image-row');
    
    if (bgType === 'image') {
        if (colorRow) colorRow.style.display = 'none';
        if (imageRow) imageRow.style.display = 'block';
    } else {
        if (colorRow) colorRow.style.display = 'block';
        if (imageRow) imageRow.style.display = 'none';
    }
    
    updateCanvas();
    updateJSON();
}

// Handle type change (Color/Image)
function handleTypeChange() {
    const typeSelect = document.getElementById('bg-type');
    const imageUrlProperty = document.getElementById('image-url-property');
    const colorProperty = document.getElementById('color-property');
    const transparentProperty = document.querySelector('.card-property:has(#bg-transparent)');
    
    if (typeSelect && imageUrlProperty && colorProperty) {
        if (typeSelect.value === 'image') {
            imageUrlProperty.style.display = 'flex';
            colorProperty.style.display = 'none';
            // Hide transparent switch for image type
            if (transparentProperty) {
                transparentProperty.style.display = 'none';
            }
        } else {
            imageUrlProperty.style.display = 'none';
            colorProperty.style.display = 'flex';
            // Show transparent switch for color type
            if (transparentProperty) {
                transparentProperty.style.display = 'flex';
            }
        }
    }
}

// Handle transparency toggle
function handleTransparencyToggle() {
    const isTransparent = document.getElementById('bg-transparent').checked;
    const bgTypeSelect = document.getElementById('bg-type');
    const bgColorInput = document.getElementById('bg-color');
    const bgImageInput = document.getElementById('bg-image');
    const colorRow = document.getElementById('color-row');
    const imageRow = document.getElementById('image-row');
    
    if (isTransparent) {
        bgTypeSelect.disabled = true;
        bgColorInput.disabled = true;
        bgImageInput.disabled = true;
        if (colorRow) colorRow.style.display = 'none';
        if (imageRow) imageRow.style.display = 'none';
    } else {
        bgTypeSelect.disabled = false;
        bgColorInput.disabled = false;
        bgImageInput.disabled = false;
        handleBackgroundTypeChange();
    }
    
    updateCanvas();
    updateJSON();
}

// Update canvas
function updateCanvas() {
    const canvas = document.getElementById('canvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    
    const width = cardElement.width;
    const height = cardElement.height;
    const zoom = parseFloat(document.getElementById('canvas-zoom').value);
    
    const newWidth = (width * zoom) + 'px';
    const newHeight = (height * zoom) + 'px';
    
    // Apply size with constraints
    canvas.style.width = newWidth;
    canvas.style.height = newHeight;
    canvas.style.maxWidth = '100%';
    canvas.style.maxHeight = '100%';
    
    // Handle transparency
    const isTransparent = cardElement.bg_transparent;
    
    if (isTransparent) {
        canvas.classList.add('transparent');
        canvas.style.background = '';
        canvas.style.backgroundImage = '';
    } else {
        canvas.classList.remove('transparent');
        if (cardElement.bg_type === 'color') {
            canvas.style.background = cardElement.bg;
        } else {
            canvas.style.background = cardElement.bg_image ? `url(${cardElement.bg_image}) center/cover` : '#1a1a2e';
        }
    }
    
    // Clear canvas but preserve resize handle and snap guides
    const resizeHandle = canvas.querySelector('.canvas-resize-handle');
    const snapGuides = canvas.querySelectorAll('.snap-guide');
    canvas.innerHTML = '';
    if (resizeHandle) {
        canvas.appendChild(resizeHandle);
    }
    // Re-add snap guides
    snapGuides.forEach(guide => {
        canvas.appendChild(guide);
    });
    
    // Render elements
    const sortedElements = [...elements].sort((a, b) => a.layer - b.layer);
    sortedElements.forEach(element => {
        const elementDiv = createElementDiv(element, zoom);
        canvas.appendChild(elementDiv);
    });
    
    // Add multi-select border if multiple elements are selected
    if (selectedElements.length > 1) {
        addMultiSelectBorder(canvas, zoom);
    }
    
    updateLayersPanel();
    updateCanvasStatus();
    ensureResizeHandle();
    
    // Update JSON live preview
    updateJSON();
}

// Add multi-select border around all selected elements
function addMultiSelectBorder(canvas, zoom) {
    if (selectedElements.length <= 1) return;
    
    // Get all selected elements
    const selectedEls = selectedElements.map(id => elements.find(el => el.id === id)).filter(Boolean);
    if (selectedEls.length === 0) return;
    
    // Calculate bounding box
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    selectedEls.forEach(element => {
        const x = element.x;
        const y = element.y;
        const width = getElementActualWidth(element);
        const height = getElementActualHeight(element);
        
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + width);
        maxY = Math.max(maxY, y + height);
    });
    
    // Create border element
    const border = document.createElement('div');
    border.className = 'multi-select-border';
    border.style.position = 'absolute';
    border.style.left = (minX * zoom) + 'px';
    border.style.top = (minY * zoom) + 'px';
    border.style.width = ((maxX - minX) * zoom) + 'px';
    border.style.height = ((maxY - minY) * zoom) + 'px';
    border.style.border = '2px dashed #ff6b35';
    border.style.borderRadius = '4px';
    border.style.pointerEvents = 'none';
    border.style.zIndex = '9999';
    
    // Multi-select resize handles removed to avoid bugs and problems
    
    canvas.appendChild(border);
}

// Multi-resize functionality removed to avoid bugs and problems

// Ensure resize handle exists
function ensureResizeHandle() {
    const canvas = document.getElementById('canvas');
    let resizeHandle = canvas.querySelector('.canvas-resize-handle');
    
    if (!resizeHandle) {
        resizeHandle = document.createElement('div');
        resizeHandle.id = 'canvas-resize-handle';
        resizeHandle.className = 'canvas-resize-handle';
        canvas.appendChild(resizeHandle);
        
        setTimeout(() => {
            initCanvasResize();
        }, 100);
    }
}

// Update quotas
function updateQuotas() {
    const counts = {
        text: elements.filter(e => e.type === 'text').length,
        image: elements.filter(e => e.type === 'image').length,
        discord_profile: elements.filter(e => e.type === 'discord_profile').length,
        roblox_profile: elements.filter(e => e.type === 'roblox_profile').length,
        progressbar: elements.filter(e => e.type === 'progressbar').length
    };
    
    Object.keys(counts).forEach(type => {
        const quotaEl = document.getElementById(`quota-${type}`);
        if (quotaEl) {
            const count = counts[type];
            const limit = LIMITS[type];
            
            if (limit === Infinity) {
                quotaEl.textContent = count.toString();
            } else {
                quotaEl.textContent = `${count}/${limit}`;
            }
        }
    });
    
    // Update button states
    Object.keys(LIMITS).forEach(type => {
        const button = document.querySelector(`[data-type="${type}"]`);
        if (button) {
            const count = counts[type] || 0;
            const limit = LIMITS[type];
            button.disabled = count >= limit;
        }
    });
}

// Update JSON output
function updateJSON() {
    try {
        const cardWidth = cardElement.width;
        const cardHeight = cardElement.height;
        const bgType = cardElement.bg_type;
        const bgColor = cardElement.bg;
        const bgImage = cardElement.bg_image;
        const isTransparent = cardElement.bg_transparent;
        
        // Check if variables mode is enabled
        const variablesMode = document.querySelector('input[name="jsonMode"]:checked')?.value === 'variables';
    
        const payload = {
            card: {
                width: String(cardWidth),
                height: String(cardHeight),
                bg: isTransparent ? '#00000000' : (bgType === 'color' ? bgColor : bgImage),
                bg_type: bgType
            },
            elements: elements.map(element => {
                const base = {
                    id: String(element.id),
                    type: element.type,
                    layer: variablesMode && element.layerVariable ? element.layerVariable : String(element.layer),
                    transparency: variablesMode && element.opacityVariable ? element.opacityVariable : String(element.opacity),
                    position: {
                        x: variablesMode && element.xVariable ? element.xVariable : Number(element.x),
                        y: variablesMode && element.yVariable ? element.yVariable : Number(element.y)
                    },
                    size: {
                        width: Number(element.widthAuto || element.width === 'auto' ? getElementActualWidth(element) : element.width),
                        height: Number(element.heightAuto || element.height === 'auto' ? getElementActualHeight(element) : element.height)
                    }
                };
                
                if (element.type === 'text') {
                    return {
                        id: String(element.id),
                        type: element.type,
                        text: element.text,
                        text_size: variablesMode && element.fontSizeVariable ? element.fontSizeVariable : String(element.fontSize),
                        font: variablesMode && element.fontFamilyVariable ? element.fontFamilyVariable : element.fontFamily,
                        color: variablesMode && element.textColorVariable ? element.textColorVariable : element.textColor,
                        transparency: variablesMode && element.opacityVariable ? element.opacityVariable : String(element.opacity),
                        layer: variablesMode && element.layerVariable ? element.layerVariable : String(element.layer),
                        position: {
                            x: variablesMode && element.xVariable ? element.xVariable : Number(element.x),
                            y: variablesMode && element.yVariable ? element.yVariable : Number(element.y)
                        },
                        size: {
                            width: Number(element.widthAuto || element.width === 'auto' ? getElementActualWidth(element) : element.width),
                            height: Number(element.heightAuto || element.height === 'auto' ? getElementActualHeight(element) : element.height)
                        }
                    };
                } else if (element.type === 'image') {
                    base.url = variablesMode && element.imageUrlVariable ? element.imageUrlVariable : element.imageUrl;
                    base.border_radius = variablesMode && element.borderRadiusVariable ? element.borderRadiusVariable : String(element.borderRadius || 1);
                    base.transparency = variablesMode && element.opacityVariable ? element.opacityVariable : String(element.opacity);
                    base.layer = variablesMode && element.layerVariable ? element.layerVariable : String(element.layer);
                    base.position.x = variablesMode && element.xVariable ? element.xVariable : Number(element.x);
                    base.position.y = variablesMode && element.yVariable ? element.yVariable : Number(element.y);
                    base.size.width = variablesMode && element.widthVariable ? element.widthVariable : Number(element.width);
                    base.size.height = variablesMode && element.heightVariable ? element.heightVariable : Number(element.height);
                } else if (element.type === 'discord_profile') {
                    return {
                        id: String(element.id),
                        type: element.type,
                        user_id: variablesMode && element.userIdVariable ? element.userIdVariable : element.userId,
                        transparency: variablesMode && element.opacityVariable ? element.opacityVariable : String(element.opacity),
                        layer: variablesMode && element.layerVariable ? element.layerVariable : String(element.layer),
                        border_radius: variablesMode && element.borderRadiusVariable ? element.borderRadiusVariable : String(element.borderRadius || 100),
                        position: {
                            x: variablesMode && element.xVariable ? element.xVariable : Number(element.x),
                            y: variablesMode && element.yVariable ? element.yVariable : Number(element.y)
                        },
                        size: {
                            width: Number(element.widthAuto || element.width === 'auto' ? getElementActualWidth(element) : (variablesMode && element.widthVariable ? element.widthVariable : Number(element.width))),
                            height: Number(element.heightAuto || element.height === 'auto' ? getElementActualHeight(element) : (variablesMode && element.heightVariable ? element.heightVariable : Number(element.height)))
                        }
                    };
                } else if (element.type === 'roblox_profile') {
                    return {
                        id: String(element.id),
                        type: element.type,
                        user: element.name || 'Username',
                        transparency: String(element.opacity),
                        layer: String(element.layer),
                        border_radius: String(element.borderRadius || 100),
                        position: {
                            x: Number(element.x),
                            y: Number(element.y)
                        },
                        size: {
                            width: Number(element.widthAuto || element.width === 'auto' ? getElementActualWidth(element) : element.width),
                            height: Number(element.heightAuto || element.height === 'auto' ? getElementActualHeight(element) : element.height)
                        }
                    };
                } else if (element.type === 'progressbar') {
                    base.value = variablesMode && element.progressValueVariable ? element.progressValueVariable : Number(element.progressValue);
                    base.max = variablesMode && element.progressMaxVariable ? element.progressMaxVariable : Number(element.progressMax);
                    base.color = variablesMode && element.progressColorVariable ? element.progressColorVariable : element.progressColor;
                    base.bg_color = variablesMode && element.progressBgColorVariable ? element.progressBgColorVariable : element.progressBgColor;
                    base.border_radius = variablesMode && element.progressBorderRadiusVariable ? element.progressBorderRadiusVariable : Number(element.progressBorderRadius);
                }
                
                return base;
            })
        };
        
        const jsonString = JSON.stringify(payload, null, 2);
        const jsonOutput = document.getElementById('json-output');
        if (jsonOutput) {
            jsonOutput.value = jsonString;
            
            // Add visual feedback
            jsonOutput.style.borderColor = 'var(--accent-color)';
            setTimeout(() => {
                jsonOutput.style.borderColor = 'var(--border-color)';
            }, 500);
        }
    } catch (error) {
        console.error('Error updating JSON:', error);
    }
}

// Copy JSON to clipboard
function copyJSON() {
    const jsonOutput = document.getElementById('json-output');
    const jsonData = jsonOutput ? jsonOutput.value : generateJSON();
    navigator.clipboard.writeText(jsonData).then(() => {
        showToast('JSON copied to clipboard! 📋', 'success');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy JSON', 'error');
    });
}

// Generate JSON (same as updateJSON but returns string)
function generateJSON() {
    const cardWidth = cardElement.width;
    const cardHeight = cardElement.height;
    const bgType = cardElement.bg_type;
    const bgColor = cardElement.bg;
    const bgImage = cardElement.bg_image;
    const isTransparent = cardElement.bg_transparent;

    const payload = {
        card: {
            width: String(cardWidth),
            height: String(cardHeight),
            bg: isTransparent ? '#00000000' : (bgType === 'color' ? bgColor : bgImage),
            bg_type: bgType
        },
        elements: elements.map(element => {
            const base = {
                id: String(element.id),
                type: element.type,
                layer: element.layerVariable || String(element.layer),
                transparency: element.opacityVariable || String(element.opacity),
                position: {
                    x: element.xVariable || Number(element.x),
                    y: element.yVariable || Number(element.y)
                },
                size: {
                    width: Number(element.widthAuto || element.width === 'auto' ? getElementActualWidth(element) : element.width),
                    height: Number(element.heightAuto || element.height === 'auto' ? getElementActualHeight(element) : element.height)
                }
            };
            
            if (element.type === 'text') {
                return {
                    id: String(element.id),
                    type: element.type,
                    text: element.text,
                    text_size: element.fontSizeVariable || String(element.fontSize),
                    font: element.fontFamilyVariable || element.fontFamily,
                    color: element.textColorVariable || element.textColor,
                    transparency: element.opacityVariable || String(element.opacity),
                    layer: element.layerVariable || String(element.layer),
                    position: {
                        x: element.xVariable || Number(element.x),
                        y: element.yVariable || Number(element.y)
                    },
                    size: {
                        width: Number(element.widthAuto || element.width === 'auto' ? getElementActualWidth(element) : element.width),
                        height: Number(element.heightAuto || element.height === 'auto' ? getElementActualHeight(element) : element.height)
                    }
                };
            } else if (element.type === 'image') {
                base.url = element.imageUrlVariable || element.imageUrl;
                base.border_radius = element.borderRadiusVariable || String(element.borderRadius || 1);
                base.transparency = element.opacityVariable || String(element.opacity);
                base.layer = element.layerVariable || String(element.layer);
                base.position.x = element.xVariable || Number(element.x);
                base.position.y = element.yVariable || Number(element.y);
                base.size.width = element.widthVariable || Number(element.width);
                base.size.height = element.heightVariable || Number(element.height);
            } else if (element.type === 'discord_profile') {
                return {
                    id: String(element.id),
                    type: element.type,
                    user_id: element.userIdVariable || element.userId,
                    transparency: element.opacityVariable || String(element.opacity),
                    layer: element.layerVariable || String(element.layer),
                    border_radius: element.borderRadiusVariable || String(element.borderRadius || 100),
                    position: {
                        x: element.xVariable || Number(element.x),
                        y: element.yVariable || Number(element.y)
                    },
                    size: {
                        width: Number(element.widthAuto || element.width === 'auto' ? getElementActualWidth(element) : (element.widthVariable || Number(element.width))),
                        height: Number(element.heightAuto || element.height === 'auto' ? getElementActualHeight(element) : (element.heightVariable || Number(element.height)))
                    }
                };
            } else if (element.type === 'roblox_profile') {
                return {
                    id: String(element.id),
                    type: element.type,
                    user: element.name || 'Username',
                    transparency: String(element.opacity),
                    layer: String(element.layer),
                    border_radius: String(element.borderRadius || 100),
                    position: {
                        x: Number(element.x),
                        y: Number(element.y)
                    },
                    size: {
                        width: Number(element.widthAuto || element.width === 'auto' ? getElementActualWidth(element) : element.width),
                        height: Number(element.heightAuto || element.height === 'auto' ? getElementActualHeight(element) : element.height)
                    }
                };
            } else if (element.type === 'progressbar') {
                base.value = element.progressValueVariable || Number(element.progressValue);
                base.max = element.progressMaxVariable || Number(element.progressMax);
                base.color = element.progressColorVariable || element.progressColor;
                base.bg_color = element.progressBgColorVariable || element.progressBgColor;
                base.border_radius = element.progressBorderRadiusVariable || Number(element.progressBorderRadius);
            }
            
            return base;
        })
    };
    
    return JSON.stringify(payload, null, 2);
}

// Download JSON
function downloadJSON() {
    const jsonOutput = document.getElementById('json-output');
    const jsonData = jsonOutput ? jsonOutput.value : generateJSON();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'card-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('JSON downloaded! 💾', 'success');
}

// Modal Management
// JSON is now automatically updated in sidebar - no modal needed

function showHelpModal() {
    const modal = document.getElementById('help-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeHelpModal() {
    const modal = document.getElementById('help-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Preview card
function previewCard() {
    showToast('Preview feature coming soon! 👁️', 'warning');
}

// Reset canvas
function resetCanvas() {
    if (confirm('Are you sure you want to reset the canvas? This will remove all elements.')) {
        elements = [];
        elementIdCounter = 1;
        selectedElement = 'card';
        updateCanvas();
        updateQuotas();
        updateJSON();
        updateLayersPanel();
    updateCanvasStatus();
        updateCardProperties();
        showToast('Canvas reset! 🔄', 'success');
    }
}

// Toast notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${getToastIcon(type)}</span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || 'ℹ️';
}

// Update quick actions buttons state
function updateQuickActionsState() {
    const buttons = document.querySelectorAll('.quick-action');
    buttons.forEach(btn => {
        // Don't disable snap guides toggle button
        if (btn.id === 'snap-guides-toggle') {
            btn.disabled = false;
        } else {
            btn.disabled = !selectedElement;
        }
    });
}

// Update canvas status in sidebar
function updateCanvasStatus() {
    const statusDiv = document.getElementById('canvas-status');
    const propertiesSections = document.getElementById('properties-sections');
    
    if (!statusDiv || !propertiesSections) return;
    
    const statusIcon = statusDiv.querySelector('.status-icon');
    const statusText = statusDiv.querySelector('.status-text');
    const statusHint = statusDiv.querySelector('.status-hint');
    
    if (elements.length === 0) {
        // Show status, hide properties sections
        statusDiv.style.display = 'block';
        propertiesSections.style.display = 'none';
        
        statusDiv.classList.remove('has-elements');
        statusIcon.textContent = '🎨';
        statusText.textContent = 'Canvas is empty';
        statusHint.textContent = 'Add elements to start building';
    } else {
        // Hide status, show properties sections
        statusDiv.style.display = 'none';
        propertiesSections.style.display = 'block';
        
        statusDiv.classList.add('has-elements');
        statusIcon.textContent = '✅';
        statusText.textContent = `${elements.length} element${elements.length !== 1 ? 's' : ''} on canvas`;
        statusHint.textContent = 'Click elements to select and edit';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Check if user is typing in an input field
    const activeElement = document.activeElement;
    const isTyping = activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' || 
        activeElement.tagName === 'SELECT' ||
        activeElement.contentEditable === 'true'
    );
    
    // Delete selected element with Backspace or Delete key (only if not typing)
    if ((event.key === 'Backspace' || event.key === 'Delete') && selectedElement && selectedElement !== 'card' && !isTyping) {
        event.preventDefault();
        deleteElement();
        return;
    }
    
    // Escape key - deselect element or close modals
    if (event.key === 'Escape') {
        if (selectedElement) {
            selectElement(null);
        } else {
            // Close modals
            const modals = document.querySelectorAll('.modal-overlay');
            modals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    }
});

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});