import cameraPositions from '../components/camera/cameraPositions'
import { createPalette } from '../components/color'
import { Random } from '../system/Random'

export const materialTypes = ['glass', 'wired', 'gradient', 'noise']

const createConfig = () => {
  const R = new Random()
  const palette = createPalette(R)
  const bgPallete = createPalette(R)
  const config = {
    palette,
    bgPallete,
    cameraPosition: R.random_choice(cameraPositions),
    isWired: R.random_bool(0.5),
    isGlass: R.random_bool(0.5),
    teapotMaterial: R.random_choice(materialTypes),
  }
  console.log('config', config)
  return config
}

export default createConfig
