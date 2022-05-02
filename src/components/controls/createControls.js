import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function createListItem(coordinates) {
  let li = document.createElement('li')
  li.innerHTML = `
  <strong>target:</strong> ${coordinates.target.x}, ${coordinates.target.y}, ${coordinates.target.z} <br>
  <strong>position:</strong> ${coordinates.position.x}, ${coordinates.position.y}, ${coordinates.position.z}
  `
  return li
}

const coordinatesArray = []
const domList = document.getElementById('coordinates-list')
function createControls(camera, renderer, scene, isTutorial) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  !isTutorial &&
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyP') {
        if (!coordinatesArray.length) {
          const button = document.createElement('button')
          button.classList.add('button')
          button.innerText = 'Download JSON'
          button.onclick = function () {
            const blob = new Blob([JSON.stringify(coordinatesArray)], {
              type: 'text/json',
            })
            const link = document.createElement('a')

            link.download = 'coordinates.json'
            link.href = window.URL.createObjectURL(blob)
            link.dataset.downloadurl = [
              'text/json',
              link.download,
              link.href,
            ].join(':')

            const evt = new MouseEvent('click', {
              view: window,
              bubbles: true,
              cancelable: true,
            })

            link.dispatchEvent(evt)
            link.remove()
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
