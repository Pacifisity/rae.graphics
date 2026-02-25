# Digital Art Portfolio & Commission Website

A high-conversion, single-page portfolio and commission website for 2D digital artists. Built with **HTML5, Tailwind CSS, and Vanilla JavaScript** — no frameworks, no databases, no backend required.

## 🎨 Features

- ✨ **Dark Mode Design** - Professional, modern aesthetic with dark background (#121212)
- 🖼️ **Smart Gallery** - Auto-loads images from a folder using JavaScript
- 🔦 **Lightbox Modal** - Click images to view full resolution with keyboard navigation
- 💰 **Commission Pricing** - Three-tier pricing system (Sketch, Line Art, Full Render)
- 📧 **Contact Form** - Integrated with Formspree.io for email submissions
- 📱 **Mobile First** - Fully responsive design for all devices
- 🚀 **GitHub Pages Compatible** - Deploy instantly, no server needed

## 📁 Project Structure

```
your-portfolio/
├── index.html        # Main HTML file (edit artist name here)
├── style.css         # Custom CSS and animations
├── script.js         # Dynamic image loading and lightbox logic
├── portfolio/        # Folder containing portfolio images
│   ├── 1.jpg
│   ├── 2.jpg
│   ├── 3.jpg
│   └── ...
└── README.md         # This file
```

## 🚀 Quick Start Guide

### Step 1: Edit Artist Information

Open `index.html` and find these lines to customize:
- **Line 14**: Change `Your Artist Name` to your actual name
- **Line 21**: Update artist bio in the hero section
- **Line 56**: Update the section title if needed

### Step 2: Add Your Portfolio Images

1. Create a folder named `portfolio` in your repository root
2. Add your artwork files as:
   - `1.jpg`
   - `2.jpg`
   - `3.jpg`
   - etc.

**Important:** The script automatically detects images in sequential order (1.jpg, 2.jpg, 3.jpg...). Name them numerically starting from 1.

**Image Tips:**
- Supported formats: JPG, PNG
- Recommended size: 1200x1200px or larger
- The website will create a 3-column responsive grid

### Step 3: Set Up the Contact Form

1. Go to [Formspree.io](https://formspree.io)
2. Sign up (free account)
3. Create a new form and get your Form ID
4. Open `index.html` and find line 164:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
5. Replace `YOUR_FORM_ID` with your actual Form ID from Formspree

**Example:**
```html
<form action="https://formspree.io/f/xyzabc123" method="POST">
```

Now when someone submits the contact form, you'll receive an email!

### Step 4: Deploy on GitHub Pages

#### First Time Setup:

1. Create a GitHub account at [github.com](https://github.com) (if you don't have one)
2. Create a new public repository named `your-username.github.io`
   - Replace `your-username` with your actual GitHub username
   - **Must be exactly** `your-username.github.io`
3. Clone the repository to your computer:
   ```bash
   git clone https://github.com/your-username/your-username.github.io.git
   ```
4. Copy all project files into this folder
5. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial portfolio commit"
   git push origin main
   ```

#### Your site will be live at:
```
https://your-username.github.io
```

#### Updating Your Portfolio:

1. Add new images to the `portfolio/` folder (numbered sequentially)
2. Update `index.html` or other files as needed
3. Commit and push changes:
   ```bash
   git add .
   git commit -m "Added new portfolio pieces"
   git push origin main
   ```

Your website updates automatically within 1-2 minutes!

## 🎯 Customization Guide

### Change Colors

Edit the `style.css` file or modify Tailwind classes in `index.html`:
- `bg-gray-950` - Dark background
- `text-purple-400` - Purple accent color
- `from-purple-500 to-pink-500` - Gradient colors

### Modify Commission Prices

In `index.html`, find the commission tiers and update:
- Price values
- Descriptions
- Included features

### Add Social Media Links

Add to the navigation or footer in `index.html`:
```html
<a href="https://twitter.com/yourhandle" target="_blank">Twitter</a>
<a href="https://instagram.com/yourhandle" target="_blank">Instagram</a>
```

## 🎮 How the Image Loader Works

The `script.js` file uses a smart loading system:

1. **Loop**: Starts at image 1 and attempts to load 1.jpg, 2.jpg, etc.
2. **onload**: When an image is found, it's added to the gallery grid with fade-in animation
3. **onerror**: When an image isn't found, the loading stops gracefully
4. **Responsive Grid**: Automatically adjusts from 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)

```javascript
// The loop essentially does this:
for (let i = 1; i <= 100; i++) {
    try {
        load portfolio/${i}.jpg
        if success → add to gallery
        if fail → stop
    }
}
```

## 🎨 Features Breakdown

### Hero Section
- Eye-catching gradient text
- Call-to-action button
- Smooth scroll to commissions section

### Gallery (Smart Auto-Loading)
- Masonry-style 3-column grid
- Hover effects with zoom and shadow
- Click any image to view full resolution
- Keyboard navigation (arrow keys, ESC)

### Commission Tiers
- Sketch, Line Art, Full Render
- Pricing clearly displayed
- Feature lists for each tier
- "Most Popular" badge on Line Art tier

### Contact Form
- Name, email, commission type inputs
- Message textarea
- Powered by Formspree (no backend needed)
- Email notifications to your inbox

## 📱 Responsive Design

- **Mobile (< 768px)**: 1 column gallery
- **Tablet (768px - 1024px)**: 2 column gallery
- **Desktop (> 1024px)**: 3 column gallery

All elements resize gracefully!

## 🔒 Security Notes

- No backend = no database vulnerabilities
- Contact form data goes through Formspree's secure servers
- All assets are static files
- GitHub Pages provides HTTPS by default

## 🐛 Troubleshooting

### Images not showing in gallery?
- ✅ Make sure images are in a folder named `portfolio/`
- ✅ Files must be named `1.jpg`, `2.jpg`, `3.jpg`, etc. (starting from 1)
- ✅ Check file extensions match exactly (.jpg, not .JPG)
- ✅ Open browser console (F12) and check for error messages

### Contact form not working?
- ✅ Verify Formspree Form ID is correct in `index.html` (line 164)
- ✅ Check your email spam folder
- ✅ Make sure form has valid email address

### Website not live on GitHub Pages?
- ✅ Repository must be public
- ✅ Repository name must be exactly `your-username.github.io`
- ✅ Files must be in the root folder (not a subfolder)
- ✅ Allow 1-2 minutes for GitHub to build the site

### Images taking too long to load?
- ✅ Reduce image file sizes (keep under 500KB per image)
- ✅ Use .jpg format for faster loading
- ✅ Consider lazy loading for 50+ images

## 🎓 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📄 License

This template is provided as-is for your use. Feel free to modify and customize!

## 🤝 Need Help?

- **GitHub Pages Docs**: https://pages.github.com
- **Formspree Docs**: https://formspree.io/help
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **MDN Web Docs**: https://developer.mozilla.org

---

**Happy creating! Your portfolio is ready to showcase your amazing art.** 🎨✨
