# 🚀 Deployment Guide

To unlock the full **Augmented Reality (WebXR)** features, this project must be hosted on a **Secure Server (HTTPS)**.
Here is the fastest way to do it for free.

## The Easiest Way: Netlify Drop ⚡

**No account setup or command line required.**

1.  **Build the Project:**
    Open your terminal in the project folder and run:
    ```bash
    npm run build
    ```
    This creates a `dist` folder with your production code.

2.  **Locate the Folder:**
    Find the `dist` folder on your computer.
    *   Mac/Linux: `/Users/nihalgbailur/webar/dist`
    *   Windows: `C:\Users\...\webar\dist`

3.  **Drag & Drop:**
    *   Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
    *   Drag the entire `dist` folder onto the page area that says "Drag and drop your site output folder here".

4.  **Done!**
    *   Netlify will deploy it instantly and give you a live HTTPS link (e.g., `https://your-site-name.netlify.app`).
    *   **Open this link** on your desktop.
    *   **Scan the QR Code** with your phone. 
    *   **Enjoy AR!** 👓

---

## Alternative: GitHub Pages (Free)

If you have pushed your code to GitHub:

1.  Go to your Repository Settings.
2.  Click on **Pages** (in the sidebar).
3.  Source: **Deploy from a branch**.
4.  Branch: `main` / Folder: `/(root)`.
5.  *Note:* You might need to configure a GitHub Action to build the Vite project first. Netlify is generally easier for Vite projects.
