import * as THREE from 'three'
import Experience from './Experience.js'
import Card from './Card.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Setup
        this.setEnvironment()
        this.setCard()
    }

    setCard() {
        this.card = new Card()
    }

    prepareCardForAR() {
        // Hide card initially until placed
        if (this.card && this.card.group) {
            this.card.group.visible = false

            // Should properly reset rotation/position logic here too if needed
            // But ARManager will overwrite position on placement
            // We set scale to 1 (Card.js default is 3.5 units sized geometry)
            // ARManager handles the scaling down to 0.05
        }
    }

    resetCardFromAR() {
        if (this.card && this.card.group) {
            this.card.group.visible = true
            this.card.group.scale.set(1, 1, 1)
            this.card.group.position.set(0, 0, 0)
            this.card.group.rotation.set(0, 0, 0)
        }
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
    }
}
