import { createRenderer } from './system/renderer'
import { Resizer } from './system/Resizer'
import { Loop } from './system/Loop'
import createConfig from './system/createConfig'

import { createCamera } from './components/camera'
import { createScene } from './components/scene'
import { createTeapot } from './components/teapot'
import { createBgSphere } from './components/environments/createBgSphere'
import { createBgBox } from './components/environments/createBgBox'
import { createControls } from './components/controls/createControls'
import { createLights } from './components/lights'
import createPlinth from './components/plinth/createPlinth'
import { CameraHelper } from 'three'

let camera, renderer, scene, loop, controls, bg

const isDev = true
const isBox = true

class Main {
  constructor() {
    const updatables = []

    const {
      palette,
      bgPallete,
      cameraPosition,
      teapotMaterial,
    } = createConfig()

    // SETTINGS
    renderer = createRenderer()
    scene = createScene()
    camera = createCamera(cameraPosition, isBox)
    loop = new Loop(camera, scene, renderer)
    document.body.appendChild(renderer.domElement)

    // TODO: REMOVE SECTION --- DEV ONLY
    if (isDev) {
      controls = createControls(camera, renderer, scene)
      updatables.push(controls)
    }

    // OBJECTS
    const bgBox = createBgBox(camera, palette)
    const bgSphere = createBgSphere(palette)
    const plinth = createPlinth(camera, palette)
    const teapot = createTeapot(camera, palette, teapotMaterial)
    const { mainLight, ambientLight } = createLights(camera)

    // ANIMATION
    updatables.push(teapot, bgBox, bgSphere)
    loop.updatables = [...updatables]
    scene.add(bgBox, bgSphere, teapot, plinth, mainLight, ambientLight)

    // HELPERS
    const shadowHelper = new CameraHelper(mainLight.shadow.camera)
    // scene.add(shadowHelper)

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
