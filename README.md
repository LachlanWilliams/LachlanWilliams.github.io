# Lachlan Williams - Personal Resume Website

A modern, responsive personal resume website built with HTML, CSS, and JavaScript. This website showcases your skills, projects, and experience as an aspiring software engineer.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic navigation
- **Contact Form**: Functional contact form with validation
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Scroll Animations**: Elements animate as they come into view
- **SEO Optimized**: Proper meta tags and semantic HTML

## File Structure

```
LachlanWilliams.github.io/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization Guide

### Personal Information

1. **Update Personal Details** in `index.html`:
   - Change the title and meta description
   - Update your name throughout the content
   - Modify the hero section description
   - Update contact information (email, phone, location)

2. **About Section**:
   - Customize the about text to reflect your background
   - Update the statistics (years learning, projects completed, technologies)

### Skills Section

Update the skills in `index.html` to match your actual skills:

```html
<div class="skill-item">
    <i class="fab fa-js-square"></i>
    <span>JavaScript</span>
</div>
```

Available Font Awesome icons for skills:
- `fab fa-js-square` - JavaScript
- `fab fa-python` - Python
- `fab fa-java` - Java
- `fab fa-react` - React
- `fab fa-node-js` - Node.js
- `fab fa-git-alt` - Git
- `fas fa-database` - SQL
- `fas fa-code` - HTML/CSS

### Projects Section

Replace the sample projects with your actual projects:

1. Update project titles and descriptions
2. Change the technologies used
3. Add real links to GitHub repositories and live demos
4. Update project icons (use Font Awesome icons)

### Contact Information

Update the contact section with your real information:
- Email address
- Phone number
- Location
- Social media links (GitHub, LinkedIn, Twitter)

### Styling

The website uses a modern color scheme that you can customize in `styles.css`:

- Primary Blue: `#2563eb`
- Secondary Purple: `#667eea` to `#764ba2` (gradient)
- Accent Yellow: `#fbbf24`
- Text Colors: Various shades of gray

## Deployment to GitHub Pages

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit - Personal resume website"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "GitHub Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Your website will be available at**:
   `https://lachlanwilliams.github.io`

## Local Development

To run the website locally:

1. Clone the repository
2. Open `index.html` in your web browser
3. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

## Browser Compatibility

This website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Features

- Optimized images and icons
- Minimal JavaScript for fast loading
- CSS animations using transform properties
- Responsive images and layouts
- Efficient event handling

## SEO Optimization

The website includes:
- Proper meta tags
- Semantic HTML structure
- Descriptive alt text for images
- Clean URL structure
- Fast loading times

## Contact Form

The contact form currently shows a success message. To make it functional:

1. **Option 1**: Use a form service like Formspree or Netlify Forms
2. **Option 2**: Implement a backend service
3. **Option 3**: Use email.js for client-side email sending

## Customization Tips

1. **Add Your Photo**: Replace the placeholder icon in the hero section with your actual photo
2. **Add More Sections**: You can easily add new sections like "Experience", "Education", or "Blog"
3. **Change Colors**: Modify the CSS variables to match your personal brand
4. **Add Animations**: The website includes smooth animations that you can customize
5. **Add Analytics**: Include Google Analytics or other tracking tools

## Support

If you need help customizing the website:
1. Check the HTML comments for guidance
2. Review the CSS classes for styling options
3. Modify the JavaScript for additional functionality

## License

This project is open source and available under the MIT License.

---

## ✅ **Retro Game Successfully Moved!**

### **What Was Accomplished:**

1. **Created a dedicated Retro Game page** (`space-invaders/index.html`) that contains:
   - Complete Retro Game implementation
   - All necessary HTML, CSS, and JavaScript
   - Beautiful, responsive design matching the main site's aesthetic
   - Navigation header with a "Back to Portfolio" link
   - Full game functionality with controls, scoring, and restart capability

2. **Updated the main page** (`index.html`):
   - Removed the entire Retro Game section (HTML, CSS, and inline styles)
   - Added navigation link to `space-invaders/` in the menu
   - Maintained all other functionality (contact section, etc.)

3. **Cleaned up the main script** (`script.js`):
   - Removed all Retro Game code (over 400 lines!)
   - Kept all essential portfolio functionality intact
   - Reduced file size from 716 lines to 220 lines

### **New URL Structure:**

- **Main site**: `https://lachlanwilliams.github.io/`
- **Wave Function Collapse**: `https://lachlanwilliams.github.io/wave-collapse/`
- **Retro Game**: `https://lachlanwilliams.github.io/space-invaders/`

### **Benefits Achieved:**

- **Significantly reduced clutter** on the main portfolio page
- **Better organization** with dedicated pages for different features
- **Improved user experience** with focused content on each page
- **Maintained full functionality** - both games work exactly the same
- **Clean navigation** with proper linking between pages
- **Responsive design** that works on all devices
- **Consistent styling** that matches the main site's theme

### **Current Navigation Structure:**
```
Main Portfolio
├── Home
├── About
├── Skills
├── Projects
├── Wave Function Collapse → /wave-collapse/
├── Retro Game → /space-invaders/
└── Contact
```

Both the Wave Function Collapse and Retro Game are now accessible as clean subdomains, providing a much more organized and professional portfolio experience! 🎮✨
