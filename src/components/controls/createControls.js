import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  window.addEventListener('click', () => {
    // set the size again if a resize occurs

    const coordinates = {
      target: controls.target,
      position: controls.object.position,
    }
    console.log(coordinates)
  })

  controls.tick = () => {
    controls.update()
  }

  return controls
}

export { createControls }
