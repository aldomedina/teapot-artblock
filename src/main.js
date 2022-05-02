import { createCamera } from './components/camera'
import { createCube } from './components/cube'
import { createScene } from './components/scene'
import { createLights } from './components/lights.js'

import { createRenderer } from './system/renderer'
import { Resizer } from './system/Resizer.js'
import { Loop } from './system/Loop.js'
import { createTeapot } from './components/teapot'
import { randomInteger } from './utils'
import { colors, createPalette } from './components/color'
import { createBgSphere } from './components/bgSphere'

let camera, renderer, scene, loop, palette

const isTutorial = true

class Main {
  constructor() {
    // TO BE UPDATED WITH HASH VARS
    const randomIndex = randomInteger(0, colors.length - 1)

    // SETTINGS
    renderer = createRenderer()
    scene = createScene()
    camera = createCamera()
    palette = createPalette(randomIndex)
    loop = new Loop(camera, scene, renderer)
    document.body.appendChild(renderer.domElement)

    // ELEMENTS

    // ANIMATION SETTINGS
    if (isTutorial) {
      const cube = createCube()
      const lights = createLights()
      loop.updatables.push(cube)
      scene.add(cube, lights)
    } else {
      const teapot = createTeapot(palette)
      const bgSphere = createBgSphere(palette)
      loop.updatables.push(teapot, bgSphere)
      scene.add(teapot, bgSphere)
    }

    // OTHERS
    new Resizer(camera, renderer)
  }
  render() {
    // draw a single frame
    renderer.render(scene, camera)
  }
  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }
}

export { Main }