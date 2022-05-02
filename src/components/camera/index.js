import { PerspectiveCamera } from 'three'
import getCameraPoisition from './getCameraPosition'

function createCamera() {
  const wW = window.innerWidth
  const wH = window.innerHeight
  const camera = new PerspectiveCamera(
    75, // fov = Field Of View
    wW / wH, // aspect ratio (dummy value)
    0.1, // near clipping plane
    1000 // far clipping plane
  )

  // camera.position.set(0, 0, 5)
  const { position, lookingAt } = getCameraPoisition()
  camera.position.set(position.x, position.y, position.z)
  camera.lookAt(lookingAt.x, lookingAt.y, lookingAt.z)
  console.log(camera.position)
  return camera
}

export { createCamera }
