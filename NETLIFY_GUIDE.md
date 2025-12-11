# Netlify Deployment & Billing Guide

This guide explains your hosting setup, limits, and how to manage your live site.

## 📊 Billing & Credits
You are on the **Netlify Free Starter Plan**.

### Is it really free?
**Yes.** It is completely free as long as you stay within the generous monthly limits.

### The Limits (Monthly)
1.  **Bandwidth: 100 GB**
    *   This is the data used when people load your site.
    *   *Real World Math:* Your site is ~3MB. You can have **~33,000 visitors** per month before hitting this limit.
    *   *Note:* Clicking links (Twitter/LinkedIn) to leave your site consumes **0 bandwidth**.

2.  **Build Minutes: 300 Minutes**
    *   This is time spent "building" your site when you push code updates.
    *   Each update takes ~1 minute.
    *   You can push code **~300 times per month** for free.

3.  **Resets:**
    *   These counters reset to 0 on the 1st of every billing month.

---

## 🛑 How to Stop / Disable
If you want to take your site offline temporarily:

1.  Log in to [app.netlify.com](https://app.netlify.com).
2.  Click on your site.
3.  Go to **Site Settings** > **Danger Zone** (at the bottom).
4.  Click **"Disable Site"**.
    *   **Result:** Site goes offline (Page Not Found). No bandwidth is used.
    *   **Re-enable:** You can click "Enable" anytime to bring it back instantly.

---

## 🤖 3D Avatar Customization
The system is now ready for your custom avatar!

1.  Go to [ReadyPlayerMe](https://readyplayer.me) and create your avatar.
2.  Download the **.glb** file.
3.  Rename it to exactly: `avatar.glb`.
4.  Place it in the `public/` folder of this project:
    *   `webar/public/avatar.glb`
5.  Commit and Push to GitHub.
    *   The site will auto-update, replacing the "Holo-Droid" with YOU.
