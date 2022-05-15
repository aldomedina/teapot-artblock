import { Mesh, SphereBufferGeometry, Vector2, Vector3 } from 'three'
import { noiseRGB, randomInteger } from '../../utils'
import createSNoiseMaterial from '../materials/createSNoiseMaterial'

let vCheck = false
let t = 0
let j = 0
let x = randomInteger(0, 32)
let y = randomInteger(0, 32)

function createBgSphere(palette) {
  const geometry = new SphereBufferGeometry(800, 32, 32)
  const material = createSNoiseMaterial(palette, false, false)

  geometry.scale(-1, 1, 1)
  const sphere = new Mesh(geometry, material)

  sphere.tick = (delta) => {
    const { R, G, B } = noiseRGB(x, y, t / 2)
    sphere.material.uniforms.u_randomisePosition.value = new Vector2(j, j)
    sphere.material.uniforms.u_color1.value = new Vector3(R, G, B)
    sphere.material.uniforms.u_time.value = t

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
  return sphere
}

export { createBgSphere }
