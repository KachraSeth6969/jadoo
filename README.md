# Virtual Gift Book 📖

A beautiful, interactive virtual flipbook with realistic page animations, designed with a minimalist notebook aesthetic.

## ✨ Features

- **Realistic Page Flipping**: Powered by turn.js with smooth, natural animations
- **Minimalist Design**: Clean, modern notebook aesthetic with muted tones
- **Dual Content Support**: Both scanned images and stylized handwritten text
- **Fully Responsive**: Optimized for all devices and screen sizes
- **Error Handling**: Robust loading and error recovery
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **Performance Optimized**: Lazy loading and efficient rendering

## 🚀 Quick Start

1. **Install Dependencies**
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`

2. **Add Your Content**
   - Edit `lib/book-data.ts` to customize pages
   - Add images to `public/images/` folder
   - Modify colors and fonts as needed

## 📝 Customization Guide

### Adding Your Scanned Images

1. **Prepare Images**
   - Scan at 300 DPI for best quality
   - Save as JPG or PNG
   - Recommended aspect ratio: 4:5 (portrait)

2. **Add to Project**
   \`\`\`typescript
   // In lib/book-data.ts
   {
     id: 3,
     type: 'image',
     content: '/images/your-scan.jpg',
     title: 'Your Memory Title',
     caption: 'Optional caption text'
   }
   \`\`\`

### Adding Text Pages

\`\`\`typescript
{
  id: 4,
  type: 'text',
  title: 'Your Title',
  textContent: `Your handwritten-style text here.

Use double line breaks for paragraphs.
Perfect for Hinglish content! 💕`,
  date: 'Optional date'
}
\`\`\`

### Customizing Colors

The design uses a minimalist stone/neutral palette. To customize:

1. **Update Tailwind Colors** in `tailwind.config.js`
2. **Modify CSS Variables** in `globals.css`
3. **Change Gradient Backgrounds** in components

### Font Customization

Current fonts:
- **Body Text**: Inter (clean, readable)
- **Handwriting**: Caveat (elegant script)
- **Alternative**: Kalam (casual handwriting)

To change fonts, update the imports in `app/layout.tsx`.

## 🎨 Design Philosophy

### Minimalist Notebook Aesthetic
- **Color Palette**: Warm stone and neutral tones
- **Typography**: Clean sans-serif with handwriting accents
- **Layout**: Generous whitespace and subtle textures
- **Shadows**: Soft, realistic depth

### Visual Elements
- **Paper Texture**: Subtle dot pattern overlay
- **Book Spine**: Realistic 3D spine with shadow
- **Page Borders**: Minimal, elegant borders
- **Animations**: Smooth, natural page turns

## 📱 Responsive Design

### Breakpoints
- **Desktop**: Full size (900x650px)
- **Tablet**: 90% scale
- **Mobile Large**: 75% scale
- **Mobile Medium**: 65% scale
- **Mobile Small**: 55% scale

### Touch Support
- Swipe gestures on mobile devices
- Touch-friendly navigation buttons
- Optimized tap targets

## 🔧 Technical Details

### Performance Optimizations
- **Lazy Loading**: Images load only when needed
- **Font Display**: Swap strategy for faster loading
- **Bundle Splitting**: Efficient code splitting
- **CDN Integration**: External libraries via CDN

### Error Handling
- **Library Loading**: Graceful fallback if CDN fails
- **Image Loading**: Placeholder for missing images
- **Responsive Scaling**: Automatic size adjustment
- **Browser Compatibility**: Fallbacks for older browsers

### Accessibility
- **Screen Readers**: Proper ARIA labels and roles
- **Keyboard Navigation**: Full keyboard support
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user motion preferences

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Virtual gift book ready"
   git push origin main
   \`\`\`

2. **Deploy on Vercel**
   - Import your GitHub repository
   - Deploy automatically
   - Custom domain optional

### Environment Variables
No environment variables required for basic functionality.

### Build Optimization
\`\`\`bash
npm run build  # Optimized production build
npm run start  # Production server
\`\`\`

## 🧪 Testing

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Fallbacks**: Graceful degradation for older browsers

### Device Testing
- **Desktop**: 1920x1080, 1366x768
- **Tablet**: iPad, Android tablets
- **Mobile**: iPhone, Android phones
- **Touch**: Swipe gestures and touch interactions

### Performance Testing
- **Lighthouse Score**: 90+ on all metrics
- **Core Web Vitals**: Optimized loading times
- **Bundle Size**: Minimized JavaScript payload

## 🛠️ Troubleshooting

### Common Issues

**Pages not flipping?**
- Check browser console for JavaScript errors
- Ensure turn.js loaded properly
- Verify jQuery is available

**Images not loading?**
- Check file paths are correct
- Ensure images are in `public/` folder
- Verify image file extensions

**Responsive issues?**
- Test the resize handler
- Check CSS media queries
- Verify viewport meta tag

**Font loading errors?**
- Fonts are loaded via next/font/google
- Check network connectivity
- Verify font names are correct

### Debug Mode
Add `?debug=true` to URL for additional logging.

## 📄 License

MIT License - feel free to use for personal projects.

---

**Made with ❤️ for creating beautiful digital memories**

For support or questions, please check the issues section or create a new issue with detailed information about your problem.
