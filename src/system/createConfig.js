import cameraPositions from '../components/camera/cameraPositions'
import { createPalette } from '../components/color'
import { Random } from '../system/Random'

const createConfig = () => {
  const R = new Random()
  const palette = createPalette(R)
  const bgPallete = createPalette(R)
  console.log('palette: ', palette)
  const config = {
    palette,
    bgPallete,
    cameraPosition: R.random_choice(cameraPositions),
    isWired: R.random_bool(0.5),
    isGlass: R.random_bool(0.5),
  }

  return config
}

export default createConfig
