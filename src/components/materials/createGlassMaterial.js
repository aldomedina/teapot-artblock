import { DoubleSide } from 'three'
import { MeshPhysicalMaterial, Texture, RepeatWrapping } from 'three'
import normalB64 from './normalB64'

export default function createGlassMaterial() {
  const image = new Image()
  image.src = normalB64

  let texture = new Texture()
  texture.image = image
  image.onload = function () {
    texture.needsUpdate = true
  }
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  const material = new MeshPhysicalMaterial({
    transmission: 1.3,
    roughness: 0.4,
    thickness: 20,
    reflectivity: 0.4,
    side: DoubleSide,
    ior: 1.5,
    normalMap: texture,
    clearcoatNormalMap: texture,
  })
  return material
}
