# Cookie API Card Builder

A modular, responsive web application for creating Discord cards using the Cookie API. Built with vanilla HTML, CSS, and JavaScript for easy hosting on GitHub Pages.

## 🚀 Quick Access

**🌐 Live Demo**: [https://trolensdesign.github.io/CardBuilder-cookie-api](https://trolensdesign.github.io/CardBuilder-cookie-api)  
**📁 Repository**: [https://github.com/TrolensDesign/CardBuilder-cookie-api](https://github.com/TrolensDesign/CardBuilder-cookie-api)  
**🍪 Cookie API**: [https://cookie-api.com](https://cookie-api.com)

## Features

- **Visual Card Builder**: Drag-and-drop interface for creating Discord cards
- **Multiple Element Types**: Text, images, Discord profiles, Roblox profiles, progress bars, and shapes
- **Variable Mode**: Dynamic variables support for text and all element properties (e.g., `{username}`, `{level}`)
- **Real-time Preview**: See your card as you build it
- **Professional Zoom & Pan**: Deep zoom (25%-500%) with pan controls like graphic design software
- **Multi-Selection System**: Shift+Drag for multi-select, professional selection tools
- **Smart Templates**: Pre-built templates with auto-selection for easy customization
- **Mobile Responsive**: Optimized for desktop, tablet, and mobile devices
- **JSON Export**: Generate JSON configuration for Discord bots (Normal + With Variables)
- **Layer Management**: Organize elements with layer controls
- **Quick Actions**: Professional toolbar with align, center, and fit tools
- **News System**: Stay updated with latest features and improvements
- **📊 Analytics Dashboard**: Track all user-created templates with Firebase integration (optional)

## File Structure

```
cookie-card-builder/
├── index.html              # Main HTML file
├── analytics.html          # Analytics dashboard (password protected)
├── css/
│   ├── main.css            # Main styles
│   ├── components.css      # Component styles
│   └── mobile.css          # Mobile responsive styles
├── js/
│   ├── app.js              # Main application logic
│   ├── canvas.js           # Canvas and quick actions
│   ├── elements.js         # Element management
│   ├── properties.js       # Properties panel
│   ├── mobile.js           # Mobile functionality
│   └── firebase-config.js  # Firebase configuration (needs setup)
├── README.md               # This file
└── FIREBASE_SETUP.md       # Firebase setup instructions
```

## Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start building your Discord cards!

### GitHub Pages Hosting

The app is already deployed and available at: **[https://trolensdesign.github.io/CardBuilder-cookie-api](https://trolensdesign.github.io/CardBuilder-cookie-api)**

To deploy your own version:
1. Fork this repository
2. Go to Settings > Pages
3. Select "Deploy from a branch" and choose "main"
4. Your app will be available at `https://yourusername.github.io/CardBuilder-cookie-api`

## Usage

### Creating Cards

1. **Add Elements**: Click on element buttons in the left panel
2. **Customize**: Use the properties panel on the right to modify elements
3. **Position**: Drag elements around the canvas
4. **Resize**: Use the resize handles when an element is selected
5. **Export**: Copy the JSON output to use with your Discord bot

### Element Types

- **Text**: Add text with custom fonts, colors, and alignment. Supports variable mode for dynamic text (e.g., `{username}`, `{level}`)
- **Image**: Add images from URLs with variable support
- **Discord Profile**: Display Discord user avatars with dynamic user IDs
- **Roblox Profile**: Display Roblox user avatars with dynamic usernames
- **Progress Bar**: Create progress indicators with variable values
- **Shape**: Add geometric shapes

### Variable Mode

Enable **Variable Mode** for any element to use dynamic variables instead of static values:

**Recommended Workflow:**
1. **Design with Real Text First**: Enter actual example text (e.g., "Trolens", "Level 50", "85%")
2. **Verify Layout**: Check that text size, positioning, and spacing look perfect on canvas
3. **Switch to Variable Mode**: Toggle the switch in properties panel
4. **Enter Variables**: Replace with variable names like `{username}`, `{level}`, `{percent}`
5. **Export**: Use "JSON with Variables" tab to get your dynamic template

**Why This Workflow?**
- Variable names like `{username}` are often longer than actual values ("Trolens")
- Designing with real text ensures perfect layout when filled with actual user data
- Prevents unexpected text height and positioning issues

**Benefits:**
- Create reusable card templates
- Use the same design for multiple users
- Dynamic content without rebuilding cards
- Perfect for Discord bots with user-specific data

### Professional Features

#### Zoom & Pan System
- **Deep Zoom**: Zoom from 25% to 500% for precise editing
- **Pan Controls**: Left click + drag or middle mouse to pan around the canvas
- **Scroll Wheel**: Smooth zoom in/out with mouse wheel
- **Zoom Controls**: Dedicated zoom buttons and dropdown selector
- **Fit to Screen**: Instantly fit your entire card in view

#### Multi-Selection System
- **Shift + Drag**: Create selection box to select multiple elements
- **Shift + Click**: Add individual elements to selection
- **Ctrl/Cmd + Click**: Toggle element selection
- **Bulk Operations**: Move, delete, or modify multiple elements at once

#### Smart Templates
- **Gaming Stats Dashboard**: Multi-progress bar template for gaming profiles
- **Achievement Progress**: Progress tracking template
- **Professional Skills**: Skills showcase template
- **Character Stats**: RPG-style character template
- **Auto-Selection**: All non-image elements are automatically selected for easy repositioning

### Mobile Usage

On mobile devices, use the bottom navigation bar to access:
- **Elements**: Add new elements to your card
- **Properties**: Modify selected element properties
- **Canvas**: View and interact with your card

**⚠️ Note**: Mobile usage is currently under development and may not be fully functional.

## API Integration

### Cookie API Configuration

- **Base URL**: `https://api.cookie-api.com/api/cards/card-builder/build`
- **Method**: `POST`
- **Header**: `Authorization: COOKIE_API_KEY`

### Bot Integration

1. Get your Cookie API key from [cookie-api.com](https://www.cookie-api.com)
2. Use the generated JSON in your Discord bot
3. Send HTTP POST request to Cookie API with the JSON payload

## Analytics Dashboard (Optional)

The app includes a built-in analytics system to track user-created templates. By default, it uses `localStorage` (data only visible to individual users).

### **Firebase Integration** (Recommended for Production)

To see **all templates created by all users**:

1. Follow the step-by-step guide in **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)**
2. Setup takes ~10 minutes
3. **100% FREE** for most use cases (Firebase Spark plan)
4. Works perfectly with GitHub Pages (no backend required)

**Features:**
- 📊 View all user-created templates
- 📈 Track copy/download actions
- 📸 Preview images of all templates
- 📁 Export data as JSON or CSV
- 🔒 Secure with Firebase Security Rules

**Access Analytics:**
- Open `analytics.html` in your browser
- Login with password (default: `CookieBuilder2025!@#`)
- View comprehensive statistics and all user data

## Limits

- **Text**: 100 text fields with up to 100 unique fonts
- **Image**: 10 images
- **Discord Profile**: 10 Discord profiles
- **Roblox Profile**: 10 Roblox profiles
- **Progress Bar**: 20 progress bars

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Changelog

### v3.4.0 (Latest)
- **🔤 Variable Mode for Text Field**: Added Variable Mode to text input to prevent layout issues from long variable names
- **📐 Best Practice Workflow**: Design with real text first (e.g., "Trolens", "85%"), then switch to variables ({username}, {percent})
- **🎯 Per-Element Variable Mode**: Each element has independent Variable Mode toggle - mix static and dynamic content
- **📋 Smart JSON Export**: Variables appear only in "JSON with Variables" tab, normal JSON shows actual values
- **💾 Persistent State**: Variable Mode settings and values are saved per element
- **✨ Clean UI Switching**: Toggle between normal and variable inputs seamlessly without losing data
- **🔧 Font Loading Fix**: Improved font loading with Font Loading API for proper rendering
- **🧹 Auto-Clear Fields**: Variable inputs are properly cleared when switching between elements

### v3.3.0
- **📊 Firebase Analytics Integration**: Track all user-created templates globally with Firebase Realtime Database
- **🔥 Analytics Dashboard**: View all templates, copy/download actions with preview images
- **📈 Global Statistics**: See template counts, element usage, canvas sizes across all users
- **🔒 Secure by Default**: Firebase Security Rules ensure data privacy
- **💾 localStorage Fallback**: Works without Firebase configuration (local-only analytics)
- **📁 Export Functions**: Export analytics data as JSON or CSV
- **🆓 Free Tier**: Complete setup guide for Firebase free tier (1GB data, 10GB transfer/month)

### v3.2.0
- **🔍 Professional Zoom & Pan System**: Deep zoom (25%-500%) with pan controls, scroll wheel zoom, and fit-to-screen
- **🖱️ Multi-Selection System**: Shift+Drag for multi-select, Shift+Click for adding elements, professional selection tools
- **🎨 Smart Templates**: 4 new multi-progress bar templates with auto-selection for easy customization
- **⚡ Professional Quick Actions**: Compact toolbar with Lucide Icons, align center functions, and visual snap state
- **📰 News System**: Stay updated with latest features, improvements, and announcements
- **🔧 Zoom System Fixes**: Fixed all zoom levels, scroll wheel synchronization, and improved fit-to-screen
- **📱 Enhanced Help System**: Sidebar navigation, detailed sections for all features, and mobile usage warnings
- **🎯 Improved Limits**: Progress bars increased from 1 to 20, better template validation
- **🖼️ Canvas Image Handling**: Auto-resize canvas to image dimensions, proportional resizing, and smart background handling

### v3.1.0
- **🎨 UI/UX Improvements**: Simplified header, added "Designed by Trolens" signature, optimized layout spacing
- **📱 Mobile Enhancements**: Compact header design, improved responsive layout for Card Properties/Quick Actions
- **📖 Help System**: Complete user guide with API integration instructions, element limits, and usage tips
- **🔧 Technical Fixes**: Fixed image JSON output, improved image scaling preview, enhanced resize handles
- **⌨️ Axis Lock**: Added visual indicator (yellow line) for axis locking with dynamic direction change
- **🎯 Precision Tools**: Reduced snap threshold to 5px, improved element positioning accuracy

### v3.0.0
- Initial release with modular architecture
- Drag-and-drop card builder interface
- Multiple element types support
- Mobile responsive design
- JSON export functionality

## Credits

Designed by Trolens - Cookie API Card Builder v3.4.0

