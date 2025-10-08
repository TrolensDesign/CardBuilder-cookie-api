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

// Make cardElement globally accessible
window.cardElement = cardElement;

// Limits
const LIMITS = {
    text: 100,
    image: 10,
    discord_profile: 10,
    roblox_profile: 10,
    progressbar: 20
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
                textColor: '#ff0080',
            }
        ]
    },
    glassmorphism_advanced: {
        name: 'Advanced Glassmorphism',
        background: 'https://i.ibb.co/7JNFkM2Q/black-background-with-square-glass-frame-black-3d-spheres-glass-morphism-style-206325-2814.jpg',
        elements: [
            {
                type: 'text',
                text: 'GLASS MORPHISM',
                x: 50,
                y: 30,
                width: 200,
                height: 25,
                fontSize: 24,
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
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
                fontFamily: 'Rajdhani',
                textColor: '#ffffff',
            }
        ]
    },
    gaming_stats: {
        name: 'Gaming Stats Dashboard',
        background: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
        elements: [
            {
                type: 'text',
                text: 'GAMING STATS',
                x: 50,
                y: 30,
                width: 300,
                height: 30,
                fontSize: 24,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left',
                fontWeight: 'bold'
            },
            {
                type: 'text',
                text: 'HP',
                x: 50,
                y: 70,
                width: 50,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ff4444',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 110,
                y: 70,
                width: 200,
                height: 15,
                progressValue: 85,
                progressMax: 100,
                progressColor: '#ff4444',
                progressBgColor: '#333333',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Mana',
                x: 50,
                y: 100,
                width: 50,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#4444ff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 110,
                y: 100,
                width: 200,
                height: 15,
                progressValue: 60,
                progressMax: 100,
                progressColor: '#4444ff',
                progressBgColor: '#333333',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'XP',
                x: 50,
                y: 130,
                width: 50,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#44ff44',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 110,
                y: 130,
                width: 200,
                height: 15,
                progressValue: 75,
                progressMax: 100,
                progressColor: '#44ff44',
                progressBgColor: '#333333',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Stamina',
                x: 50,
                y: 160,
                width: 50,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffff44',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 110,
                y: 160,
                width: 200,
                height: 15,
                progressValue: 90,
                progressMax: 100,
                progressColor: '#ffff44',
                progressBgColor: '#333333',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Skills',
                x: 50,
                y: 190,
                width: 50,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ff44ff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 110,
                y: 190,
                width: 200,
                height: 15,
                progressValue: 45,
                progressMax: 100,
                progressColor: '#ff44ff',
                progressBgColor: '#333333',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Reputation',
                x: 50,
                y: 220,
                width: 50,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#44ffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 110,
                y: 220,
                width: 200,
                height: 15,
                progressValue: 70,
                progressMax: 100,
                progressColor: '#44ffff',
                progressBgColor: '#333333',
                progressBorderRadius: 8
            }
        ]
    },
    achievement_progress: {
        name: 'Achievement Progress',
        background: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
        elements: [
            {
                type: 'text',
                text: 'ACHIEVEMENTS',
                x: 50,
                y: 30,
                width: 300,
                height: 30,
                fontSize: 24,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left',
                fontWeight: 'bold'
            },
            {
                type: 'text',
                text: 'Quests',
                x: 50,
                y: 70,
                width: 80,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 140,
                y: 70,
                width: 150,
                height: 15,
                progressValue: 12,
                progressMax: 20,
                progressColor: '#10b981',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Bosses',
                x: 50,
                y: 100,
                width: 80,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 140,
                y: 100,
                width: 150,
                height: 15,
                progressValue: 8,
                progressMax: 15,
                progressColor: '#ef4444',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Items',
                x: 50,
                y: 130,
                width: 80,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 140,
                y: 130,
                width: 150,
                height: 15,
                progressValue: 156,
                progressMax: 200,
                progressColor: '#3b82f6',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Levels',
                x: 50,
                y: 160,
                width: 80,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 140,
                y: 160,
                width: 150,
                height: 15,
                progressValue: 45,
                progressMax: 50,
                progressColor: '#f59e0b',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Achievements',
                x: 50,
                y: 190,
                width: 80,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 140,
                y: 190,
                width: 150,
                height: 15,
                progressValue: 23,
                progressMax: 30,
                progressColor: '#8b5cf6',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            }
        ]
    },
    professional_skills: {
        name: 'Professional Skills',
        background: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
        elements: [
            {
                type: 'text',
                text: 'PROFESSIONAL SKILLS',
                x: 50,
                y: 30,
                width: 300,
                height: 30,
                fontSize: 24,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left',
                fontWeight: 'bold'
            },
            {
                type: 'text',
                text: 'Programming',
                x: 50,
                y: 70,
                width: 100,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 160,
                y: 70,
                width: 200,
                height: 15,
                progressValue: 85,
                progressMax: 100,
                progressColor: '#10b981',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Design',
                x: 50,
                y: 100,
                width: 100,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 160,
                y: 100,
                width: 200,
                height: 15,
                progressValue: 70,
                progressMax: 100,
                progressColor: '#3b82f6',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Marketing',
                x: 50,
                y: 130,
                width: 100,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 160,
                y: 130,
                width: 200,
                height: 15,
                progressValue: 60,
                progressMax: 100,
                progressColor: '#f59e0b',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Leadership',
                x: 50,
                y: 160,
                width: 100,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 160,
                y: 160,
                width: 200,
                height: 15,
                progressValue: 80,
                progressMax: 100,
                progressColor: '#8b5cf6',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Communication',
                x: 50,
                y: 190,
                width: 100,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 160,
                y: 190,
                width: 200,
                height: 15,
                progressValue: 75,
                progressMax: 100,
                progressColor: '#ef4444',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            }
        ]
    },
    character_stats: {
        name: 'Character Stats',
        background: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
        elements: [
            {
                type: 'text',
                text: 'CHARACTER STATS',
                x: 50,
                y: 30,
                width: 300,
                height: 30,
                fontSize: 24,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left',
                fontWeight: 'bold'
            },
            {
                type: 'text',
                text: 'Strength',
                x: 50,
                y: 70,
                width: 100,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 160,
                y: 70,
                width: 200,
                height: 15,
                progressValue: 90,
                progressMax: 100,
                progressColor: '#ef4444',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Agility',
                x: 50,
                y: 100,
                width: 100,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 160,
                y: 100,
                width: 200,
                height: 15,
                progressValue: 75,
                progressMax: 100,
                progressColor: '#10b981',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Intelligence',
                x: 50,
                y: 130,
                width: 100,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 160,
                y: 130,
                width: 200,
                height: 15,
                progressValue: 85,
                progressMax: 100,
                progressColor: '#3b82f6',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Charisma',
                x: 50,
                y: 160,
                width: 100,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 160,
                y: 160,
                width: 200,
                height: 15,
                progressValue: 70,
                progressMax: 100,
                progressColor: '#f59e0b',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            },
            {
                type: 'text',
                text: 'Luck',
                x: 50,
                y: 190,
                width: 100,
                height: 20,
                fontSize: 14,
                fontFamily: 'Inter',
                textColor: '#ffffff',
                textAlign: 'left'
            },
            {
                type: 'progressbar',
                x: 160,
                y: 190,
                width: 200,
                height: 15,
                progressValue: 65,
                progressMax: 100,
                progressColor: '#8b5cf6',
                progressBgColor: '#374151',
                progressBorderRadius: 8
            }
        ]
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Initializing Modern Cookie API Card Builder
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Load Google Fonts dynamically
    if (typeof loadGoogleFonts === 'function') {
        loadGoogleFonts();
    }
    
    // Set dark theme as default
    setTheme('dark');
    
    // Initialize badge system
    updateAllBadges();
    
    // Initialize analytics widget
    updateAnalyticsWidget();
    
    // Initialize snap button state
    const snapButton = document.getElementById('snap-guides-toggle');
    if (snapButton && snapGuidesEnabled) {
        snapButton.classList.add('active');
    }
    
    // Initialize quotas
    updateQuotas();
    
    
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
    
    // Load custom templates
    updateCustomTemplatesUI();
    
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
        const newWidth = parseInt(this.value);
        cardElement.width = newWidth;
        
        // For image backgrounds, calculate proportional height
        if (cardElement.bg_type === 'image' && originalImageDimensions) {
            const newHeight = calculateProportionalHeight(newWidth);
            cardElement.height = newHeight;
            
            // Update height input field
            const heightInput = document.getElementById('card-height');
            if (heightInput) heightInput.value = newHeight;
        }
        
        updateCanvas();
        
        // Auto-adjust zoom if canvas is too big
        setTimeout(adjustZoomForCanvasSize, 100);
    });
    
    document.getElementById('card-height').addEventListener('input', function() {
        const newHeight = parseInt(this.value);
        cardElement.height = newHeight;
        
        // For image backgrounds, calculate proportional width
        if (cardElement.bg_type === 'image' && originalImageDimensions) {
            const newWidth = Math.round(newHeight * originalImageDimensions.aspectRatio);
            cardElement.width = newWidth;
            
            // Update width input field
            const widthInput = document.getElementById('card-width');
            if (widthInput) widthInput.value = newWidth;
        }
        
        updateCanvas();
        
        // Auto-adjust zoom if canvas is too big
        setTimeout(adjustZoomForCanvasSize, 100);
    });
    
    const zoomSelect = document.getElementById('canvas-zoom');
    if (zoomSelect) {
        zoomSelect.addEventListener('change', function() {
            canvasViewport.zoom = parseFloat(this.value);
            updateCanvasViewport();
        });
    }
    
    // Zoom button event listeners
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomFitBtn = document.getElementById('zoom-fit');
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function() {
            zoomIn();
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function() {
            zoomOut();
        });
    }
    
    if (zoomFitBtn) {
        zoomFitBtn.addEventListener('click', function() {
            zoomToFit();
        });
    }
    
    // Initialize canvas viewport system
    initCanvasPan();
    
    // Initialize zoom display
    updateZoomDisplay();
    
    document.getElementById('bg-type').addEventListener('change', function() {
        cardElement.bg_type = this.value;
        handleBackgroundTypeChange();
        handleTypeChange();
        
        // Reset original dimensions when changing away from image
        if (this.value !== 'image') {
            originalImageDimensions = null;
        }
        
        // Auto-resize canvas to image dimensions if switching to image type
        if (this.value === 'image' && cardElement.bg_image && cardElement.bg_image.trim() !== '') {
            autoResizeCanvasToImage(cardElement.bg_image);
        }
    });
    
    document.getElementById('bg-color').addEventListener('input', function() {
        cardElement.bg = this.value;
        updateCanvas();
    });
    
    document.getElementById('bg-image').addEventListener('input', function() {
        cardElement.bg_image = this.value;
        
        // Reset original dimensions when changing image
        originalImageDimensions = null;
        
        // Auto-resize canvas to image dimensions if image is provided
        if (cardElement.bg_type === 'image' && this.value.trim() !== '') {
            autoResizeCanvasToImage(this.value);
        } else {
            updateCanvas();
        }
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
    
    
    if (transparentSwitch && colorPicker && canvas) {
        transparentSwitch.addEventListener('change', function() {
            try {
                if (this.checked) {
                    // Enable transparent mode
                    canvas.classList.add('transparent');
                    colorPicker.disabled = true;
                    if (cardElement) {
                        cardElement.background = 'transparent';
                    }
                } else {
                    // Disable transparent mode
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
        try {
            if (transparentSwitch.checked) {
                canvas.classList.add('transparent');
                colorPicker.disabled = true;
                if (cardElement) {
                    cardElement.background = 'transparent';
                }
            } else {
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
        const layersList = document.getElementById('layers-list');
        if (!layersList) {
            console.error('layers-list element not found!');
            return;
        }
        
        layersList.innerHTML = '';
        
        // Show "no elements" message if canvas is empty
        if (elements.length === 0) {
            layersList.innerHTML = '<div class="no-layers">No elements added yet</div>';
            updateCanvasStatus();
            return;
        }
        
    
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
        }
    });
    
    // Add element layers (sorted by layer number)
    const sortedElements = [...elements].sort((a, b) => a.layer - b.layer);
    sortedElements.forEach(element => {
        const layerItem = document.createElement('div');
        layerItem.className = 'layer-item';
        
        const layerNumber = element.layer || 1;
        const elementDetails = window.getElementDetails ? window.getElementDetails(element) : `Layer: ${element.layer || 1}`;
        
        
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
        try {
            updateLayersPanel();
        } catch (error) {
            console.error('Error in updateLayersPanel:', error);
        }
    }
}

// Make functions globally available
window.switchTab = switchTab;
window.updateLayersPanel = updateLayersPanel;
window.toggleTemplatesExpanded = toggleTemplatesExpanded;

// Template Management
function loadTemplate(templateName) {
    const template = TEMPLATES[templateName];
    if (!template) {
        showToast('Template not found!', 'error');
        return;
    }
    
    // Mark templates as read when any template is used
    markTemplatesAsRead();
    
    // Check if template would exceed any limits
    const elementTypes = ['text', 'image', 'discord_profile', 'roblox_profile', 'progressbar'];
    
    for (const elementType of elementTypes) {
        const canvasCount = elements.filter(el => el.type === elementType).length;
        const templateCount = template.elements.filter(el => el.type === elementType).length;
        const totalCount = canvasCount + templateCount;
        
        if (totalCount > LIMITS[elementType]) {
            const elementName = elementType === 'discord_profile' ? 'Discord profiles' :
                              elementType === 'roblox_profile' ? 'Roblox profiles' :
                              elementType === 'progressbar' ? 'progress bars' :
                              elementType + 's';
            showToast(`Template would exceed ${elementName} limit! Maximum ${LIMITS[elementType]} ${elementName} allowed.`, 'warning');
            return;
        }
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
    
    // Auto-select all added elements except images (backgrounds)
    const addedElements = elements.slice(existingElementsCount);
    const nonImageElements = addedElements.filter(el => el.type !== 'image');
    
    if (nonImageElements.length > 0) {
        // Select all non-image elements for easy repositioning
        selectedElements = nonImageElements.map(el => el.id);
        selectedElement = selectedElements[0]; // Set primary selection
        updateCanvas();
        updateElementProperties();
        showToast(`Added ${template.name} template! (+${addedCount} elements) - All elements selected for easy repositioning!`, 'success');
    } else {
        showToast(`Added ${template.name} template! (+${addedCount} elements)`, 'success');
    }
}

// Update template button states based on progressbar availability
function updateTemplateButtons() {
    const canvasProgressbarCount = elements.filter(el => el.type === 'progressbar').length;
    
    // Templates that contain progressbar
    const progressbarTemplates = ['level', 'achievement', 'progress_card', 'level_up', 'discord_card', 'gaming_profile', 'cyberpunk_card', 'glassmorphism_card', 'retro_wave_card', 'glassmorphism_advanced', 'gaming_stats', 'achievement_progress', 'professional_skills', 'character_stats'];
    
    progressbarTemplates.forEach(templateName => {
        const button = document.querySelector(`[onclick="loadTemplate('${templateName}')"]`);
        if (button) {
            const template = TEMPLATES[templateName];
            const templateProgressbarCount = template ? template.elements.filter(el => el.type === 'progressbar').length : 0;
            
            if (canvasProgressbarCount + templateProgressbarCount > LIMITS.progressbar) {
                button.disabled = true;
                button.style.opacity = '0.5';
                button.title = `Disabled: Would exceed progress bar limit (${LIMITS.progressbar} max)`;
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

// Toggle templates expanded state
function toggleTemplatesExpanded() {
    const templatesGrid = document.getElementById('templates-grid');
    const moreBtn = document.getElementById('templates-more-btn');
    const moreText = moreBtn.querySelector('.templates-more-text');
    const moreIcon = moreBtn.querySelector('.templates-more-icon');
    
    if (templatesGrid.classList.contains('expanded')) {
        // Collapse
        templatesGrid.classList.remove('expanded');
        moreText.textContent = 'Show More';
        moreIcon.setAttribute('data-lucide', 'chevron-down');
        moreBtn.classList.remove('expanded');
    } else {
        // Expand
        templatesGrid.classList.add('expanded');
        moreText.textContent = 'Show Less';
        moreIcon.setAttribute('data-lucide', 'chevron-up');
        moreBtn.classList.add('expanded');
    }
    
    // Re-initialize Lucide icons
    lucide.createIcons();
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

// Store original image dimensions for proportional resizing
let originalImageDimensions = null;

// Canvas viewport system
let canvasViewport = {
    zoom: 0.75,
    panX: 0,
    panY: 0,
    isPanning: false,
    startX: 0,
    startY: 0
};

// Make canvasViewport globally accessible
window.canvasViewport = canvasViewport;

// Toast management
let currentToast = null;
let toastTimeout = null;

// Auto-resize canvas to match image dimensions
function autoResizeCanvasToImage(imageUrl) {
    const img = new Image();
    img.onload = function() {
        // Get natural dimensions of the image
        const imageWidth = img.naturalWidth;
        const imageHeight = img.naturalHeight;
        
        // Store original dimensions for proportional resizing
        originalImageDimensions = {
            width: imageWidth,
            height: imageHeight,
            aspectRatio: imageWidth / imageHeight
        };
        
        // Update canvas dimensions to match image
        cardElement.width = imageWidth;
        cardElement.height = imageHeight;
        
        // Update input fields
        const widthInput = document.getElementById('card-width');
        const heightInput = document.getElementById('card-height');
        if (widthInput) widthInput.value = imageWidth;
        if (heightInput) heightInput.value = imageHeight;
        
        // Update canvas and adjust zoom
        updateCanvas();
        setTimeout(adjustZoomForCanvasSize, 100);
        
        showToast(`Canvas resized to image dimensions: ${imageWidth}x${imageHeight}`, 'success');
    };
    img.onerror = function() {
        showToast('Failed to load image for auto-resize', 'warning');
        updateCanvas();
    };
    img.src = imageUrl;
}

// Calculate proportional height for image backgrounds
function calculateProportionalHeight(newWidth) {
    if (originalImageDimensions && cardElement.bg_type === 'image') {
        return Math.round(newWidth / originalImageDimensions.aspectRatio);
    }
    return cardElement.height; // Return current height if not image background
}

// Canvas viewport functions
function updateCanvasViewport() {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    
    const transform = `translate(${canvasViewport.panX}px, ${canvasViewport.panY}px) scale(${canvasViewport.zoom})`;
    canvas.style.transform = transform;
    canvas.style.transformOrigin = '0 0';
    
    // Update scroll bars based on zoom level
    const viewport = document.getElementById('canvas-viewport');
    if (viewport) {
        if (canvasViewport.zoom > 1.5) {
            viewport.style.overflow = 'auto';
        } else {
            viewport.style.overflow = 'hidden';
        }
    }
}

function zoomIn() {
    const zoomSelect = document.getElementById('canvas-zoom');
    const zoomLevels = Array.from(zoomSelect.options).map(option => parseFloat(option.value));
    const currentIndex = zoomLevels.indexOf(canvasViewport.zoom);
    
    if (currentIndex < zoomLevels.length - 1) {
        canvasViewport.zoom = zoomLevels[currentIndex + 1];
        updateCanvasViewport();
        updateZoomSelect();
        updateZoomDisplay();
    }
}

function zoomOut() {
    const zoomSelect = document.getElementById('canvas-zoom');
    const zoomLevels = Array.from(zoomSelect.options).map(option => parseFloat(option.value));
    const currentIndex = zoomLevels.indexOf(canvasViewport.zoom);
    
    if (currentIndex > 0) {
        canvasViewport.zoom = zoomLevels[currentIndex - 1];
        updateCanvasViewport();
        updateZoomSelect();
        updateZoomDisplay();
    }
}

function zoomToFit() {
    const viewport = document.getElementById('canvas-viewport');
    const canvas = document.getElementById('canvas');
    
    if (!viewport || !canvas) return;
    
    const containerWidth = viewport.clientWidth;
    const containerHeight = viewport.clientHeight;
    const cardWidth = cardElement.width;
    const cardHeight = cardElement.height;
    
    // Calculate zoom to fit both width and height with some padding
    const padding = 20; // 20px padding on each side
    const availableWidth = containerWidth - (padding * 2);
    const availableHeight = containerHeight - (padding * 2);
    
    const zoomX = availableWidth / cardWidth;
    const zoomY = availableHeight / cardHeight;
    const fitZoom = Math.min(zoomX, zoomY, 1.0); // Cap at 100% for fit
    
    // Center the canvas
    canvasViewport.zoom = fitZoom;
    canvasViewport.panX = (containerWidth - cardWidth * fitZoom) / 2;
    canvasViewport.panY = (containerHeight - cardHeight * fitZoom) / 2;
    
    updateCanvasViewport();
    updateZoomSelect();
    updateZoomDisplay();
    showToast(`Zoom to fit: ${Math.round(fitZoom * 100)}%`, 'success');
}

function updateZoomSelect() {
    const zoomSelect = document.getElementById('canvas-zoom');
    if (zoomSelect) {
        const currentZoom = canvasViewport.zoom;
        
        // Check if current zoom matches any existing option
        const exactMatch = Array.from(zoomSelect.options).find(option => 
            Math.abs(parseFloat(option.value) - currentZoom) < 0.01
        );
        
        if (exactMatch) {
            zoomSelect.value = exactMatch.value;
        } else {
            // Find closest existing option
            const options = Array.from(zoomSelect.options);
            const closestOption = options.reduce((prev, curr) => {
                const prevDiff = Math.abs(parseFloat(prev.value) - currentZoom);
                const currDiff = Math.abs(parseFloat(curr.value) - currentZoom);
                return currDiff < prevDiff ? curr : prev;
            });
            zoomSelect.value = closestOption.value;
        }
    }
}

function updateZoomDisplay() {
    const zoomDisplay = document.getElementById('zoom-display');
    if (zoomDisplay) {
        zoomDisplay.textContent = Math.round(canvasViewport.zoom * 100) + '%';
    }
}

function initCanvasPan() {
    const viewport = document.getElementById('canvas-viewport');
    if (!viewport) return;
    
    // Mouse events for panning and drag select
    viewport.addEventListener('mousedown', function(e) {
        if (e.button === 0) { // Left mouse button
            // Check if clicking on empty canvas area for drag select (only with Shift)
            if (e.shiftKey && (e.target.id === 'canvas' || e.target.classList.contains('canvas-viewport'))) {
                // Start drag select if not clicking on an element
                if (!e.target.classList.contains('element')) {
                    startDragSelect(e);
                    return;
                }
            }
            
            // Regular panning (without Shift)
            if (!e.shiftKey) {
                canvasViewport.isPanning = true;
                canvasViewport.startX = e.clientX - canvasViewport.panX;
                canvasViewport.startY = e.clientY - canvasViewport.panY;
                viewport.style.cursor = 'grabbing';
            }
        } else if (e.button === 1) { // Middle mouse button
            // Middle mouse panning
            canvasViewport.isPanning = true;
            canvasViewport.startX = e.clientX - canvasViewport.panX;
            canvasViewport.startY = e.clientY - canvasViewport.panY;
            viewport.style.cursor = 'grabbing';
            e.preventDefault(); // Prevent middle mouse scroll
        }
    });
    
    document.addEventListener('mousemove', function(e) {
        if (canvasViewport.isPanning) {
            canvasViewport.panX = e.clientX - canvasViewport.startX;
            canvasViewport.panY = e.clientY - canvasViewport.startY;
            updateCanvasViewport();
        }
    });
    
    document.addEventListener('mouseup', function(e) {
        if (canvasViewport.isPanning) {
            canvasViewport.isPanning = false;
            viewport.style.cursor = 'grab';
        }
    });
    
    // Prevent middle mouse scroll
    viewport.addEventListener('auxclick', function(e) {
        if (e.button === 1) { // Middle mouse button
            e.preventDefault();
        }
    });
    
    // Scroll wheel zoom
    viewport.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        // Get zoom levels from HTML select options
        const zoomSelect = document.getElementById('canvas-zoom');
        const zoomLevels = Array.from(zoomSelect.options).map(option => parseFloat(option.value));
        const currentIndex = zoomLevels.indexOf(canvasViewport.zoom);
        
        let newZoom;
        if (e.deltaY < 0) {
            // Zoom in
            if (currentIndex < zoomLevels.length - 1) {
                newZoom = zoomLevels[currentIndex + 1];
            } else {
                return; // Already at max zoom
            }
        } else {
            // Zoom out
            if (currentIndex > 0) {
                newZoom = zoomLevels[currentIndex - 1];
            } else {
                return; // Already at min zoom
            }
        }
        
        // Zoom to mouse position
        const rect = viewport.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const zoomRatio = newZoom / canvasViewport.zoom;
        canvasViewport.panX = mouseX - (mouseX - canvasViewport.panX) * zoomRatio;
        canvasViewport.panY = mouseY - (mouseY - canvasViewport.panY) * zoomRatio;
        
        canvasViewport.zoom = newZoom;
        updateCanvasViewport();
        updateZoomSelect();
        updateZoomDisplay();
    });
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
    
    // Set canvas size (actual size, not zoomed)
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.style.maxWidth = 'none';
    canvas.style.maxHeight = 'none';
    
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
    
    // Render elements (no zoom scaling)
    const sortedElements = [...elements].sort((a, b) => a.layer - b.layer);
    sortedElements.forEach(element => {
        const elementDiv = createElementDiv(element, 1); // No zoom scaling
        canvas.appendChild(elementDiv);
    });
    
    // Add multi-select border if multiple elements are selected
    if (selectedElements.length > 1) {
        addMultiSelectBorder(canvas, 1); // No zoom scaling
    }
    
    updateLayersPanel();
    updateCanvasStatus();
    ensureResizeHandle();
    updateElementVisualState();
    
    // Apply viewport transform
    updateCanvasViewport();
    
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
    
    // Debug: log counts
    
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
                    return {
                        id: String(element.id),
                        type: element.type,
                        url: variablesMode && element.imageUrlVariable ? element.imageUrlVariable : element.imageUrl,
                        transparency: variablesMode && element.opacityVariable ? element.opacityVariable : String(element.opacity),
                        layer: variablesMode && element.layerVariable ? element.layerVariable : String(element.layer),
                        border_radius: variablesMode && element.borderRadiusVariable ? element.borderRadiusVariable : String(element.borderRadius || 1),
                        position: {
                            x: variablesMode && element.xVariable ? element.xVariable : Number(element.x),
                            y: variablesMode && element.yVariable ? element.yVariable : Number(element.y)
                        },
                        size: {
                            width: element.widthAuto || element.width === 'auto' ? 'auto' : (variablesMode && element.widthVariable ? element.widthVariable : Number(element.width)),
                            height: element.heightAuto || element.height === 'auto' ? 'auto' : (variablesMode && element.heightVariable ? element.heightVariable : Number(element.height))
                        }
                    };
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
                            width: element.widthAuto || element.width === 'auto' ? 'auto' : (variablesMode && element.widthVariable ? element.widthVariable : Number(element.width)),
                            height: element.heightAuto || element.height === 'auto' ? 'auto' : (variablesMode && element.heightVariable ? element.heightVariable : Number(element.height))
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
                            width: element.widthAuto || element.width === 'auto' ? 'auto' : Number(element.width),
                            height: element.heightAuto || element.height === 'auto' ? 'auto' : Number(element.height)
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
        // Deselect all elements first (so analytics preview has no selection)
        deselectAllElements();
        // Wait a bit for UI to update, then send analytics
        setTimeout(() => {
            sendActionAnalytics('copied');
        }, 100);
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
                return {
                    id: String(element.id),
                    type: element.type,
                    url: element.imageUrlVariable || element.imageUrl,
                    transparency: element.opacityVariable || String(element.opacity),
                    layer: element.layerVariable || String(element.layer),
                    border_radius: element.borderRadiusVariable || String(element.borderRadius || 1),
                    position: {
                        x: element.xVariable || Number(element.x),
                        y: element.yVariable || Number(element.y)
                    },
                    size: {
                        width: element.widthAuto || element.width === 'auto' ? 'auto' : (element.widthVariable || Number(element.width)),
                        height: element.heightAuto || element.height === 'auto' ? 'auto' : (element.heightVariable || Number(element.height))
                    }
                };
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
                        width: element.widthAuto || element.width === 'auto' ? 'auto' : (element.widthVariable || Number(element.width)),
                        height: element.heightAuto || element.height === 'auto' ? 'auto' : (element.heightVariable || Number(element.height))
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
                        width: element.widthAuto || element.width === 'auto' ? 'auto' : Number(element.width),
                        height: element.heightAuto || element.height === 'auto' ? 'auto' : Number(element.height)
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
    // Deselect all elements first (so analytics preview has no selection)
    deselectAllElements();
    // Wait a bit for UI to update, then send analytics
    setTimeout(() => {
        sendActionAnalytics('downloaded');
    }, 100);
}

// Modal Management
// JSON is now automatically updated in sidebar - no modal needed

// Badge tracking system
const BADGE_VERSION = '1.1'; // Increment this when adding new features (updated for custom templates)
const STORAGE_KEY = 'cookie-card-builder-badges';

// Get badge data from localStorage
function getBadgeData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : { 
            version: '', 
            readNews: [], 
            readHelp: false, 
            readTemplates: false 
        };
    } catch (e) {
        return { version: '', readNews: [], readHelp: false, readTemplates: false };
    }
}

// Mark news as read
function markNewsAsRead(newsId) {
    const data = getBadgeData();
    if (!data.readNews.includes(newsId)) {
        data.readNews.push(newsId);
        data.version = BADGE_VERSION;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        updateAllBadges();
    }
}

// Mark help as read
function markHelpAsRead() {
    const data = getBadgeData();
    data.readHelp = true;
    data.version = BADGE_VERSION;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    updateAllBadges();
}

// Mark templates as read
function markTemplatesAsRead() {
    const data = getBadgeData();
    data.readTemplates = true;
    data.version = BADGE_VERSION;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    updateAllBadges();
}

// Check if there are unread news
function hasUnreadNews() {
    const data = getBadgeData();
    const allNewsIds = Object.keys(NEWS_DATA);
    const unreadNews = allNewsIds.filter(id => !data.readNews.includes(id));
    return unreadNews.length > 0;
}

// Check if help is unread
function hasUnreadHelp() {
    const data = getBadgeData();
    return !data.readHelp;
}

// Check if templates are unread
function hasUnreadTemplates() {
    const data = getBadgeData();
    return !data.readTemplates;
}

// Update all badges visibility
function updateAllBadges() {
    // News badge with count
    const newsBadge = document.getElementById('news-badge');
    const unreadNewsCount = getUnreadNewsCount();
    if (unreadNewsCount > 0) {
        // Show count, but limit display for very large numbers
        if (unreadNewsCount > 9) {
            newsBadge.textContent = '9+';
            newsBadge.classList.add('large-count');
        } else {
            newsBadge.textContent = unreadNewsCount;
            newsBadge.classList.remove('large-count');
        }
        newsBadge.setAttribute('data-count', unreadNewsCount);
        newsBadge.style.display = 'flex';
    } else {
        newsBadge.style.display = 'none';
        newsBadge.classList.remove('large-count');
    }
    
    // Help badge
    const helpBadge = document.getElementById('help-badge');
    if (hasUnreadHelp()) {
        helpBadge.style.display = 'flex';
    } else {
        helpBadge.style.display = 'none';
    }
    
    // Templates badge
    const templatesBadge = document.getElementById('templates-badge');
    if (hasUnreadTemplates()) {
        templatesBadge.style.display = 'inline-flex';
    } else {
        templatesBadge.style.display = 'none';
    }
    
    // Update individual news item badges
    updateNewsItemBadges();
}

function getUnreadNewsCount() {
    const data = getBadgeData();
    const allNewsIds = Object.keys(NEWS_DATA);
    const unreadNews = allNewsIds.filter(newsId => !data.readNews.includes(newsId));
    return unreadNews.length;
}

// Update individual news item badges
function updateNewsItemBadges() {
    const data = getBadgeData();
    const allNewsIds = Object.keys(NEWS_DATA);
    
    allNewsIds.forEach(newsId => {
        const badge = document.getElementById(`news-item-badge-${newsId}`);
        if (badge) {
            if (data.readNews.includes(newsId)) {
                badge.style.display = 'none';
            } else {
                badge.style.display = 'inline-block';
            }
        }
    });
}

// News data
const NEWS_DATA = {
    'duplicate-elements': {
        title: '📋 Duplicate Elements',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>📋 Duplicate Elements</h3>
                <p>New duplication feature makes it easy to create repeated designs and lists:</p>
                <ul>
                    <li><strong>Quick Duplicate:</strong> Press Ctrl/Cmd + D to duplicate selected element(s)</li>
                    <li><strong>Duplicate Button:</strong> Click the duplicate icon in Quick Actions toolbar when element is selected</li>
                    <li><strong>Single & Multi:</strong> Duplicate one element or multiple selected elements at once</li>
                    <li><strong>Smart Positioning:</strong> Duplicated elements are automatically offset by 20px for easy visibility</li>
                    <li><strong>Auto-Selection:</strong> All duplicated elements are automatically selected for immediate editing</li>
                    <li><strong>Perfect for Lists:</strong> Ideal for creating user lists, repeated patterns, and consistent layouts</li>
                </ul>
                <p>Select any element(s) and press Ctrl+D or click the duplicate button to try it out!</p>
            </div>
        `
    },
    'global-analytics-counters': {
        title: '📊 Global Usage Statistics',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>📊 Global Usage Statistics</h3>
                <p>New statistics widget in the header shows real-time usage across all users:</p>
                <ul>
                    <li><strong>Total Templates:</strong> See how many templates have been saved globally</li>
                    <li><strong>Total Copies:</strong> Track how many times cards were copied to clipboard</li>
                    <li><strong>Total Downloads:</strong> View how many cards were downloaded as JSON files</li>
                    <li><strong>Real-Time Updates:</strong> Statistics update automatically as users interact with the builder</li>
                    <li><strong>Community Insights:</strong> Get a sense of how popular the card builder is!</li>
                </ul>
                <p>Check the header widget to see the global statistics!</p>
            </div>
        `
    },
    'template-management': {
        title: '🔍 Enhanced Template Management',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>🔍 Enhanced Template Management</h3>
                <p>We've completely redesigned the template management system for a much better experience:</p>
                <ul>
                    <li><strong>Search Functionality:</strong> Quickly find templates by name or element types</li>
                    <li><strong>Show More/Less:</strong> Collapsible template sections to save space</li>
                    <li><strong>Better Previews:</strong> Larger, clearer template previews in the sidebar</li>
                    <li><strong>Improved Layout:</strong> Template cards now show name above preview for better visibility</li>
                    <li><strong>Click to Open:</strong> Click any template card to open a preview modal with load/delete options</li>
                </ul>
                <p>Managing your templates is now much more intuitive and efficient!</p>
            </div>
        `
    },
    'smart-template-saving': {
        title: '🎯 Smart Template Saving',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>🎯 Smart Template Saving</h3>
                <p>Template saving is now smarter and more user-friendly:</p>
                <ul>
                    <li><strong>Auto-Deselect:</strong> All elements are automatically deselected when saving templates</li>
                    <li><strong>Cleaner View:</strong> No more manual deselection needed for a clean save</li>
                    <li><strong>Better Focus:</strong> You can focus on naming your template without distractions</li>
                    <li><strong>Improved UX:</strong> Smoother workflow when creating multiple templates</li>
                </ul>
                <p>Save templates faster and with a cleaner interface!</p>
            </div>
        `
    },
    'lock-elements': {
        title: '🔒 Lock Elements Feature',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>🔒 Lock Elements Feature</h3>
                <p>New lock functionality to prevent accidental element movement:</p>
                <ul>
                    <li><strong>Lock Button:</strong> Lock/unlock button appears in quick actions when element is selected</li>
                    <li><strong>Visual Indicators:</strong> Locked elements show blue dashed border and lock icon</li>
                    <li><strong>Smart Behavior:</strong> Locked elements can't be dragged but can still be edited</li>
                    <li><strong>Multi-Selection:</strong> Locked elements are excluded from multi-selection</li>
                    <li><strong>Easy Toggle:</strong> Click the lock button to quickly lock/unlock elements</li>
                </ul>
                <p>Perfect for protecting important elements while still allowing parameter editing!</p>
            </div>
        `
    },
    'custom-templates': {
        title: '💾 Save Custom Templates',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>💾 Save Custom Templates</h3>
                <p>You can now save your canvas designs as reusable custom templates!</p>
                <ul>
                    <li><strong>Save Templates:</strong> Click the save icon (💾) in the "My Templates" section to save your current canvas</li>
                    <li><strong>Local Storage:</strong> Templates are saved in your browser and persist across sessions</li>
                    <li><strong>Load Anytime:</strong> Click the folder icon (📂) to load a saved template instantly</li>
                    <li><strong>Easy Management:</strong> Delete unwanted templates with the trash icon (🗑️)</li>
                    <li><strong>Complete Saves:</strong> Saves all elements, canvas size, and background settings</li>
                </ul>
                <p>Perfect for creating consistent card designs and reusing your favorite layouts!</p>
            </div>
        `
    },
    'collapsible-templates': {
        title: '📋 Collapsible Templates Section',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>📋 Collapsible Templates Section</h3>
                <p>We've made the templates section much more compact and user-friendly:</p>
                <ul>
                    <li><strong>Space Saving:</strong> Templates section now shows only 4 templates initially (2 rows)</li>
                    <li><strong>Show More Button:</strong> Click "Show More" to expand and see all templates</li>
                    <li><strong>Smooth Animation:</strong> Smooth expand/collapse transition with rotating arrow icon</li>
                    <li><strong>Better Layout:</strong> Sidebar no longer takes up too much space</li>
                    <li><strong>Improved UX:</strong> Users can quickly access common templates without scrolling</li>
                </ul>
                <p>Now the sidebar is much cleaner and templates are easier to navigate!</p>
            </div>
        `
    },
    'zoom-fixes': {
        title: '🔧 Zoom System Fixes & Improvements',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>🔧 Zoom System Fixes & Improvements</h3>
                <p>We've fixed several important issues with the zoom system to make it work perfectly:</p>
                <ul>
                    <li><strong>All Zoom Levels:</strong> Fixed zoom levels above 150% (200%, 300%, 400%, 500%) now work correctly</li>
                    <li><strong>Scroll Wheel Sync:</strong> Scroll wheel zoom now uses the same levels as the dropdown menu</li>
                    <li><strong>Fit to Screen:</strong> Improved fit-to-screen with proper 20px padding for better visibility</li>
                    <li><strong>Zoom Display:</strong> Live zoom percentage now shows the correct value at all levels</li>
                    <li><strong>Dropdown Sync:</strong> Zoom dropdown always shows the current zoom level accurately</li>
                </ul>
                <p>Now you can zoom from 25% to 500% smoothly with scroll wheel, buttons, or dropdown - everything stays perfectly synchronized!</p>
            </div>
        `
    },
    'cyberpunk': {
        title: '🎨 New Cyberpunk Template',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>🎨 New Cyberpunk Template</h3>
                <p>We've added a stunning cyberpunk template that brings the futuristic aesthetic to your cards! This template features:</p>
                <ul>
                    <li><strong>Rajdhani Font:</strong> Authentic cyberpunk typography for that tech-noir feel</li>
                    <li><strong>Neon Colors:</strong> Electric cyan and magenta accents</li>
                    <li><strong>Futuristic Layout:</strong> Perfect for gaming profiles and tech-themed cards</li>
                    <li><strong>Progress Bars:</strong> System integrity indicators with cyberpunk styling</li>
                </ul>
                <p>Perfect for Discord bots, gaming communities, and anyone who loves the cyberpunk aesthetic!</p>
            </div>
        `
    },
    'properties': {
        title: '⚡ Improved Card Properties',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>⚡ Improved Card Properties</h3>
                <p>We've completely redesigned the card properties section for a much better user experience:</p>
                <ul>
                    <li><strong>Vertical Layout:</strong> Labels now appear above controls, just like quick actions</li>
                    <li><strong>Better Organization:</strong> All properties in one clean row</li>
                    <li><strong>Consistent Design:</strong> Matches the rest of the interface perfectly</li>
                    <li><strong>Improved Usability:</strong> Much easier to find and use controls</li>
                </ul>
                <p>This makes the interface more intuitive and professional-looking!</p>
            </div>
        `
    },
    'ui': {
        title: '🔧 Enhanced UI Layout',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>🔧 Enhanced UI Layout</h3>
                <p>We've made several improvements to the overall user interface:</p>
                <ul>
                    <li><strong>Fixed Alignment:</strong> All elements now properly aligned</li>
                    <li><strong>Consistent Spacing:</strong> Better visual hierarchy throughout</li>
                    <li><strong>Improved Navigation:</strong> News dropdown for better information access</li>
                    <li><strong>Better Mobile Support:</strong> Enhanced responsive design</li>
                </ul>
                <p>These changes make the entire application feel more polished and professional!</p>
            </div>
        `
    },
    'new-templates': {
        title: '🎮 New Multi-Progress Templates',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>🎮 New Multi-Progress Templates</h3>
                <p>We've added 4 amazing new templates that showcase the power of multiple progress bars:</p>
                <ul>
                    <li><strong>📊 Gaming Stats Dashboard:</strong> HP, Mana, XP, Stamina, Skills, Reputation (6 progress bars)</li>
                    <li><strong>🏆 Achievement Progress:</strong> Quests, Bosses, Items, Levels, Achievements (5 progress bars)</li>
                    <li><strong>💼 Professional Skills:</strong> Programming, Design, Marketing, Leadership, Communication (5 progress bars)</li>
                    <li><strong>⚔️ Character Stats:</strong> Strength, Agility, Intelligence, Charisma, Luck (5 progress bars)</li>
                </ul>
                <p><strong>✨ Auto-Selection Feature:</strong> When you add a template, all elements (except backgrounds) are automatically selected for easy repositioning!</p>
                <p>Perfect for creating detailed dashboards, skill assessments, and comprehensive data displays!</p>
            </div>
        `
    },
    'progress-bars-limit': {
        title: '📊 Increased Progress Bar Limit',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>📊 Increased Progress Bar Limit</h3>
                <p>Great news! Cookie API has increased the limit for progress bars, giving you much more flexibility:</p>
                <ul>
                    <li><strong>New Limit:</strong> 20 progress bars per card (increased from 1)</li>
                    <li><strong>More Creative Freedom:</strong> Create complex progress tracking systems</li>
                    <li><strong>Better Data Visualization:</strong> Show multiple metrics and statistics</li>
                    <li><strong>Enhanced Cards:</strong> More detailed and informative card designs</li>
                </ul>
                <p>Perfect for creating detailed user profiles, game statistics, or any multi-metric displays!</p>
            </div>
        `
    },
    'help-improvements': {
        title: '❓ Enhanced Help System',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>❓ Enhanced Help System</h3>
                <p>We've completely redesigned the Help section to make it much more user-friendly and organized:</p>
                <ul>
                    <li><strong>Sidebar Navigation:</strong> Quick jump to any section with organized categories</li>
                    <li><strong>8 Main Sections:</strong> Getting Started, Elements, Quick Actions, Canvas Controls, Properties, Mobile Usage, Shortcuts, Bot Config</li>
                    <li><strong>Smooth Scrolling:</strong> Click any section to instantly jump there</li>
                    <li><strong>Mobile Warning:</strong> Clear notice about mobile version development status</li>
                    <li><strong>Better Organization:</strong> Information is now logically grouped and easy to find</li>
                    <li><strong>Active States:</strong> Visual feedback showing which section you're currently viewing</li>
                </ul>
                <p>No more scrolling through long help text - find exactly what you need instantly!</p>
            </div>
        `
    },
    'zoom-pan-system': {
        title: '🔍 Professional Zoom & Pan System',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>🔍 Professional Zoom & Pan System</h3>
                <p>We've implemented a complete zoom and pan system that works just like professional graphic design software:</p>
                <ul>
                    <li><strong>Deep Zoom:</strong> Zoom from 25% to 500% for precise editing</li>
                    <li><strong>Pan & Drag:</strong> Click and drag to move around the canvas at any zoom level</li>
                    <li><strong>Zoom Controls:</strong> Dedicated zoom in/out buttons and dropdown selector</li>
                    <li><strong>Zoom to Fit:</strong> Instantly fit your entire card in view</li>
                    <li><strong>Live Zoom Display:</strong> See current zoom percentage in the top-left corner</li>
                    <li><strong>Scroll Wheel Zoom:</strong> Use mouse wheel to zoom in and out smoothly</li>
                </ul>
                <p>Perfect for detailed editing, precise positioning, and working with complex card designs!</p>
            </div>
        `
    },
    'canvas-image-handling': {
        title: '🖼️ Smart Canvas Image Handling',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>🖼️ Smart Canvas Image Handling</h3>
                <p>We've made canvas image handling much smarter and more intuitive:</p>
                <ul>
                    <li><strong>Auto-Resize:</strong> Canvas automatically resizes to match your background image dimensions</li>
                    <li><strong>Proportional Scaling:</strong> When you change canvas size with an image background, it scales proportionally</li>
                    <li><strong>Perfect Fit:</strong> No more cropping or stretching - images display exactly as intended</li>
                    <li><strong>Object-fit Fill:</strong> Canvas now uses fill mode for consistent image display</li>
                    <li><strong>Smart Detection:</strong> Automatically detects when you add a background image</li>
                </ul>
                <p>No more manual resizing - the canvas adapts perfectly to your background images!</p>
            </div>
        `
    },
    'drag-select-system': {
        title: '🖱️ Professional Drag & Select System',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>🖱️ Professional Drag & Select System</h3>
                <p>We've implemented a complete selection system that works just like professional graphic design software:</p>
                <ul>
                    <li><strong>Shift + Drag:</strong> Select multiple elements by dragging a selection box</li>
                    <li><strong>Shift + Click:</strong> Add/remove elements from selection</li>
                    <li><strong>Ctrl/Cmd + Click:</strong> Toggle individual elements in/out of selection</li>
                    <li><strong>Visual Feedback:</strong> Red dashed selection box shows exactly what you're selecting</li>
                    <li><strong>Smart Detection:</strong> Works perfectly with zoom and pan - no more missed selections!</li>
                    <li><strong>Multi-Selection Actions:</strong> Move, resize, or delete multiple elements at once</li>
                </ul>
                <p>Perfect for complex layouts, bulk editing, and professional workflow efficiency!</p>
            </div>
        `
    },
    'mobile-development-status': {
        title: '📱 Mobile Development Status Update',
        date: 'October 2025',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">October 2025</div>
                <h3>📱 Mobile Development Status Update</h3>
                <p>We want to be transparent about the current state of mobile support:</p>
                <ul>
                    <li><strong>Under Development:</strong> Mobile version is currently being built</li>
                    <li><strong>Limited Functionality:</strong> Some features may not work properly on mobile devices</li>
                    <li><strong>Touch Controls:</strong> We're working on better touch support for mobile users</li>
                    <li><strong>Responsive Design:</strong> Mobile-optimized interface is in progress</li>
                    <li><strong>Desktop Recommended:</strong> For best experience, use desktop or tablet</li>
                </ul>
                <p>We're committed to making the mobile experience as good as desktop - stay tuned for updates!</p>
            </div>
        `
    },
    'coming-soon': {
        title: '🚀 New Features Coming Soon',
        date: 'Coming Soon',
        content: `
            <div class="news-detail-item">
                <div class="news-detail-date">Coming Soon</div>
                <h3>🚀 New Features Coming Soon</h3>
                <p>We're working hard on exciting new features for the Cookie Card Builder:</p>
                <ul>
                    <li><strong>More Templates:</strong> Additional themed templates for different use cases</li>
                    <li><strong>Advanced Customization:</strong> More control over element styling and positioning</li>
                    <li><strong>Improved Mobile Experience:</strong> Better touch controls and responsive design</li>
                    <li><strong>Export Options:</strong> More formats and sharing options</li>
                    <li><strong>Collaboration Features:</strong> Share and collaborate on card designs</li>
                </ul>
                <p>Stay tuned for these amazing updates! We're constantly working to make the Card Builder even better.</p>
            </div>
        `
    }
};

function showNewsModal() {
    const modal = document.getElementById('news-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Update visual state of news items
    updateNewsItemsVisualState();
    
    // Update individual news item badges
    updateNewsItemBadges();
}

function updateNewsItemsVisualState() {
    const data = getBadgeData();
    const newsItems = document.querySelectorAll('.news-list-item');
    
    newsItems.forEach(item => {
        const newsId = item.getAttribute('onclick').match(/showNewsDetail\('([^']+)'\)/)[1];
        if (data.readNews.includes(newsId)) {
            item.style.opacity = '0.6';
            item.style.borderLeft = '3px solid #666';
        } else {
            item.style.opacity = '1';
            item.style.borderLeft = '3px solid var(--accent-color)';
        }
    });
}

function closeNewsModal() {
    const modal = document.getElementById('news-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showNewsDetail(newsId) {
    const newsData = NEWS_DATA[newsId];
    if (!newsData) return;
    
    // Mark news as read
    markNewsAsRead(newsId);
    
    // Close main news modal
    closeNewsModal();
    
    // Update detail modal content
    document.getElementById('news-detail-title').textContent = newsData.title;
    document.getElementById('news-detail-content').innerHTML = newsData.content;
    
    // Show detail modal
    const detailModal = document.getElementById('news-detail-modal');
    detailModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeNewsDetailModal() {
    const modal = document.getElementById('news-detail-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function backToNewsList() {
    // Close detail modal
    closeNewsDetailModal();
    
    // Show main news modal
    showNewsModal();
}

function scrollToHelpSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        // Update active nav link
        const navLinks = document.querySelectorAll('.help-nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        const activeLink = document.querySelector(`[onclick="scrollToHelpSection('${sectionId}')"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

function showHelpModal() {
    const modal = document.getElementById('help-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Mark help as read
    markHelpAsRead();
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
    // Clear existing toast and timeout
    if (currentToast) {
        currentToast.remove();
        currentToast = null;
    }
    if (toastTimeout) {
        clearTimeout(toastTimeout);
        toastTimeout = null;
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${getToastIcon(type)}</span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    currentToast = toast;
    
    toastTimeout = setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.remove();
        }
        currentToast = null;
        toastTimeout = null;
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
    
    // Update lock button state
    updateLockButtonState();
}

function updateLockButtonState() {
    const lockBtn = document.getElementById('lock-element-btn');
    const lockIcon = document.getElementById('lock-element-icon');
    const quickActionsGroup = document.getElementById('quick-actions-toolbar-group');
    
    if (!lockBtn || !lockIcon) return;
    
    if (selectedElement && selectedElement !== 'card') {
        const element = elements.find(e => e.id === selectedElement);
        if (element) {
            // Show quick actions group
            if (quickActionsGroup) {
                quickActionsGroup.classList.remove('hidden');
            }
            
            if (element.locked) {
                lockBtn.classList.add('active');
                lockIcon.setAttribute('data-lucide', 'lock');
            } else {
                lockBtn.classList.remove('active');
                lockIcon.setAttribute('data-lucide', 'unlock');
            }
        } else {
            // Hide quick actions group
            if (quickActionsGroup) {
                quickActionsGroup.classList.add('hidden');
            }
        }
    } else {
        // Hide quick actions group when no element selected
        if (quickActionsGroup) {
            quickActionsGroup.classList.add('hidden');
        }
    }
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function duplicateElement() {
    // Handle multi-selection
    if (selectedElements && selectedElements.length > 0) {
        const newIds = [];
        let idCounter = 0;
        
        selectedElements.forEach(elementId => {
            const element = elements.find(e => e.id === elementId);
            if (!element) return;
            
            // Create a deep copy of the element
            const duplicate = JSON.parse(JSON.stringify(element));
            
            // Generate new unique ID
            duplicate.id = Date.now() + idCounter++;
            
            // Offset position slightly so it's visible
            duplicate.x = (duplicate.x || 0) + 20;
            duplicate.y = (duplicate.y || 0) + 20;
            
            // Remove locked state from duplicate
            duplicate.locked = false;
            
            // Add to elements array
            elements.push(duplicate);
            newIds.push(duplicate.id);
        });
        
        // Refresh canvas and UI
        updateCanvas();
        updateQuotas();
        updateJSON();
        updateCanvasStatus();
        
        // Select all new duplicates
        selectedElements = [...newIds];
        selectedElement = null;
        
        // Trigger canvas update to show selection
        updateCanvas();
        
        showToast(`${newIds.length} elements duplicated! 📋`, 'success');
        return;
    }
    
    // Handle single selection
    if (!selectedElement || selectedElement === 'card') {
        showToast('Please select an element to duplicate!', 'warning');
        return;
    }
    
    const element = elements.find(e => e.id === selectedElement);
    if (!element) {
        showToast('Element not found!', 'error');
        return;
    }
    
    // Create a deep copy of the element
    const duplicate = JSON.parse(JSON.stringify(element));
    
    // Generate new ID
    duplicate.id = Date.now();
    
    // Offset position slightly so it's visible
    duplicate.x = (duplicate.x || 0) + 20;
    duplicate.y = (duplicate.y || 0) + 20;
    
    // Remove locked state from duplicate
    duplicate.locked = false;
    
    // Add to elements array
    elements.push(duplicate);
    
    // Refresh canvas and UI
    updateCanvas();
    updateQuotas();
    updateJSON();
    updateCanvasStatus();
    
    // Select the new element
    selectElement(duplicate.id);
    
    showToast('Element duplicated! 📋', 'success');
}

function toggleElementLock() {
    if (!selectedElement || selectedElement === 'card') {
        showToast('Please select an element to lock/unlock!', 'warning');
        return;
    }
    
    const element = elements.find(e => e.id === selectedElement);
    if (!element) {
        showToast('Element not found!', 'error');
        return;
    }
    
    // Toggle lock state
    element.locked = !element.locked;
    
    // Update visual state
    updateLockButtonState();
    updateElementVisualState();
    
    // Show feedback
    const action = element.locked ? 'locked' : 'unlocked';
    showToast(`Element ${action}! 🔒`, 'success');
}

function updateElementVisualState() {
    // Update all element visual states
    elements.forEach(element => {
        const elementDiv = document.querySelector(`[data-id="${element.id}"]`);
        if (elementDiv) {
            if (element.locked) {
                elementDiv.classList.add('locked');
                // Don't set opacity via JavaScript - let CSS handle it
            } else {
                elementDiv.classList.remove('locked');
                elementDiv.style.opacity = ''; // Reset to default
            }
        }
    });
}

// Custom templates management
const CUSTOM_TEMPLATES_KEY = 'cookie-card-custom-templates';
const ANALYTICS_KEY = 'template-analytics-data';
const ACTION_ANALYTICS_KEY = 'action-analytics-data';

function getCustomTemplates() {
    try {
        return JSON.parse(localStorage.getItem(CUSTOM_TEMPLATES_KEY) || '{}');
    } catch (error) {
        console.error('Error loading custom templates:', error);
        return {};
    }
}

async function saveCustomTemplate(templateName) {
    if (!templateName || templateName.trim() === '') {
        showToast('Please enter a template name', 'error');
        return;
    }

    const templates = getCustomTemplates();
    
    // Check if template name already exists
    if (templates[templateName]) {
        if (!confirm(`Template "${templateName}" already exists. Overwrite?`)) {
            return;
        }
    }

    // Generate preview
    const canvas = document.getElementById('canvas');
    let previewImage = null;
    
    try {
        if (typeof html2canvas !== 'undefined') {
            const canvasCapture = await html2canvas(canvas, {
                backgroundColor: null, // Transparent background for thumbnails
                scale: 1.0, // Use 1:1 scale to match canvas exactly
                logging: false,
                useCORS: true,
                allowTaint: true
            });
            previewImage = canvasCapture.toDataURL('image/png', 1.0); // PNG for better quality
        } else {
        }
    } catch (e) {
    }

    // Save template
    const templateData = {
        elements: elements.map(el => ({...el})), // Deep copy elements
        canvasSize: {
            width: cardElement.width,
            height: cardElement.height,
            bg: cardElement.bg,
            bg_type: cardElement.bg_type,
            bg_image: cardElement.bg_image,
            bg_transparent: cardElement.bg_transparent
        },
        preview: previewImage
    };

    templates[templateName] = templateData;
    localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(templates));

    // Send analytics (async)
    await sendTemplateAnalytics(templateName, templateData);

    showToast(`Template "${templateName}" saved!`, 'success');
    updateCustomTemplatesUI();
    
    // Close save modal if exists
    const modal = document.getElementById('save-template-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function deleteCustomTemplate(templateName) {
    const templates = getCustomTemplates();
    delete templates[templateName];
    localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(templates));
    
    showToast(`Template "${templateName}" deleted`, 'info');
    updateCustomTemplatesUI();
}

function loadCustomTemplate(templateName) {
    const templates = getCustomTemplates();
    const template = templates[templateName];

    if (!template) {
        showToast('Template not found', 'error');
        return;
    }

    // Clear current elements
    elements = [];
    document.getElementById('canvas').innerHTML = '';

    // Load canvas settings
    cardElement.width = template.canvasSize.width;
    cardElement.height = template.canvasSize.height;
    cardElement.bg = template.canvasSize.bg;
    cardElement.bg_type = template.canvasSize.bg_type;
    cardElement.bg_image = template.canvasSize.bg_image || '';
    cardElement.bg_transparent = template.canvasSize.bg_transparent || false;

    // Update canvas inputs
    document.getElementById('card-width').value = cardElement.width;
    document.getElementById('card-height').value = cardElement.height;
    document.getElementById('bg-type').value = cardElement.bg_type;
    document.getElementById('bg-color').value = cardElement.bg;
    document.getElementById('bg-transparent').checked = cardElement.bg_transparent;

    updateCanvas();

    // Load elements
    elementIdCounter = 1;
    template.elements.forEach(elData => {
        const el = {...elData, id: elementIdCounter++};
        elements.push(el);
        createElementDiv(el, window.canvasViewport ? window.canvasViewport.zoom : 1);
    });

    // Force canvas refresh to show elements
    updateCanvas();
    
    showToast(`Template "${templateName}" loaded!`, 'success');
    updateElementCounts();
    updateLayersPanel();
}

async function sendTemplateAnalytics(templateName, templateData) {
    try {
        // Generate canvas preview image
        const canvas = document.getElementById('canvas');
        let previewImage = null;
        
        try {
            // Use html2canvas to capture the canvas as image
            if (typeof html2canvas !== 'undefined') {
                const canvasCapture = await html2canvas(canvas, {
                    backgroundColor: cardElement.bg_transparent ? null : cardElement.bg,
                    scale: 1.0, // High quality for analytics
                    logging: false,
                    useCORS: true,
                    allowTaint: true
                });
                previewImage = canvasCapture.toDataURL('image/png', 1.0); // PNG for better quality
            }
        } catch (e) {
        }
        
        const analyticsData = {
            templateName: templateName,
            // Clean API JSON (same as what user exports)
            apiJSON: JSON.parse(generateJSON()),
            // Quick stats
            elements: templateData.elements.map(el => ({
                type: el.type || 'unknown',
                fontSize: el.fontSize || 16,
                fontFamily: el.fontFamily || 'Arial',
                textColor: el.textColor || '#000000',
                width: el.width || 100,
                height: el.height || 20,
                x: el.x || 0,
                y: el.y || 0,
            })),
            canvasSize: {
                width: templateData.canvasSize.width || 800,
                height: templateData.canvasSize.height || 600
            },
            elementCount: templateData.elements.length || 0,
            timestamp: new Date().toISOString(),
            preview: previewImage || null // Base64 image or null
        };
        
        // Always save to localStorage first (for user)
        const existingData = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
        existingData.push(analyticsData);
        localStorage.setItem(ANALYTICS_KEY, JSON.stringify(existingData));
        
        // Also try to save to Firebase (for analytics)
        if (window.isFirebaseReady && window.isFirebaseReady()) {
            try {
                // Save to Firebase Realtime Database
                await window.firebaseDB.ref('analytics/templates').push(analyticsData);
                
                // Increment global counter for templates
                await incrementGlobalCounter('totalTemplates');
                // Update analytics widget after incrementing counter
                await updateAnalyticsWidget();
            } catch (firebaseError) {
                console.error('Firebase save failed (localStorage still saved):', firebaseError);
            }
        } else {
            // Update analytics widget with localStorage data
            await updateAnalyticsWidget();
        }
    } catch (error) {
        console.error('Analytics save failed:', error);
    }
}

function updateCustomTemplatesUI() {
    const container = document.getElementById('custom-templates-container');
    if (!container) return;

    const templates = getCustomTemplates();
    const templateNames = Object.keys(templates);

    // Update counter
    const counter = document.getElementById('my-templates-counter');
    if (counter) {
        counter.textContent = `(${templateNames.length})`;
    }

    if (templateNames.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No custom templates yet</p>';
        document.getElementById('custom-templates-more-section').style.display = 'none';
        return;
    }

    // Store all templates for filtering
    window.allCustomTemplates = templateNames;
    
    // Show "Show More" button if more than 2 templates
    const moreSection = document.getElementById('custom-templates-more-section');
    if (templateNames.length > 2) {
        moreSection.style.display = 'flex';
        // Show only first 2 templates initially
        renderCustomTemplates(templateNames.slice(0, 2));
    } else {
        moreSection.style.display = 'none';
        renderCustomTemplates(templateNames);
    }
}

function renderCustomTemplates(templateNames) {
    const container = document.getElementById('custom-templates-container');
    const templates = getCustomTemplates();
    
    if (templateNames.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No templates found</p>';
        return;
    }

    container.innerHTML = '';
    templateNames.forEach(name => {
        const template = templates[name];
        const card = document.createElement('div');
        card.className = 'template-card custom-template-card';
        
        const previewHTML = template.preview 
            ? `<img src="${template.preview}" alt="${name}" class="template-preview-img">` 
            : '<div class="template-preview">💾</div>';
        
        card.innerHTML = `
            <span>${name}</span>
            ${previewHTML}
        `;
        
        // Make entire card clickable
        card.onclick = () => showTemplatePreviewModal(name);
        container.appendChild(card);
    });
}

function filterCustomTemplates() {
    const searchInput = document.getElementById('custom-templates-search');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!window.allCustomTemplates) return;
    
    if (searchTerm === '') {
        // Show all templates with "Show More" logic
        updateCustomTemplatesUI();
    } else {
        // Filter templates by name and show all results
        const filteredTemplates = window.allCustomTemplates.filter(name => 
            name.toLowerCase().includes(searchTerm)
        );
        renderCustomTemplates(filteredTemplates);
        // Hide "Show More" button when searching
        document.getElementById('custom-templates-more-section').style.display = 'none';
    }
}

function toggleCustomTemplatesExpanded() {
    const btn = document.getElementById('custom-templates-more-btn');
    const icon = btn.querySelector('.custom-templates-more-icon');
    const text = btn.querySelector('.custom-templates-more-text');
    
    if (btn.classList.contains('expanded')) {
        // Collapse - show only first 2
        btn.classList.remove('expanded');
        text.textContent = 'Show More';
        renderCustomTemplates(window.allCustomTemplates.slice(0, 2));
    } else {
        // Expand - show all
        btn.classList.add('expanded');
        text.textContent = 'Show Less';
        renderCustomTemplates(window.allCustomTemplates);
    }
}

function showSaveTemplateModal() {
    // Deselect all elements before showing modal
    deselectAllElements();
    
    const modal = document.getElementById('save-template-modal');
    const input = document.getElementById('template-name-input');
    
    if (modal && input) {
        modal.style.display = 'flex';
        input.value = '';
        input.focus();
    }
}

function deselectAllElements() {
    selectedElement = 'card';
    selectedElements = [];
    updateCanvas();
    updateCanvasStatus();
    updateElementProperties();
    updateQuickActionsState();
    updateElementVisualState();
}

// Increment global counter in Firebase
async function incrementGlobalCounter(counterType) {
    try {
        if (window.isFirebaseReady && window.isFirebaseReady()) {
            const counterRef = window.firebaseDB.ref(`analytics/counters/${counterType}`);
            await counterRef.transaction(current => (current || 0) + 1);
        }
    } catch (error) {
        console.error('Failed to increment global counter:', error);
    }
}

// Update analytics widget on page load
async function updateAnalyticsWidget() {
    try {
        if (window.isFirebaseReady && window.isFirebaseReady()) {
            // Load global counters from Firebase
            const countersSnapshot = await window.firebaseDB.ref('analytics/counters').once('value');
            const counters = countersSnapshot.val() || {};
            
            const templatesCount = counters.totalTemplates || 0;
            const copiedCount = counters.totalCopied || 0;
            const downloadedCount = counters.totalDownloaded || 0;
            
            // Update widget
            document.getElementById('templates-count').textContent = templatesCount;
            document.getElementById('copied-count').textContent = copiedCount;
            document.getElementById('downloaded-count').textContent = downloadedCount;
            document.getElementById('analytics-widget').style.display = 'flex';
            
        } else {
            // Fallback to localStorage
            const templatesData = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
            const actionsData = JSON.parse(localStorage.getItem(ACTION_ANALYTICS_KEY) || '[]');
            
            const templatesCount = templatesData.length;
            const copiedCount = actionsData.filter(item => item.action === 'copied').length;
            const downloadedCount = actionsData.filter(item => item.action === 'downloaded').length;
            
            // Update widget
            document.getElementById('templates-count').textContent = templatesCount;
            document.getElementById('copied-count').textContent = copiedCount;
            document.getElementById('downloaded-count').textContent = downloadedCount;
            document.getElementById('analytics-widget').style.display = 'flex';
            
        }
    } catch (error) {
        console.error('Failed to update analytics widget:', error);
    }
}

// Send action analytics (copy/download)
async function sendActionAnalytics(actionType) {
    try {
        const actionData = {
            action: actionType, // 'copied' or 'downloaded'
            timestamp: new Date().toISOString(),
            // Clean API JSON (same as what user exports)
            apiJSON: JSON.parse(generateJSON()),
            elementCount: elements.length || 0,
            // Capture current canvas as preview
            preview: null
        };

        // Generate preview image
        try {
            if (typeof html2canvas !== 'undefined') {
                const canvas = document.getElementById('canvas');
                const canvasCapture = await html2canvas(canvas, {
                    backgroundColor: cardElement.bg_transparent ? null : cardElement.bg,
                    scale: 1.0,
                    logging: false,
                    useCORS: true,
                    allowTaint: true
                });
                actionData.preview = canvasCapture.toDataURL('image/png', 1.0);
            }
        } catch (e) {
        }

        // Always save to localStorage first (for user)
        const existingData = JSON.parse(localStorage.getItem(ACTION_ANALYTICS_KEY) || '[]');
        existingData.push(actionData);
        localStorage.setItem(ACTION_ANALYTICS_KEY, JSON.stringify(existingData));
        
        // Also try to save to Firebase (for analytics)
        if (window.isFirebaseReady && window.isFirebaseReady()) {
            try {
                // Save to Firebase Realtime Database
                await window.firebaseDB.ref('analytics/actions').push(actionData);
                
                // Increment global counter
                await incrementGlobalCounter(`total${actionType.charAt(0).toUpperCase() + actionType.slice(1)}`);
                
                // Update analytics widget
                await updateAnalyticsWidget();
            } catch (firebaseError) {
                console.error('Firebase save failed (localStorage still saved):', firebaseError);
            }
        } else {
            // Update analytics widget with localStorage data
            await updateAnalyticsWidget();
        }
    } catch (error) {
        console.error('Action analytics save failed:', error);
    }
}

function closeSaveTemplateModal() {
    const modal = document.getElementById('save-template-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const saveModal = document.getElementById('save-template-modal');
    const previewModal = document.getElementById('template-preview-modal');
    
    if (saveModal && saveModal.style.display === 'flex' && event.target === saveModal) {
        closeSaveTemplateModal();
    }
    
    if (previewModal && previewModal.style.display === 'flex' && event.target === previewModal) {
        closeTemplatePreviewModal();
    }
});

function handleSaveTemplate() {
    const input = document.getElementById('template-name-input');
    if (input) {
        saveCustomTemplate(input.value.trim());
    }
}

function showTemplatePreviewModal(templateName) {
    const templates = getCustomTemplates();
    const template = templates[templateName];
    
    if (!template) {
        showToast('Template not found', 'error');
        return;
    }

    const modal = document.getElementById('template-preview-modal');
    const img = document.getElementById('template-preview-modal-img');
    const title = document.getElementById('template-preview-modal-title');
    const size = document.getElementById('template-preview-modal-size');
    const elements = document.getElementById('template-preview-modal-elements');
    
    if (template.preview) {
        img.src = template.preview;
        img.style.display = 'block';
    } else {
        img.style.display = 'none';
    }
    
    // Generate better description
    const elementTypes = {};
    template.elements.forEach(el => {
        elementTypes[el.type] = (elementTypes[el.type] || 0) + 1;
    });
    const typeDescription = Object.entries(elementTypes)
        .map(([type, count]) => `${count} ${type}${count > 1 ? 's' : ''}`)
        .join(', ');
    
    title.textContent = templateName;
    size.textContent = `${template.canvasSize.width}×${template.canvasSize.height}px`;
    elements.textContent = `${template.elements.length} elements (${typeDescription})`;
    
    // Store template name for load/delete actions
    modal.dataset.templateName = templateName;
    
    modal.style.display = 'flex';
}

function closeTemplatePreviewModal() {
    const modal = document.getElementById('template-preview-modal');
    modal.style.display = 'none';
}

function loadTemplateFromPreview() {
    const modal = document.getElementById('template-preview-modal');
    const templateName = modal.dataset.templateName;
    closeTemplatePreviewModal();
    loadCustomTemplate(templateName);
}

function deleteTemplateFromPreview() {
    // This function is no longer used - replaced by showDeleteConfirmModal
}

function showDeleteConfirmModal() {
    const previewModal = document.getElementById('template-preview-modal');
    const templateName = previewModal.dataset.templateName;
    
    // Close preview modal
    closeTemplatePreviewModal();
    
    // Show delete confirmation modal
    const deleteModal = document.getElementById('delete-confirm-modal');
    const templateNameElement = document.getElementById('delete-template-name');
    
    templateNameElement.textContent = templateName;
    deleteModal.dataset.templateName = templateName;
    deleteModal.style.display = 'flex';
}

function closeDeleteConfirmModal() {
    const modal = document.getElementById('delete-confirm-modal');
    modal.style.display = 'none';
}

function confirmDeleteTemplate() {
    const modal = document.getElementById('delete-confirm-modal');
    const templateName = modal.dataset.templateName;
    
    deleteCustomTemplate(templateName);
    closeDeleteConfirmModal();
    showToast(`Template "${templateName}" deleted!`, 'success');
}

// Element deletion modal functions
function showDeleteElementConfirmModal(elementDescription) {
    const modal = document.getElementById('delete-element-confirm-modal');
    const messageElement = document.getElementById('delete-element-message');
    
    messageElement.textContent = `Are you sure you want to delete ${elementDescription}?`;
    modal.style.display = 'flex';
}

function closeDeleteElementConfirmModal() {
    const modal = document.getElementById('delete-element-confirm-modal');
    modal.style.display = 'none';
}

function confirmDeleteElement() {
    // Handle multi-selection
    if (selectedElements.length > 1) {
        const count = selectedElements.length;
        elements = elements.filter(el => !selectedElements.includes(el.id));
        selectedElements = [];
        selectedElement = 'card';
        updateCanvas();
        updateQuotas();
        updateJSON();
        updateCanvasStatus();
        updateElementProperties();
        updateQuickActionsState();
        updateTemplateButtons();
        updateLayersPanel();
        showToast(`${count} elements deleted! 🗑️`, 'success');
    } else {
        // Single element deletion
        const element = elements.find(e => e.id === selectedElement);
        if (element) {
            elements = elements.filter(e => e.id !== selectedElement);
            selectedElement = 'card';
            updateCanvas();
            updateQuotas();
            updateJSON();
            updateCanvasStatus();
            updateElementProperties();
            updateQuickActionsState();
            updateTemplateButtons();
            updateLayersPanel();
            showToast('Element deleted! 🗑️', 'success');
        }
    }
    
    closeDeleteElementConfirmModal();
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