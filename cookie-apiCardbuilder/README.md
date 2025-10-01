# 🍪 DiscordStuffs

Collection of Discord-related tools and utilities designed by Trolens.

## 🎨 Cookie API Card Builder

Professional drag-and-drop card builder for Cookie API with visual interface.

### ✨ Features

- 🎨 **Visual Designer** - Drag & drop interface for creating cards
- 🖱️ **Easy to Use** - Intuitive controls and real-time preview
- 🎭 **Profile Support** - Discord & Roblox profile integration
- 📊 **Progress Bars** - Customizable progress indicators
- 🖼️ **Media Elements** - Images and text with full customization
- 🔄 **Real-time JSON** - Live JSON export for API integration
- 💎 **Transparency** - Support for transparent backgrounds
- 📱 **Responsive** - Works on desktop and mobile devices

### 🚀 Live Demo

**[Try Cookie API Card Builder →](https://trolensdesign.github.io/DiscordStuffs/cookie-apiCardbuilder/cookie-apiCardbuilder.html)**

### 🎯 Supported Elements

- **Text** - Custom fonts, sizes, colors, and alignment
- **Images** - URL-based image loading with error handling
- **Discord Profiles** - Avatar display with user ID integration
- **Roblox Profiles** - Username-based avatar system
- **Progress Bars** - Customizable values, colors, and styling

### 🛠️ Technical Features

- **JSON Export** - Clean, structured JSON output for API integration
- **Layer Management** - Visual layer panel with reordering
- **Canvas Controls** - Zoom, resize, and positioning tools
- **Property Panel** - Real-time property editing
- **Responsive Design** - Adapts to different screen sizes

### 📋 Usage

1. **Add Elements** - Drag elements from the left panel to canvas
2. **Customize** - Use the right panel to modify properties
3. **Preview** - See real-time changes on the canvas
4. **Export** - Copy JSON output for your API

### 🎨 Customization

- **Card Dimensions** - Adjustable width and height
- **Background Options** - Color, image, or transparent
- **Element Properties** - Position, size, opacity, and styling
- **Layer Management** - Reorder elements with visual controls

### 🤖 Discord Bot Integration

#### Step 1: Get Cookie API Access
1. Visit [Cookie API](https://www.cookie-api.com) and sign up
2. Create an API key in your dashboard
3. Note your API key for bot configuration

#### Step 2: Set Up Discord Bot
1. **Create Card**: Use the visual builder above to design your card
2. **Copy JSON**: Export the generated JSON from the builder
3. **API Request**: Use your Discord bot to make HTTP requests

#### Step 3: Bot Implementation Example
```javascript
// Example Discord.js command
const axios = require('axios');

async function createCard(cardData) {
    try {
        const response = await axios.post('https://api.cookie-api.com/v1/cards', {
            data: cardData
        }, {
            headers: {
                'Authorization': `Bearer YOUR_API_KEY`,
                'Content-Type': 'application/json'
            }
        });
        
        return response.data.url; // Card image URL
    } catch (error) {
        console.error('Error creating card:', error);
        return null;
    }
}

// Usage in Discord command
client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!card')) {
        // Your card JSON from the builder
        const cardJSON = {
            "card": {
                "width": "800",
                "height": "400",
                "bg": "#1a1a2a",
                "bg_type": "color"
            },
            "elements": [
                {
                    "id": "1",
                    "type": "text",
                    "text": "Welcome!",
                    "font_size": "32",
                    "color": "#ffffff",
                    "position": { "x": 300, "y": 180 }
                }
            ]
        };
        
        const cardUrl = await createCard(cardJSON);
        if (cardUrl) {
            message.reply({ files: [cardUrl] });
        }
    }
});
```

#### Step 4: API Endpoints
- **Base URL**: `https://api.cookie-api.com/v1/`
- **Create Card**: `POST /cards`
- **Get Card**: `GET /cards/{id}`
- **Headers**: `Authorization: Bearer YOUR_API_KEY`

#### Step 5: Popular Bot Frameworks
- **Discord.js**: JavaScript/Node.js
- **discord.py**: Python
- **JDA**: Java
- **DSharpPlus**: C#

### 🔧 JSON Structure

The tool exports clean JSON compatible with Cookie API:

```json
{
  "card": {
    "width": "800",
    "height": "400", 
    "bg": "#1a1a2a",
    "bg_type": "color"
  },
  "elements": [
    {
      "id": "1",
      "type": "text",
      "text": "Hello World",
      "font_size": "24",
      "color": "#ffffff",
      "position": { "x": 100, "y": 50 },
      "size": { "width": 200, "height": 30 }
    }
  ]
}
```

### 🎭 Profile Integration

- **Discord Profiles** - Uses Discord's CDN for avatar display
- **Roblox Profiles** - Integrates with Roblox avatar API
- **Fallback System** - Graceful error handling for missing avatars

### 💎 Version History

#### v3.0 - Major Improvements & Bug Fixes
- **🔧 Fixed Drag & Drop**: Profile elements no longer stick to cursor after mouse release
- **⚡ Enhanced Quick Actions**: Center, align, and fit functions now work correctly for profile elements
- **🎨 Improved Border Radius**: New system where 0=Circle, 50=Square with proper limits (0-50)
- **👤 Better Profile Controls**: 
  - Dynamic labels: "Discord ID" vs "Username" based on profile type
  - Clean interface: Hidden position/width controls for profiles
  - Auto width checkbox: Functional toggle for profile elements
- **🛠️ Technical Improvements**:
  - Better event cleanup and memory management
  - Enhanced touch device support
  - Improved state management for profile properties
  - Fixed quick actions calculations for auto-width elements

#### v2.0 - Previous Release
- Fixed JSON structure, added transparency support, improved UI

#### v1.0 - Initial Release
- Initial release with basic functionality

### 👨‍💻 Designed By Trolens

Created with ❤️ by [Trolens](https://github.com/TrolensDesign)

---

*Part of the DiscordStuffs collection - Professional Discord tools and utilities*
