import * as THREE from 'three'
import Experience from './Experience.js'

export default class ARManager {
    constructor() {
        this.experience = new Experience()
        this.renderer = this.experience.renderer.instance
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.world = this.experience.world

        this.session = null
        this.hitTestSource = null
        this.hitTestSourceRequested = false

        this.reticle = null

        this.setupReticle()
        this.setupButton()
    }

    setupReticle() {
        this.reticle = new THREE.Mesh(
            new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
            new THREE.MeshBasicMaterial()
        )
        this.reticle.matrixAutoUpdate = false
        this.reticle.visible = false
        this.scene.add(this.reticle)
    }

    setupButton() {
        const btn = document.getElementById('ar-btn')

        // Check if WebXR is supported
        if ('xr' in navigator) {
            navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
                if (supported) {
                    btn.style.display = 'block'
                    btn.addEventListener('click', () => this.onButtonClick())
                    btn.textContent = 'Enter AR'
                } else {
                    btn.textContent = 'AR Not Supported'
                    btn.disabled = true
                }
            })
        } else {
            btn.textContent = 'WebXR Not Found'
            btn.disabled = true
        }
    }

    async onButtonClick() {
        if (this.session) {
            this.session.end()
            return
        }

        const sessionInit = { requiredFeatures: ['hit-test'] }

        try {
            const session = await navigator.xr.requestSession('immersive-ar', sessionInit)
            this.setSession(session)
        } catch (error) {
            console.error('Failed to create XR session', error)
            alert('Failed to create AR session: ' + error.message)
        }
    }

    setSession(session) {
        this.session = session

        this.session.addEventListener('end', () => {
            this.session = null
            document.getElementById('ar-btn').textContent = 'Enter AR'
            this.reticle.visible = false
            this.hitTestSource = null
            this.hitTestSourceRequested = false

            // Reset card to original state
            this.world.resetCardFromAR()
        })

        this.renderer.xr.setReferenceSpaceType('local')
        this.renderer.xr.setSession(this.session)

        document.getElementById('ar-btn').textContent = 'Exit AR'

        // Prepare Card for AR (Scale it down!)
        this.world.prepareCardForAR()

        // Interaction to place
        this.session.addEventListener('select', () => this.onSelect())
    }

    onSelect() {
        // 1. Raycast to check if we hit the card
        if (this.world.card.mesh.visible) {
            const raycaster = new THREE.Raycaster()
            const camera = this.experience.camera.instance
            raycaster.setFromCamera({ x: 0, y: 0 }, camera)

            const intersects = raycaster.intersectObject(this.world.card.mesh)

            if (intersects.length > 0) {
                const hit = intersects[0]

                // Check if we hit the Back Face (Material Index 5)
                // Note: BoxGeometry materials: 0-1 (Sides), 2-3 (Top/Bot), 4 (Front), 5 (Back)
                if (hit.face.materialIndex === 5) {
                    // Check UV coordinates for Social Links Area (Bottom 25%)
                    // UV (0,0) is usually bottom-left. Text is at height-60 (bottom).
                    // So we look for low V values.
                    if (hit.uv.y < 0.25) {
                        // Left side (Twitter) vs Right side (LinkedIn)
                        if (hit.uv.x < 0.5) {
                            // Open Twitter
                            window.open('https://x.com/BailurG', '_blank')
                        } else {
                            // Open LinkedIn
                            window.open('https://www.linkedin.com/in/nihal-g-bailur/', '_blank')
                        }
                        return // Link opened, don't flip
                    }
                }

                // If not a link click, Flip the card
                this.world.card.flip()
                return
            }
        }

        if (this.reticle.visible) {
            // Place the card at the reticle
            const card = this.world.card.group
            this.reticle.matrix.decompose(card.position, card.quaternion, card.scale)

            // Ensure scale is correct for AR (small real world size)
            // Reticle scale is 1, so we re-apply our AR scale
            const realWorldScale = 0.05 // 5% of original massive size
            card.scale.set(realWorldScale, realWorldScale, realWorldScale)

            // Make sure it faces the user roughly or just use the reticle rotation?
            // Reticle rotation is flat on surface. That's good for "lying on table".
            // If we want it "floating above", we adjust Y.
            card.position.y += 0.05

            // Enable it to be seen if it was hidden
            card.visible = true
        }
    }

    update() {
        if (!this.session) return

        const frame = this.experience.renderer.instance.xr.getFrame()
        const referenceSpace = this.experience.renderer.instance.xr.getReferenceSpace()

        if (this.hitTestSourceRequested === false) {
            this.session.requestReferenceSpace('viewer').then((referenceSpace) => {
                this.session.requestHitTestSource({ space: referenceSpace }).then((source) => {
                    this.hitTestSource = source
                })
            })

            this.session.addEventListener('end', () => {
                this.hitTestSourceRequested = false
                this.hitTestSource = null
            })

            this.hitTestSourceRequested = true
        }

        if (this.hitTestSource) {
            const hitTestResults = frame.getHitTestResults(this.hitTestSource)

            if (hitTestResults.length > 0) {
                const hit = hitTestResults[0]
                const pose = hit.getPose(referenceSpace)

                this.reticle.visible = true
                this.reticle.matrix.fromArray(pose.transform.matrix)
            } else {
                this.reticle.visible = false
            }
        }
    }
}
