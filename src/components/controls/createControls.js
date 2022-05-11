import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { downloadFile } from '../../utils'

function createListItem(coordinates) {
  const { x: tx, y: ty, z: tz } = coordinates.target
  const { x: px, y: py, z: pz } = coordinates.position

  let li = document.createElement('li')
  li.innerHTML = `
  <strong>target:</strong> ${tx}, ${ty}, ${tz} <br>
  <strong>position:</strong> ${px}, ${py}, ${pz}
  `
  return li
}

const coordinatesArray = []
const domList = document.getElementById('coordinates-list')
function createControls(camera, renderer, scene) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyP') {
      if (!coordinatesArray.length) {
        const button = document.createElement('button')
        button.classList.add('button')
        button.innerText = 'Download JSON'
        button.onclick = function () {
          downloadFile('coordinates.json', JSON.stringify(coordinatesArray))
        }
        document.body.appendChild(button)
      }

      const coordinates = {
        target: controls.target,
        position: controls.object.position,
      }
      coordinatesArray.push(coordinates)
      domList.appendChild(createListItem(coordinates))
      // get image
      const a = document.createElement('a')
      renderer.render(scene, camera)
      a.href = renderer.domElement
        .toDataURL()
        .replace('image/png', 'image/octet-stream')
      a.download = `${coordinates.target.x}_${coordinates.target.y}_${coordinates.target.z}____${coordinates.position.x}_${coordinates.position.y}_${coordinates.position.z}.png`
      a.click()
    }
  })

  controls.tick = () => {
    controls.update()
  }

  return controls
}

export { createControls }
