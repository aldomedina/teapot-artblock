import { Vector3 } from 'three'
export default function (camera) {
  var vector = new Vector3(0, 0, -1)
  vector.applyEuler(camera.rotation, camera.rotation.order)
  return vector
}
