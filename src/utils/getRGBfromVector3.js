export default function getRGBfromVector3(color) {
  return `rgb(${Object.values(color).join(',')})`
}
