import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js'

function createTeapotGeometry(material) {
  const isWired = material === 'wired'
  const size = 5
  const segments = isWired ? 10 : 100
  const bottom = true
  const lib = true
  const body = true
  const fitLid = true
  const blinn = true
  const geometry = new TeapotGeometry(
    size,
    segments,
    bottom,
    lib,
    body,
    fitLid,
    blinn
  )

  return geometry
}

export { createTeapotGeometry }
