// Basic Event Emitter logic included


// Let's implement a simple EventEmitter inside strictly or use a tiny class here to avoid multiple files if possible, 
// But a dedicated Utils/EventEmitter is better. I'll make a simple one here for now or just use standard minimal logic.

export default class Sizes {
    constructor() {
        // Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize event
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
        })
    }

    // Simple event emitter logic to avoid extra file for now
    callbacks = {}

    on(name, callback) {
        if (!this.callbacks[name]) this.callbacks[name] = []
        this.callbacks[name].push(callback)
    }

    trigger(name) {
        if (this.callbacks[name]) {
            this.callbacks[name].forEach(callback => callback())
        }
    }
}
