// Adaptation of Johnny Simpson Gradient effects tutorial
// https://javascript.plainenglish.io/making-an-animated-html5-canvas-gradient-effect-62e7f84d7c2f
// https://github.com/smpnjn/webgl-gradient
// https://codepen.io/smpnjn/pen/pobGMKp

import { ShaderMaterial, DoubleSide, Color } from 'three'
import { randomisePosition, sNoise } from '../../utils'

export default function createSNoiseMaterial(
  palette,
  wireframe,
  fixedSize = false
) {
  const { col1, col2, col3, col4 } = palette
  return new ShaderMaterial({
    side: DoubleSide,
    wireframe,
    uniforms: {
      u_bg: { type: 'v3', value: col1 },
      u_bgMain: { type: 'v3', value: col1 },
      u_color1: { type: 'v3', value: col1 },
      u_color2: { type: 'v3', value: col4 },
      u_time: { type: 'f', value: 30 },
      u_randomisePosition: { type: 'v2', value: randomisePosition },
      bboxMin: {
        value: {
          x: -9.523809432983398,
          y: -5,
          z: -6.349206447601318,
        },
      },
      bboxMax: {
        value: {
          x: 10.901825904846191,
          y: 5,
          z: 6.349206447601318,
        },
      },
    },
    vertexShader:
      sNoise +
      `
      uniform float u_time;
      uniform vec2 u_randomisePosition;

      varying float vDistortion;
      varying float xDistortion;
      uniform vec3 bboxMin;
      uniform vec3 bboxMax;

      varying vec2 vUv;

      void main() {
         ${
           fixedSize
             ? ` 
              vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
              vUv.x = (position.x - bboxMin.x) / (bboxMax.x - bboxMin.x);`
             : `
              vUv = uv;
             `
         }
          vec3 pos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }

    `,
    fragmentShader:
      sNoise +
      `
      vec3 rgb(float r, float g, float b) {
        return vec3(r / 255., g / 255., b / 255.);
      }

      vec3 rgb(float c) {
          return vec3(c / 255., c / 255., c / 255.);
      }

      uniform vec3 u_bg;
      uniform vec3 u_bgMain;
      uniform vec3 u_color1;
      uniform vec3 u_color2;
      uniform float u_time;

      varying vec2 vUv;
      varying float vDistortion;

      void main() {
        vec3 bg = rgb(u_bg.r, u_bg.g, u_bg.b);
        vec3 c1 = rgb(u_color1.r, u_color1.g, u_color1.b);
        vec3 c2 = rgb(u_color2.r, u_color2.g, u_color2.b);
        vec3 bgMain = rgb(u_bgMain.r, u_bgMain.g, u_bgMain.b);

        float noise1 = snoise(vUv + u_time * 0.08);
        float noise2 = snoise(vUv * 2. + u_time * 0.1);

        vec3 color = bg;
        color = mix(color, c1, noise1 * 0.6);
        color = mix(color, c2, noise2 * .4);

        color = mix(color, mix(c1, c2, vUv.x), vDistortion);

        float border = smoothstep(0.1, 0.6, vUv.x);

        color = mix(color, bgMain, 1. -border);

        gl_FragColor = vec4(color, 1.0);
      }
      `,
  })
}

// const color1 = [1.0, 0.55, 0]
// const color2 = [0.226, 0.0, 0.615]
// export default function createSNoiseMaterial(
//   palette,
//   geometry,
//   wireframe = false
// ) {
//   console.log(geometry)
//   const { col1, col2, col3, col4 } = palette
//   return new ShaderMaterial({
//     side: DoubleSide,
//     wireframe,
//     uniforms: {
//       u_bg: { type: 'v3', value: col1 },
//       u_bgMain: { type: 'v3', value: col1 },
//       u_color1: { type: 'v3', value: col1 },
//       u_color2: { type: 'v3', value: col4 },
//       u_time: { type: 'f', value: 30 },
//       u_randomisePosition: { type: 'v2', value: randomisePosition },
//       bboxMin: {
//         value: {
//           x: -9.523809432983398,
//           y: -5,
//           z: -6.349206447601318,
//         },
//       },
//       bboxMax: {
//         value: {
//           x: 10.901825904846191,
//           y: 5,
//           z: 6.349206447601318,
//         },
//       },
//       color1: {
//         value: new Color('red'),
//       },
//       color2: {
//         value: new Color('purple'),
//       },
//     },
//     vertexShader: `

//     uniform vec3 bboxMin;
//     uniform vec3 bboxMax;

//     varying vec2 vUv;

//     void main() {
//       vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
//     }
//     `,
//     fragmentShader: `
//     uniform vec3 color1;
//     uniform vec3 color2;

//     varying vec2 vUv;

//     void main() {

//       gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
//     }
//       `,
//   })
// }
