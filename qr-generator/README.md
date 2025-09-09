# QR Code Generator

A modern, interactive QR code generator built with HTML5, CSS3, and JavaScript. Create custom QR codes for URLs, text, contact information, and more with full customization options.

## Features

- **Real-time Generation**: QR codes are generated instantly as you type
- **Customizable Colors**: Choose any foreground and background colors
- **Multiple Sizes**: Generate QR codes in small (128x128), medium (256x256), or large (512x512) sizes
- **Error Correction Levels**: Select from Low (7%), Medium (15%), Quartile (25%), or High (30%) error correction
- **Download Functionality**: Save your QR codes as PNG images
- **Quick Templates**: Pre-built templates for common use cases
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Supported QR Code Types

- **URLs**: Direct links to websites
- **Text**: Any plain text content
- **Contact Information**: vCard format for contact details
- **WiFi Credentials**: Network name, security type, and password
- **Phone Numbers**: Direct dialing
- **Email Addresses**: Pre-filled email composition
- **SMS Messages**: Pre-filled text messages

## Usage

1. **Enter Content**: Type or paste the content you want to encode in the QR code
2. **Customize Settings**: 
   - Choose the QR code size
   - Select error correction level
   - Pick custom colors
3. **Generate**: Click "Generate QR Code" or let it generate automatically
4. **Download**: Click "Download QR Code" to save the image

## Quick Templates

The generator includes several pre-built templates for common use cases:
- Portfolio link
- GitHub profile
- LinkedIn profile
- Contact information (vCard)
- WiFi network credentials

## Technical Details

- **Library**: Uses QRCode.js for reliable QR code generation
- **Canvas API**: Renders QR codes using HTML5 Canvas
- **Modern JavaScript**: ES6+ features with proper error handling
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Performance**: Debounced input handling for smooth user experience

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## File Structure

```
qr-generator/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Dependencies

- **QRCode.js**: CDN-hosted library for QR code generation
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## License

This project is part of Lachlan Williams' portfolio and is available for educational and personal use.

---

*Built with ❤️ by Lachlan Williams* 