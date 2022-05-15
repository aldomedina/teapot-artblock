import { Mesh, MathUtils, Vector2, Vector3, Box3 } from 'three'
import { noiseRGB, randomInteger } from '../../utils'
import getMaterial from '../materials/getMaterial'
import { createTeapotGeometry } from './createTeapotGeometry'

let vCheck = false
let t = 0
let j = 0
let x = randomInteger(0, 32)
let y = randomInteger(0, 32)

function createTeapot(camera, palette, teapotMaterial) {
  const geometry = createTeapotGeometry(teapotMaterial)
  const material = getMaterial(
    teapotMaterial,
    palette,
    teapotMaterial === 'wired'
  )
  const teapot = new Mesh(geometry, material)
  teapot.castShadow = true
  teapot.receiveShadow = true
  const fov_y =
    (camera.position.z * camera.getFilmHeight()) / camera.getFocalLength()
  teapot.position.z = -fov_y / 2

  teapot.tick = () => {
    const { R, G, B } = noiseRGB(x, y, t / 2)
    if (teapotMaterial === 'noise' || teapotMaterial === 'wired') {
      teapot.material.uniforms.u_randomisePosition.value = new Vector2(j, j)
      teapot.material.uniforms.u_color1.value = new Vector3(R, G, B)
      teapot.material.uniforms.u_time.value = t
    }

    if (t % 0.1 == 0) {
      if (vCheck == false) {
        x -= 1
        if (x <= 0) {
          vCheck = true
        }
      } else {
        x += 1
        if (x >= 32) {
          vCheck = false
        }
      }
    }

    j = j + 0.01
    t = t + 0.02
  }
  return teapot
}

export { createTeapot }
