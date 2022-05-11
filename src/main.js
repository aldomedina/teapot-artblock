import { createRenderer } from './system/renderer'
import { Resizer } from './system/Resizer'
import { Loop } from './system/Loop'
import createConfig from './system/createConfig'

import { createCamera } from './components/camera'
import { createScene } from './components/scene'
import { createTeapot } from './components/teapot'
import { createBgSphere } from './components/bgSphere'
import { createControls } from './components/controls/createControls'

let camera, renderer, scene, loop, controls

const isDev = true

class Main {
  constructor() {
    // TO BE UPDATED WITH HASH VARS
    const {
      palette,
      cameraPosition,
      isWired,
      bgPallete,
      isGlass,
    } = createConfig()

    // SETTINGS
    renderer = createRenderer()
    scene = createScene()
    camera = createCamera(cameraPosition)
    loop = new Loop(camera, scene, renderer)
    document.body.appendChild(renderer.domElement)

    // TODO: REMOVE SECTION --- DEV ONLY
    const updatables = []
    if (isDev) {
      controls = createControls(camera, renderer, scene)
      updatables.push(controls)
    }

    // ANIMATION SETTINGS
    const teapot = createTeapot(palette, isWired, isGlass)
    const bgSphere = createBgSphere(palette)
    updatables.push(bgSphere, teapot)
    loop.updatables = [...updatables]
    scene.add(teapot, bgSphere)

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
