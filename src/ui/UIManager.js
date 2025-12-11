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
    }

    checkLocalhost() {
        const hostname = window.location.hostname
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            if (this.warningBanner) this.warningBanner.style.display = 'block'
        }
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
