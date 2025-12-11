export default class AudioManager {
    constructor() {
        this.ctx = null
        this.enabled = false

        // Initialize on first user interaction
        window.addEventListener('click', () => this.init(), { once: true })
        window.addEventListener('touchstart', () => this.init(), { once: true })
    }

    init() {
        if (this.ctx) return
        const AudioContext = window.AudioContext || window.webkitAudioContext
        this.ctx = new AudioContext()
        this.enabled = true
    }

    playFlipSound() {
        if (!this.enabled || !this.ctx) return

        // Resume if suspended (browser policy)
        if (this.ctx.state === 'suspended') this.ctx.resume()

        const t = this.ctx.currentTime
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        // Sound Design: A quick, futuristic "Ui Swoosh"
        // Frequency sweep from high to low
        osc.frequency.setValueAtTime(600, t)
        osc.frequency.exponentialRampToValueAtTime(150, t + 0.15)

        // Volume envelope (Attach -> Release)
        gain.gain.setValueAtTime(0, t)
        gain.gain.linearRampToValueAtTime(0.3, t + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(t)
        osc.stop(t + 0.2)
    }

    playClickSound() {
        if (!this.enabled || !this.ctx) return
        const t = this.ctx.currentTime
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.frequency.setValueAtTime(800, t)
        gain.gain.setValueAtTime(0.1, t)
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05)

        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(t)
        osc.stop(t + 0.05)
    }
}
