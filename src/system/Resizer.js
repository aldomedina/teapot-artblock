const setSize = (camera, renderer) => {
  const wW = window.innerWidth
  const wH = window.innerHeight

  camera.aspect = wW / wH
  camera.updateProjectionMatrix()

  renderer.setSize(wW, wH)
  renderer.setPixelRatio(window.devicePixelRatio)
}

class Resizer {
  constructor(camera, renderer) {
    // set initial size on load
    setSize(camera, renderer)

    window.addEventListener('resize', () => {
      // set the size again if a resize occurs
      setSize(camera, renderer)
      // perform any custom actions
      this.onResize()
    })
  }
  onResize() {}
}

export { Resizer }
