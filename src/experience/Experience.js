import * as THREE from 'three'
import Sizes from './Sizes.js'
import Time from './Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World.js'
import ARManager from './ARManager.js'

let instance = null

export default class Experience {
    constructor(canvas) {
        // Singleton
        if (instance) {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas // This is actually the Container DIV

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.arManager = new ARManager()

        // Handle Resize
        this.sizes.on('resize', () => {
            this.resize()
        })

        // NOTE: For WebXR, we must use setAnimationLoop.
        // We stop our custom RAF in Time.js or simply ignore it once XR starts?
        // Actually, cleaner is to just use setAnimationLoop FOREVER.

        // However, for WebXR we MUST use renderer.setAnimationLoop
        // So we will override the standard rAF loop if XR is active, 
        // but actually it's best to always use setAnimationLoop if we want minimal friction.

        // Let's rely on Time.js for delta calc but move the loop here.
        // Quick fix: We will allow Time.js to run for non-AR, but once we switch to AR, 
        // the renderer.setAnimationLoop takes over. 
        // Actually, renderer.setAnimationLoop(...) AUTOMATICALLY replaces the window.requestAnimationFrame loop logic for the renderer.
        // But we need to call `instance.render` inside.

        this.renderer.instance.setAnimationLoop((timestamp, frame) => {
            // We can pass frame to ARManager
            if (this.arManager) this.arManager.update()

            // Regular update
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        // Update logic (animation, etc)
        // We need to calculate Delta Time here if we removed Time.js loop?
        // For now, let's rely on Time.js 'tick' triggering 'update' via event for the logic updates
        // BUT wait, if we use setAnimationLoop, that is the loop.

        // Let's decouple:
        // 1. Logic updates (Time, Animations)
        // 2. Render updates

        if (this.world) this.world.update()
        this.camera.update()
        this.renderer.update()
    }
}
