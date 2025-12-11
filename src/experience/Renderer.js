import * as THREE from 'three'
import Experience from './Experience.js'

export default class Renderer {
    constructor() {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            antialias: true, // Essential for text clarity on the card
            alpha: true
        })

        // Append the generated canvas to the container
        // Note: 'this.canvas' in Experience was actually the container div
        this.canvas.appendChild(this.instance.domElement)

        // Style it to fill
        this.instance.domElement.style.position = 'absolute'
        this.instance.domElement.style.top = '0'
        this.instance.domElement.style.left = '0'
        this.instance.domElement.style.width = '100%'
        this.instance.domElement.style.height = '100%'

        this.instance.physicallyCorrectLights = true // Deprecated in r150+? use useLegacyLights = false
        this.instance.useLegacyLights = false // Modern lighting
        this.instance.outputColorSpace = THREE.SRGBColorSpace
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#050505') // Match CSS bg
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
        this.instance.xr.enabled = true // Enable WebXR
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update() {
        // Standard render for non-XR
        if (!this.instance.xr.isPresenting) {
            this.instance.render(this.scene, this.camera.instance)
        } else {
            // WebXR render handled by setAnimationLoop in Experience/ARManager usually, 
            // but Three.js handles the render call automatically if we use setAnimationLoop.
            // We will migrate the main loop to setAnimationLoop in Experience.js
            this.instance.render(this.scene, this.camera.instance)
        }
    }
}
