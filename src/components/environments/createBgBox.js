import {
  DoubleSide,
  Group,
  PlaneGeometry,
  MeshPhongMaterial,
  Mesh,
  Vector3,
  MathUtils,
} from 'three'
import createGlassMaterial from '../materials/createGlassMaterial'

const createBox = (planeW, planeH, color) => {
  const cube = new Group()

  const planeHorizontalGeometry = new PlaneGeometry(planeW, planeH)
  // const planeMaterial = createGlassMaterial()
  const planeMaterial = new MeshPhongMaterial({
    side: DoubleSide,
    receiveShadow: true,
    color: 'white',
  })
  const planeHorizontal = new Mesh(planeHorizontalGeometry, planeMaterial)
  const rotatedRad = MathUtils.degToRad(90)

  // top
  const top = planeHorizontal.clone()
  top.receiveShadow = true
  top.rotateX(rotatedRad)
  top.position.y = planeH / 2
  // bottom
  const bottom = top.clone()
  bottom.position.y = -planeH / 2

  // left
  const planeVerticalGeometry = new PlaneGeometry(planeH, planeH)
  const planeVertical = new Mesh(planeVerticalGeometry, planeMaterial)
  const left = planeVertical.clone()
  left.rotateY(rotatedRad)
  left.position.x = planeW / 2
  left.receiveShadow = true
  // right
  const right = left.clone()
  right.position.x = -planeW / 2
  right.receiveShadow = true

  // back
  const back = new Mesh(
    planeVerticalGeometry,
    new MeshPhongMaterial({
      side: DoubleSide,
      receiveShadow: true,
      shininess: 1,
      color: 'white',
    })
  )
  back.receiveShadow = true
  back.position.z = -planeH / 2

  cube.add(top, bottom, left, right, back)
  cube.translateZ(-planeH / 2)
  cube.receiveShadow = true
  return cube
}

function createBgBox(cam) {
  const fov_y = (cam.position.z * cam.getFilmHeight()) / cam.getFocalLength()
  const planeW = fov_y * cam.aspect
  const planeH = fov_y
  const cube = createBox(planeW, planeH)

  let latestAspect = cam.aspect
  cube.tick = (delta, camera) => {
    // make cube responsive
    if (latestAspect !== camera.aspect) {
      const aspectDelta = latestAspect - camera.aspect
      cube.scale(new Vector3(aspectDelta, 1, 1))
    }
    latestAspect = camera.aspect
  }
  return cube
}

export { createBgBox }
