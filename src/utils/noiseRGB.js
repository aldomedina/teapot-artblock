const noiseRGB = (x, y, t) => {
  const R = Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t))
  const G = Math.floor(
    192 +
      64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
  )
  const B = Math.floor(
    192 +
      64 *
        Math.sin(
          5 * Math.sin(t / 9) +
            ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
        )
  )
  return {
    R,
    G,
    B,
  }
}

export default noiseRGB
