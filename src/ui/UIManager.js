import QRCode from 'qrcode'
import config from '../config.js'

export default class UIManager {
    constructor() {
        this.shareBtn = document.getElementById('share-btn')
        this.closeShareBtn = document.getElementById('close-share-btn')
        this.modal = document.getElementById('share-modal')
        this.qrCanvas = document.getElementById('qr-canvas')
        this.footerQR = document.getElementById('qr-footer-canvas')
        this.warningBanner = document.getElementById('localhost-warning')

        this.bindEvents()
        this.initFooterQR()
        this.checkLocalhost()
        this.initSocialLinks()
    }

    checkLocalhost() {
        const hostname = window.location.hostname
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            if (this.warningBanner) this.warningBanner.style.display = 'block'
        }
    }

    initSocialLinks() {
        const container = document.getElementById('social-links')
        if (!container) return

        const social = config.social
        const icons = {
            twitter: '<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
            linkedin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>',
            github: '<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>'
        }

        Object.keys(social).forEach(key => {
            const link = document.createElement('a')
            link.href = social[key]
            link.target = '_blank' // Open in new tab
            link.innerHTML = icons[key] || key
            link.style.opacity = '0.7'
            link.style.transition = 'opacity 0.3s'
            link.addEventListener('mouseover', () => link.style.opacity = '1')
            link.addEventListener('mouseout', () => link.style.opacity = '0.7')

            container.appendChild(link)
        })
    }

    bindEvents() {
        if (this.shareBtn) {
            this.shareBtn.addEventListener('click', () => {
                this.openModal()
            })
        }

        if (this.closeShareBtn) {
            this.closeShareBtn.addEventListener('click', () => {
                this.closeModal()
            })
        }

        // Close on background click
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal()
                }
            })
        }
    }

    initFooterQR() {
        // Only show if on Desktop
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

        if (!isMobile && this.footerQR) {
            this.footerQR.style.display = 'block'
            this.generateQRCode(this.footerQR, 100)
        }
    }

    openModal() {
        this.modal.style.display = 'flex'
        this.modal.style.zIndex = '99999'
        this.modal.classList.remove('hidden')
        this.generateQRCode(this.qrCanvas, 200)
    }

    closeModal() {
        this.modal.style.display = 'none'
        this.modal.classList.add('hidden')
    }

    generateQRCode(canvasElement, width) {
        // Use current URL
        const url = window.location.href

        const options = {
            width: width,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        }

        if (canvasElement) {
            QRCode.toCanvas(canvasElement, url, options, (error) => {
                if (error) console.error(error)
            })
        }
    }
}
