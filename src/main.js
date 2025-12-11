// Global Error Handler for Mobile Debugging
window.addEventListener('error', (event) => {
    const errorBox = document.createElement('div')
    errorBox.style.position = 'fixed'
    errorBox.style.top = '0'
    errorBox.style.left = '0'
    errorBox.style.width = '100%'
    errorBox.style.background = 'red'
    errorBox.style.color = 'white'
    errorBox.style.padding = '20px'
    errorBox.style.zIndex = '9999'
    errorBox.innerText = 'Error: ' + event.message
    document.body.appendChild(errorBox)
})

import './styles/main.css'
import Experience from './experience/Experience.js'
import UIManager from './ui/UIManager.js'

try {
    // Initialize the experience
    const experience = new Experience(document.querySelector('#canvas-container'))
    const ui = new UIManager()

    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('loader')
        if (loader) {
            loader.classList.add('hidden')
        }
    }, 1000)
} catch (e) {
    console.error(e)
    alert('Init Error: ' + e.message)
}
