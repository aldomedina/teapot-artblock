import cameraPositions from '../components/camera/cameraPositions'
import { createPalette } from '../components/color'
import { Random } from '../system/Random'

const createConfig = () => {
  const R = new Random()
  const config = {
    palette: createPalette(R),
    cameraPosition: R.random_choice(cameraPositions),
    isWired: R.random_bool(0.5),
  }

  return config
}

export default createConfig
