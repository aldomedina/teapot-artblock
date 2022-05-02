import { randomInteger } from '../../utils'
import cameraPositions from './cameraPositions'

const getCameraPoisition = () => {
  const index = randomInteger(0, cameraPositions.length - 1)
  return cameraPositions[index]
}

export default getCameraPoisition
