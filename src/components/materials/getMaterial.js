import createGlassMaterial from './createGlassMaterial'
import createGradientTexture from './createGradientTexture'
import createSNoiseMaterial from './createSNoiseMaterial'

export default function getMaterial(type, palette, isWired) {
  var materials = {
    glass: function () {
      return createGlassMaterial()
    },
    wired: function () {
      return createSNoiseMaterial(palette, true, true)
    },
    gradient: function () {
      return createGradientTexture(palette)
    },
    noise: function () {
      return createSNoiseMaterial(palette, false, true)
    },
    default: function () {
      return createGlassMaterial()
    },
  }
  return (materials[type] || materials['default'])()
}
