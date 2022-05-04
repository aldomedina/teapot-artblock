import { rgb } from '../../utils'
import colors from './colors'

const createPalette = (R) => {
  const [col1, col2] = R.random_choice(colors)

  return {
    col1: rgb(col1[0], col1[1], col1[2]),
    col2: rgb(col1[0], col1[1], col1[2]),
    col3: rgb(col1[0], col1[1], col1[2]),
    col4: rgb(col2[0], col2[1], col2[2]),
  }
}

export default createPalette
