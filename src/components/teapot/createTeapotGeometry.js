import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js'

function createTeapotGeometry() {
  const size = 50
  const segments = 100
  const bottom = true
  const lib = true
  const body = true
  const fitLid = true
  const blinn = true

  return new TeapotGeometry(size, segments, bottom, lib, body, fitLid, blinn)
}

export { createTeapotGeometry }
