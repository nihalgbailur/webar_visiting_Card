
import * as THREE from 'three'
import Experience from './Experience.js'
import gsap from 'gsap'

import config from '../config.js'

export default class Card {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.userData = config.personal

        this.debug = this.experience.debug

        this.setGroup()
        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.setAnimation()
        this.setInteractions()
    }

    setGroup() {
        this.group = new THREE.Group()
        this.scene.add(this.group)
    }

    setGeometry() {
        // Standard geometric ratio 3.5 : 2
        this.geometry = new THREE.BoxGeometry(3.5, 2, 0.05)
    }

    createCanvasTexture(text, type = 'front') {
        const canvas = document.createElement('canvas')
        const width = 1024
        const height = 585 // Maintain ~ 1.75 aspect ratio
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')

        // Background
        if (type === 'front') {
            ctx.fillStyle = '#111111'
            ctx.fillRect(0, 0, width, height)

            // Border/Accent
            ctx.strokeStyle = '#D4AF37'
            ctx.lineWidth = 20
            ctx.strokeRect(40, 40, width - 80, height - 80)

            // Name
            ctx.font = 'bold 100px Playfair Display'
            ctx.fillStyle = '#D4AF37' // Gold
            ctx.textAlign = 'center'
            ctx.fillText(this.userData.name, width / 2, height / 2)

            // Title
            ctx.font = 'lighter 40px Inter'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(this.userData.role, width / 2, height / 2 + 70)
        } else {
            // Gold Background
            ctx.fillStyle = '#D4AF37'
            ctx.fillRect(0, 0, width, height)

            // Dark text
            ctx.fillStyle = '#111111'
            ctx.font = 'bold 60px Playfair Display'
            ctx.textAlign = 'center'
            ctx.fillText('Contact', width / 2, height / 2 - 80)

            ctx.font = '30px Inter'
            if (this.userData.email) ctx.fillText(this.userData.email, width / 2, height / 2)
            if (this.userData.phone) ctx.fillText(this.userData.phone, width / 2, height / 2 + 40)
            if (this.userData.website) ctx.fillText(this.userData.website, width / 2, height / 2 + 80)
        }

        const texture = new THREE.CanvasTexture(canvas)
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    }

    setTextures() {
        this.frontTexture = this.createCanvasTexture('Front', 'front')
        this.backTexture = this.createCanvasTexture('Back', 'back')
    }

    setMaterial() {
        // Side materials (Paper/Cardboard edges)
        const edgeMaterial = new THREE.MeshStandardMaterial({ color: '#222222' })

        // Front Face
        const frontMaterial = new THREE.MeshPhysicalMaterial({
            map: this.frontTexture,
            roughness: 0.4,
            metalness: 0.1,
            clearcoat: 0.5,
            clearcoatRoughness: 0.1
        })

        // Back Face
        const backMaterial = new THREE.MeshPhysicalMaterial({
            map: this.backTexture,
            roughness: 0.4,
            metalness: 0.6, // Gold is metallic
            clearcoat: 0.5
        })

        // Material Array order: right, left, top, bottom, front, back
        this.materials = [
            edgeMaterial, edgeMaterial, // Left/Right
            edgeMaterial, edgeMaterial, // Top/Bottom
            frontMaterial, // Front
            backMaterial   // Back
        ]
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.materials)
        this.group.add(this.mesh)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
    }

    setAnimation() {
        // Simple floating animation using Tick
        this.time.on('tick', () => {
            const time = this.time.elapsed * 0.001
            // Only animate if NOT in AR mode (or handle AR animation differently)
            // Ideally we check a state. For now, we just animate always, 
            // but in AR it might look weird if it moves away from where we placed it.
            // We'll let ARManager handle position overrides if needed.

            // Check if global state says we are in AR?
            // Since we don't have a state manager yet, let's just animate local rotation always
            // but position only if NOT placed?

            if (!this.experience.arManager?.session) {
                this.mesh.position.y = Math.sin(time) * 0.1
                this.mesh.rotation.x = Math.sin(time * 0.5) * 0.05
                this.mesh.rotation.y = Math.sin(time * 0.3) * 0.05
            }
        })
    }

    flip() {
        // Toggle flip state
        this.isFlipped = !this.isFlipped

        gsap.to(this.mesh.rotation, {
            y: this.mesh.rotation.y + Math.PI, // Add 180 degrees
            duration: 1,
            ease: 'power2.inOut'
        })
    }

    setInteractions() {
        window.addEventListener('click', (event) => {
            // Only flip if clicking on the canvas (ignoring UI buttons)
            if (event.target.tagName === 'CANVAS') {
                this.flip()
            }
        })

        // Also listen for touch
        window.addEventListener('touchstart', (event) => {
            if (event.target.tagName === 'CANVAS') {
                // Prevent default not needed usually if click handles it, but good for responsiveness
                this.flip()
            }
        })
    }
}
