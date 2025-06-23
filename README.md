# SoundWave Studios - Music Production Website

A modern, responsive website for a music production studio featuring booking system, portfolio showcase, and professional services presentation.

## Features

### 🎵 Professional Design
- Modern, music-industry focused design
- Responsive layout for all devices
- Dark theme with orange accent colors
- Smooth animations and transitions
- Professional typography with Poppins font

### 🎧 Services Showcase
- **Recording Services** - Multi-track recording with professional equipment
- **Mixing Services** - Expert audio mixing and enhancement
- **Mastering Services** - Final polish for professional sound
- **Production Services** - Full music production from concept to completion

### 🎼 Portfolio Section
- Featured work showcase with audio samples
- Hover effects and interactive elements
- Audio player integration
- Project descriptions and credits

### 📅 Booking System
- Online booking form with validation
- Service selection and date preferences
- PHP backend for form processing
- Email notifications (configurable)
- Data storage in JSON format

### 📱 Interactive Features
- Mobile-responsive navigation with hamburger menu
- Smooth scrolling between sections
- Animated statistics counters
- Form validation with visual feedback
- Loading states and user feedback
- Parallax effects on scroll

### 🎯 Contact & Information
- Studio location and contact details
- Business hours display
- Social media integration
- Professional contact form

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: PHP (for form handling)
- **Styling**: Custom CSS with modern features
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Poppins)
- **Storage**: JSON file storage (easily upgradeable to database)

## Installation & Setup

### Prerequisites
- Web server with PHP support (XAMPP, WAMP, or similar)
- Modern web browser

### Quick Setup
1. **Place files in your web server directory**
   ```
   C:\xampp\htdocs\Music Production studio website\
   ```

2. **Start your web server**
   - Start Apache and PHP in XAMPP control panel

3. **Access the website**
   ```
   http://localhost/Music Production studio website/
   ```

### File Structure
```
Music Production studio website/
├── index.html              # Main website file
├── styles.css              # CSS styling
├── script.js               # JavaScript functionality
├── booking-handler.php     # PHP form handler
├── README.md              # This file
├── assets/                # Media files directory
│   ├── studio-video.mp4   # Hero section video (add your own)
│   ├── studio-photo.jpg   # About section image (add your own)
│   ├── album1.jpg         # Portfolio image 1 (add your own)
│   ├── album2.jpg         # Portfolio image 2 (add your own)
│   ├── album3.jpg         # Portfolio image 3 (add your own)
│   └── samples/           # Audio samples directory
│       ├── rock-sample.mp3
│       ├── pop-sample.mp3
│       └── jazz-sample.mp3
└── bookings.json          # Booking data storage (created automatically)
```

## Customization

### 1. Studio Information
Edit the following in `index.html`:
- Studio name (currently "SoundWave Studios")
- Contact information (phone, email, address)
- Services and pricing
- About section content

### 2. Colors and Branding
In `styles.css`, modify the CSS variables:
```css
:root {
    --primary-color: #ff6b35;
    --secondary-color: #f7931e;
    --dark-bg: #1a1a1a;
    --light-bg: #f8f9fa;
}
```

### 3. Images and Media
Replace placeholder images in the `assets/` folder:
- Add your studio photos
- Include sample audio files
- Update video content

### 4. Email Configuration
In `booking-handler.php`:
- Uncomment email functions
- Configure SMTP settings
- Update recipient email addresses

## Form Handling

The booking form includes:
- Client-side validation
- Server-side validation
- Data sanitization
- JSON storage
- Email notifications (configurable)

### Form Fields
- **Name** (required)
- **Email** (required, validated)
- **Phone** (optional, auto-formatted)
- **Service** (required, dropdown)
- **Preferred Date** (optional)
- **Project Details** (optional, textarea)

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Optimized CSS and JavaScript
- Image preloading for critical assets
- Smooth scrolling and animations
- Efficient DOM manipulation
- Responsive images and layouts

## Security Features

- Input sanitization
- XSS protection
- CSRF protection headers
- Email validation
- Rate limiting ready (easily implementable)

## Future Enhancements

### Planned Features
- [ ] Admin dashboard for managing bookings
- [ ] Calendar integration
- [ ] Payment processing
- [ ] Client portal
- [ ] Blog/News section
- [ ] Advanced portfolio filtering
- [ ] Multi-language support
- [ ] Database integration
- [ ] Real-time chat support
- [ ] Social media integration

### Database Migration
To upgrade from JSON to database storage:
1. Create MySQL database
2. Update `booking-handler.php` to use PDO/MySQLi
3. Migrate existing JSON data
4. Add database connection configuration

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For technical support or customization requests:
- Email: developer@example.com
- Documentation: Available in code comments
- Issues: Create GitHub issues for bugs or feature requests

## Credits

- Design: Custom responsive design
- Icons: Font Awesome
- Fonts: Google Fonts (Poppins)
- Audio samples: Add your own licensed music
- Images: Add your own studio photography

---

**Note**: This is a template website. Replace all placeholder content with your actual studio information, images, and audio samples before going live.
