import * as THREE from 'three'
import Experience from './Experience.js'

export default class Avatar {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.group = new THREE.Group()
        this.scene.add(this.group)

        this.setPlaceholderAvatar()
    }

    setPlaceholderAvatar() {
        // A simple Sci-Fi "Droid" Avatar made of primitives
        // since we don't have a GLB file yet.

        this.droid = new THREE.Group()

        // Material (Holographic Blue)
        const material = new THREE.MeshPhysicalMaterial({
            color: '#00ffff',
            metalness: 0.9,
            roughness: 0.1,
            transmission: 0.6, // Glass-like
            thickness: 0.5,
            emissive: '#0044aa',
            emissiveIntensity: 0.5
        })

        // Body (Floating Orb)
        const bodyGeo = new THREE.SphereGeometry(0.5, 32, 32)
        const body = new THREE.Mesh(bodyGeo, material)
        body.position.y = 1

        // Head (Small Orb)
        const headGeo = new THREE.SphereGeometry(0.25, 32, 32)
        const head = new THREE.Mesh(headGeo, material)
        head.position.y = 1.6

        // Rings (Orbiting)
        const ringGeo = new THREE.TorusGeometry(0.8, 0.02, 16, 100)
        const ring = new THREE.Mesh(ringGeo, material)
        ring.rotation.x = Math.PI / 2
        ring.position.y = 1
        this.ring = ring

        this.droid.add(body, head, ring)

        // Scale it down to fit on card
        this.droid.scale.set(0.5, 0.5, 0.5)

        this.group.add(this.droid)

        // Hide initially (optional, or show floating above card)
        this.group.visible = false
    }

    update() {
        if (this.droid) {
            const t = this.time.elapsed * 0.001

            // Floating animation
            this.droid.position.y = Math.sin(t * 2) * 0.1

            // Ring rotation
            if (this.ring) {
                this.ring.rotation.x = Math.PI / 2 + Math.sin(t) * 0.2
                this.ring.rotation.y = t
            }
        }
    }

    show() {
        this.group.visible = true
    }

    hide() {
        this.group.visible = false
    }
}
