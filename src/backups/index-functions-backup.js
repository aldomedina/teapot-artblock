import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Inputs
import noiseMaterial from './modules/materials/noise-gradient'
import geometry from './modules/geometry/teapot'
import getColor from './modules/color/getColor'
import getCameraPoisition from './modules/cameraPosition/getCameraPosition'

import { randomInteger, noiseRGB, getLookingAt } from './utils'

// GENERAL SETTINGS
let wW = window.innerWidth
let wH = window.innerHeight
let camera, controls, scene, renderer, colors, teapot, sphereBG

const init = () => {
  addRenderer()
  createPallete()
  addCamera()
  addControls()
  addSphereBG()
  addTeapot()
  animate()

  window.addEventListener('resize', onWindowResize)
}

const addRenderer = () => {
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(wW, wH)
  renderer.setPixelRatio(window.devicePixelRatio)
  document.body.appendChild(renderer.domElement)
}

const createPallete = () => {
  colors = getColor()
}

const addCamera = () => {
  camera = new THREE.PerspectiveCamera(75, wW / wH, 0.1, 1000)
}

const addControls = () => {
  controls = new OrbitControls(camera, renderer.domElement)
}

const addSphereBG = () => {
  const { col1, col2, col3, col4 } = colors
  const sphereMaterial = noiseMaterial(col1, col2, col3, col4, false)
  const sphereGeometry = new THREE.SphereBufferGeometry(800, 32, 32)
  sphereGeometry.scale(-1, 1, 1)
  sphereBG = new THREE.Mesh(sphereGeometry, sphereMaterial)
  scene.add(sphereBG)
}

const addTeapot = () => {
  const { col1, col2, col3, col4 } = colors
  const teapotMaterial = noiseMaterial(col1, col2, col3, col4, false)
  teapot = new THREE.Mesh(geometry, teapotMaterial)
  scene.add(teapot)
}

let vCheck = false
let t = 0
let j = 0
let x = randomInteger(0, 32)
let y = randomInteger(0, 32)

const animate = () => {
  requestAnimationFrame(animate)
  // teapot.rotation.y += 0.002
  const { R, G, B } = noiseRGB(x, y, t / 2)
  teapot.material.uniforms.u_randomisePosition.value = new THREE.Vector2(j, j)
  teapot.material.uniforms.u_color1.value = new THREE.Vector3(R, G, B)
  teapot.material.uniforms.u_time.value = t

  sphereBG.material.uniforms.u_randomisePosition.value = new THREE.Vector2(j, j)
  sphereBG.material.uniforms.u_color1.value = new THREE.Vector3(R, G, B)
  sphereBG.material.uniforms.u_time.value = t

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

function onWindowResize() {
  wW = window.innerWidth
  wH = window.innerHeight
  const canvasWidth = wW
  const canvasHeight = wH

  renderer.setSize(canvasWidth, canvasHeight)

  camera.aspect = canvasWidth / canvasHeight
  camera.updateProjectionMatrix()
}

init()
