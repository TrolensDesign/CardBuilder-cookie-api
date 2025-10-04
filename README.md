# Cookie API Card Builder

A modular, responsive web application for creating Discord cards using the Cookie API. Built with vanilla HTML, CSS, and JavaScript for easy hosting on GitHub Pages.

## 🚀 Quick Access

**🌐 Live Demo**: [https://trolensdesign.github.io/CardBuilder-cookie-api](https://trolensdesign.github.io/CardBuilder-cookie-api)  
**📁 Repository**: [https://github.com/TrolensDesign/CardBuilder-cookie-api](https://github.com/TrolensDesign/CardBuilder-cookie-api)  
**🍪 Cookie API**: [https://cookie-api.com](https://cookie-api.com)

## Features

- **Visual Card Builder**: Drag-and-drop interface for creating Discord cards
- **Multiple Element Types**: Text, images, Discord profiles, Roblox profiles, progress bars, and shapes
- **Real-time Preview**: See your card as you build it
- **Mobile Responsive**: Optimized for desktop, tablet, and mobile devices
- **JSON Export**: Generate JSON configuration for Discord bots
- **Layer Management**: Organize elements with layer controls
- **Quick Actions**: Center, align, and fit elements with one click

## File Structure

```
cookie-card-builder/
├── index.html              # Main HTML file
├── css/
│   ├── main.css            # Main styles
│   ├── components.css      # Component styles
│   └── mobile.css          # Mobile responsive styles
├── js/
│   ├── app.js             # Main application logic
│   ├── canvas.js          # Canvas and quick actions
│   ├── elements.js        # Element management
│   ├── properties.js      # Properties panel
│   └── mobile.js          # Mobile functionality
└── README.md              # This file
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

- **Text**: Add text with custom fonts, colors, and alignment
- **Image**: Add images from URLs
- **Discord Profile**: Display Discord user avatars
- **Roblox Profile**: Display Roblox user avatars
- **Progress Bar**: Create progress indicators
- **Shape**: Add geometric shapes

### Mobile Usage

On mobile devices, use the bottom navigation bar to access:
- **Elements**: Add new elements to your card
- **Properties**: Modify selected element properties
- **Canvas**: View and interact with your card

## API Integration

### Cookie API Configuration

- **Base URL**: `https://api.cookie-api.com/api/cards/card-builder/build`
- **Method**: `POST`
- **Header**: `Authorization: COOKIE_API_KEY`

### Bot Integration

1. Get your Cookie API key from [cookie-api.com](https://www.cookie-api.com)
2. Use the generated JSON in your Discord bot
3. Send HTTP POST request to Cookie API with the JSON payload

## Limits

- **Text**: 100 text fields with up to 100 unique fonts
- **Image**: 10 images
- **Discord Profile**: 10 Discord profiles
- **Roblox Profile**: 10 Roblox profiles
- **Progress Bar**: 1 progress bar

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

### v3.1.0 (Latest)
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

Designed by Trolens - Cookie API Card Builder v3.1.0

