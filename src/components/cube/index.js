import {
  BoxBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
} from 'three'

function createMaterial() {
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load('/static/textures/uv-test-col.png')

  const material = new MeshStandardMaterial({
    map: texture,
  })

  return material
}

function createCube() {
  // create a geometry
  const geometry = new BoxBufferGeometry(2, 2, 2)

  // create a default (white) Basic material
  const material = createMaterial()

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)
  cube.rotation.set(-0.5, -0.1, 0.8)

  const radiansPerSecond = MathUtils.degToRad(30)

  // this method will be called once per frame
  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta
    cube.rotation.x += radiansPerSecond * delta
    cube.rotation.y += radiansPerSecond * delta
  }
  return cube
}

export { createCube }
