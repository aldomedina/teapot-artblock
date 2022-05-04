import { PerspectiveCamera } from 'three'

function createCamera(cameraPosition) {
  const wW = window.innerWidth
  const wH = window.innerHeight
  const camera = new PerspectiveCamera(
    75, // fov = Field Of View
    wW / wH, // aspect ratio (dummy value)
    0.1, // near clipping plane
    1000 // far clipping plane
  )

  if (cameraPosition) {
    const { position, lookingAt } = cameraPosition
    camera.position.set(position.x, position.y, position.z)
    camera.lookAt(lookingAt.x, lookingAt.y, lookingAt.z)
  } else {
    camera.position.set(0, 0, 5)
  }

  return camera
}

export { createCamera }
