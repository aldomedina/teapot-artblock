import { WebGLRenderer, PCFSoftShadowMap } from 'three'

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setClearColor('#000')
  renderer.setPixelRatio(devicePixelRatio)
  renderer.physicallyCorrectLights = true
  renderer.shadowMap.enabled = true
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  renderer.gammaOutput = true
  renderer.gammaFactor = 2.2
  return renderer
}

export { createRenderer }
