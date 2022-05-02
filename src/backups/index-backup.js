import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Inputs
import material from '../modules/materials/noise-gradient'
import geometry from '../modules/geometry/teapot'
import getColor from '../modules/color/getColor'
import getCameraPoisition from '../modules/cameraPosition/getCameraPosition'

import { randomInteger, noiseRGB, getLookingAt } from '../utils'
import twistedMaterial from '../modules/materials/twisted-sphere'

// GENERAL SETTINGS
let wW = window.innerWidth
let wH = window.innerHeight

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({ alpha: true })

// CAMERA & CONTROLS
const { lookingAt, position: pos } = getCameraPoisition()
const camera = new THREE.PerspectiveCamera(75, wW / wH, 0.1, 1000)
camera.position.set(pos.x, pos.y, pos.z)
camera.lookAt(lookingAt.x, lookingAt.y, lookingAt.z)

const controls = new OrbitControls(camera, renderer.domElement)

renderer.setSize(wW, wH)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const { col1, col2, col3, col4 } = getColor()

// teapot
const teapotMaterial = material(col1, col2, col3, col4, false)
const bgMaterial = material(col1, col2, col3, col4, true)
const teapot = new THREE.Mesh(geometry, teapotMaterial)

// bg - moving plane
const geometryPlane = new THREE.PlaneGeometry(wW, 600, 200, 200)
const mesh = new THREE.Mesh(geometryPlane, bgMaterial)
mesh.position.set(-200, 270, -280)
mesh.scale.multiplyScalar(4)
mesh.rotationX = -1.0
mesh.rotationY = 0.0
mesh.rotationZ = 0.1

// bg - twisted sphere
const sphereGeometry = new THREE.SphereBufferGeometry(800, 32, 32)
sphereGeometry.scale(-1, 1, 1)
const sphere = new THREE.Mesh(
  sphereGeometry,
  // speed,density,strength,frequency,amplitude,intensity,
  // twistedMaterial(0.1, 0.9, 0.15, 2.0, 2.0, 6.0)
  teapotMaterial
)

scene.add(teapot)
scene.add(sphere)

// ANIMATE

let vCheck = false
let t = 0
let j = 0
let x = randomInteger(0, 32)
let y = randomInteger(0, 32)
function animate() {
  requestAnimationFrame(animate)
  // teapot.rotation.y += 0.002
  const { R, G, B } = noiseRGB(x, y, t / 2)
  teapot.material.uniforms.u_randomisePosition.value = new THREE.Vector2(j, j)
  teapot.material.uniforms.u_color1.value = new THREE.Vector3(R, G, B)
  teapot.material.uniforms.u_time.value = t

  mesh.material.uniforms.u_randomisePosition.value = new THREE.Vector2(j, j)
  mesh.material.uniforms.u_color1.value = new THREE.Vector3(R, G, B)
  mesh.material.uniforms.u_time.value = t

  if (t % 0.1 == 0) {
    if (vCheck == false) {
      x -= 1
      if (x <= 0) {
        vCheck = true
      }
    } else {
      x += 1
      if (x >= 32) {
        vCheck = false
      }
    }
  }

  // Increase t by a certain value every frame
  j = j + 0.01
  t = t + 0.02

  renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', onWindowResize)
window.addEventListener('click', () => {
  if (controls) {
    const currentLookingAt = getLookingAt(controls)
    const positionData = {
      position: controls.object.position,
      lookingAt: currentLookingAt,
    }
    const boxGeometry = new THREE.BoxGeometry(30, 30, 30)
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    box.position.set(currentLookingAt)

    scene.add(box)
  }
})

function onWindowResize() {
  wW = window.innerWidth
  wH = window.innerHeight
  const canvasWidth = wW
  const canvasHeight = wH

  renderer.setSize(canvasWidth, canvasHeight)

  camera.aspect = canvasWidth / canvasHeight
  camera.updateProjectionMatrix()
}
