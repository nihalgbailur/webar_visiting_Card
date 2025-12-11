# ✨ WebAR Visiting Card

> A premium, interactive 3D business card experience that lives in the browser and steps into reality with WebXR.

![WebAR Hero Banner](public/readme-banner.png)

![WebAR Card](https://img.shields.io/badge/Status-Production_Ready-gold?style=for-the-badge) ![Tech](https://img.shields.io/badge/Built_With-Three.js_|_WebXR_|_Vite-black?style=for-the-badge)

## 🌟 Features

*   **💎 Interactive 3D Experience:** A photorealistic physics-based card that floats, rotates, and flips on touch/click.
*   **👓 Augmented Reality (AR):** Built-in WebXR support allows users to place your card in the real world using their phone camera.
*   **📱 Seamless Mobile Sharing:** Destkop users see an auto-generated **QR Code** to instantly open the experience on mobile.
*   **🎨 Premium Design:** Sleek dark theme with gold accents, cinematic lighting, and smooth GSAP animations.
*   **⚡ High Performance:** Optimized with Vite for lightning-fast loads and texture compression.

## 🚀 Quick Start

### Prerequisites
*   Node.js (v14+)
*   npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/webar-visiting-card.git

# Enter directory
cd webar-visiting-card

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server (accessible via Network IP)
npm run dev
```

> **Note for Mobile Testing:** Ensure your phone is connected to the same WiFi network as your computer. Scan the QR code displayed on your desktop screen to launch on mobile.

## 🛠️ Customization

Make it yours in seconds! Edit `src/config.js` to update your details:

```javascript
export default {
    personal: {
        name: 'Your Name',
        role: 'Your Job Title',
        email: 'you@example.com',
        phone: '+1 (555) 000-0000',
        website: 'www.yourwebsite.com'
    },
    theme: {
        accent: '#D4AF37', // Change the gold color
        bg: '#111111'      // Change the background
    }
}
```

## 📦 Deployment

To deploy for the world (and enable AR features which require HTTPS), build the project:

```bash
npm run build
```

Upload the `dist/` folder to any static host like **Netlify**, **Vercel**, or **GitHub Pages**.

## 🤝 Contributing

Feel free to fork this project and submit PRs. Star the repo if you find it useful! 🌟

---

*Created with ❤️ by [Your Name]*
