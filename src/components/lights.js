import {
  DirectionalLight,
  AmbientLight,
  HemisphereLight,
  PointLight,
} from 'three'

// RectAreaLight -> simulate window
// PointLight -> simulate lightbulb

function createLights(cam) {
  const fov_y = (cam.position.z * cam.getFilmHeight()) / cam.getFocalLength()

  const mainLight = new PointLight(0xffffff, 25.5)
  mainLight.castShadow = true
  mainLight.shadowCameraVisible = true
  mainLight.shadow.mapSize.width = 1024
  mainLight.shadow.mapSize.height = 1024
  mainLight.position.z = -fov_y / 2
  mainLight.position.y = fov_y / 2 - 4

  const ambientLight = new AmbientLight('#0c0c0c', 5)

  return { ambientLight, mainLight }
}

export { createLights }
