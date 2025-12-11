import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Experience from './Experience.js'

export default class Avatar {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.group = new THREE.Group()
        this.scene.add(this.group)

        // 1. Create Placeholder Droid (Always available as fallback)
        this.setPlaceholderAvatar()

        // 2. Try to load Real Avatar
        this.loadRealAvatar()
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
    }

    loadRealAvatar() {
        const loader = new GLTFLoader()

        // Try loading 'avatar.glb' from the public folder
        loader.load(
            '/avatar.glb',
            (gltf) => {
                console.log('Avatar loaded successfully!')

                // Hide Droid
                this.droid.visible = false

                this.realAvatar = gltf.scene

                // Scale ReadyPlayerMe avatars (they are usually tall)
                this.realAvatar.scale.set(1, 1, 1)
                // Position it to stand on the card
                this.realAvatar.position.set(0, 0, 0)

                this.group.add(this.realAvatar)

                // Allow Animations if any
                if (gltf.animations.length > 0) {
                    this.mixer = new THREE.AnimationMixer(this.realAvatar)
                    const action = this.mixer.clipAction(gltf.animations[0])
                    action.play()
                }
            },
            (progress) => {
                // Loading...
            },
            (error) => {
                console.log('No custom avatar found (avatar.glb). Using Holo-Droid.')
                // Removing this error log to keep console clean for user if they haven't uploaded one yet
                // console.error(error) 
            }
        )
    }

    update() {
        // Update Droid animation
        if (this.droid && this.droid.visible) {
            const t = this.time.elapsed * 0.001
            this.droid.position.y = Math.sin(t * 2) * 0.1
            if (this.ring) {
                this.ring.rotation.x = Math.PI / 2 + Math.sin(t) * 0.2
                this.ring.rotation.y = t
            }
        }

        // Update Real Avatar Animation
        if (this.mixer) {
            this.mixer.update(this.time.delta * 0.001)
        }
    }

    show() {
        this.group.visible = true
    }

    hide() {
        this.group.visible = false
    }
}
