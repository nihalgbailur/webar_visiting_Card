import * as THREE from 'three'
import Experience from './Experience.js'
import Card from './Card.js'
import Avatar from './Avatar.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.card = new Card()
        this.avatar = new Avatar()

        // Link avatar to card position initially?
        // Or let AR Manager handle parentage.

        // Setup
        this.setEnvironment()
    }

    prepareCardForAR() {
        this.card.group.visible = false // Hide until placed
        // Avatar is hidden by default
    }

    resetCardFromAR() {
        if (this.card && this.card.group) {
            this.card.group.visible = true
            this.card.group.scale.set(1, 1, 1)
            this.card.group.position.set(0, 0, 0)
            this.card.group.rotation.set(0, 0, 0)
        }
        if (this.avatar) this.avatar.hide()
    }

    placeAvatarOnCard() {
        // Move Avatar to match Card position but float above it
        // We can attach Avatar group to Card group for easier sync
        this.card.group.add(this.avatar.group)
        this.avatar.group.position.set(0, 1.5, 0) // Floating above center
        this.avatar.show()
    }

    setEnvironment() {
        // Ambient Light
        const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
        this.scene.add(ambientLight)

        // Directional Light
        const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
        directionalLight.position.set(3, 4, 5)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.set(1024, 1024)
        this.scene.add(directionalLight)

        // Accent Light (Goldish)
        const spotLight = new THREE.SpotLight('#D4AF37', 5, 10, Math.PI * 0.1, 0.25, 1)
        spotLight.position.set(0, 2, 0)
        spotLight.target.position.set(0, 0, 0)
        this.scene.add(spotLight)
        this.scene.add(spotLight.target)
    }

    update() {
        // Update resources/animations if any
        if (this.avatar) this.avatar.update()
    }
}
