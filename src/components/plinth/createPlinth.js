import { DoubleSide } from 'three'
import { Mesh } from 'three'
import { MeshStandardMaterial } from 'three'
import { BoxBufferGeometry } from 'three'
import createGlassMaterial from '../materials/createGlassMaterial'

export default function createPlinth(cam, palette) {
  const h = (cam.position.z * cam.getFilmHeight()) / cam.getFocalLength()
  const teapotH = 10
  const geometry = new BoxBufferGeometry(8, h / 2 - teapotH / 2, 8)
  const material = createGlassMaterial()

  const plinth = new Mesh(geometry, material)
  plinth.position.z = -h / 2
  plinth.position.y = -(h / 4) - teapotH / 4
  plinth.castShadow = true

  return plinth
}
