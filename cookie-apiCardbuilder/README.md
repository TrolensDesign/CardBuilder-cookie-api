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
- **Shapes** - Basic geometric shapes with color and border radius

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

- **v2.0** - Fixed JSON structure, added transparency support, improved UI
- **v1.0** - Initial release with basic functionality

### 👨‍💻 Designed By Trolens

Created with ❤️ by [Trolens](https://github.com/TrolensDesign)

---

*Part of the DiscordStuffs collection - Professional Discord tools and utilities*
