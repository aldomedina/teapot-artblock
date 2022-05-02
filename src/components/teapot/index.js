import { Mesh, MathUtils, Vector2, Vector3 } from 'three'
import { noiseRGB, randomInteger } from '../../utils'
import { createSNoiseMaterial } from '../materials/createSNoiseMaterial'
import { createTeapotGeometry } from './createTeapotGeometry'

let vCheck = false
let t = 0
let j = 0
let x = randomInteger(0, 32)
let y = randomInteger(0, 32)

function createTeapot(palette) {
  const { col1, col2, col3, col4 } = palette
  const geometry = createTeapotGeometry()
  const material = createSNoiseMaterial(col1, col2, col3, col4, false)

  const teapot = new Mesh(geometry, material)

  teapot.tick = (delta) => {
    const { R, G, B } = noiseRGB(x, y, t / 2)
    teapot.material.uniforms.u_randomisePosition.value = new Vector2(j, j)
    teapot.material.uniforms.u_color1.value = new Vector3(R, G, B)
    teapot.material.uniforms.u_time.value = t

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
