import { Clock } from 'three'

const clock = new Clock()
let cameraCopy = {}

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.updatables = []
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick()
      this.renderer.render(this.scene, this.camera)
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null)
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta()

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

    for (const object of this.updatables) {
      object.tick(delta, this.camera)
    }
  }
}

export { Loop }
