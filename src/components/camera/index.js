import { PerspectiveCamera } from 'three'

function createCamera() {
  const wW = window.innerWidth
  const wH = window.innerHeight
  const camera = new PerspectiveCamera(
    75, // fov = Field Of View
    wW / wH, // aspect ratio (dummy value)
    0.1, // near clipping plane
    1000 // far clipping plane
  )

  camera.position.set(0, 0, 10)

  return camera
}

export { createCamera }
