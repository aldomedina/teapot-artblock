const downloadFile = (fileName, data) => {
  var link = document.createElement('a')
  link.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(data)
  )
  link.setAttribute('download', fileName)
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default downloadFile
