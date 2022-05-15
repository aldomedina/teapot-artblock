import {
  MeshStandardMaterial,
  CanvasTexture,
  ShaderMaterial,
  DoubleSide,
  Color,
} from 'three'
import { getRGBfromVector3, randomisePosition } from '../../utils'

// FOUR COLORS GRADIENT
export default function createGradientTexture(palette) {
  const { col1, col2, col3, col4 } = palette
  return new ShaderMaterial({
    side: DoubleSide,
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
          y: 3.5,
          z: 6.349206447601318,
        },
      },
      firstColor: {
        value: new Color(getRGBfromVector3(col1)),
      },
      secondColor: {
        value: new Color(getRGBfromVector3(col2)),
      },
      thirdColor: {
        value: new Color(getRGBfromVector3(col3)),
      },
      fourthColor: {
        value: new Color(getRGBfromVector3(col4)),
      },
      lights: true, // add this,
      fog: true,
    },
    vertexShader: `

    uniform vec3 bboxMin;
    uniform vec3 bboxMax;

    varying vec2 vUv;

    void main() {
      vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
    `,
    fragmentShader: `
    uniform vec3 firstColor;
    uniform vec3 secondColor;
    uniform vec3 thirdColor;
    uniform vec3 fourthColor;

    varying vec2 vUv;        
    
    void main() {
      float h = 0.333; // adjust position of middleColor
      
      vec3 col1 = mix(mix(firstColor, secondColor, vUv.y/h), mix(secondColor, thirdColor, (vUv.y - h)/(1.0 - h*2.0)), step(h, vUv.y));  
      vec3 col2 = mix(mix(secondColor, thirdColor, (vUv.y - h)/(1.0 - h*2.0)), mix(thirdColor, fourthColor, (vUv.y - h*2.0)/(1.0-h*2.0)), step(h*2.0, vUv.y));
      vec3 finalColor = mix(col1,col2,step(h*2.0,vUv.y));

      gl_FragColor = vec4(finalColor, 1.0);
    }
      `,
  })
}

// THREE COLORS
// export default function createGradientTexture(palette) {
//   const { col1, col2, col3, col4 } = palette
//   return new ShaderMaterial({
//     side: DoubleSide,
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
//           y: 3.5,
//           z: 6.349206447601318,
//         },
//       },
//       firstColor: {
//         value: new Color('red'),
//       },
//       middleColor: {
//         value: new Color('green'),
//       },
//       endColor: {
//         value: new Color('yellow'),
//       },
//       color4: {
//         value: new Color('blue'),
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
//     uniform vec3 firstColor;
//     uniform vec3 middleColor;
//     uniform vec3 endColor;

//     varying vec2 vUv;

//     void main() {
//       float h = 0.5; // adjust position of middleColor

//       vec3 finalColor = mix(mix(firstColor, middleColor, vUv.y/h), mix(middleColor, endColor, (vUv.y - h)/(1.0 - h)), step(h, vUv.y));

//       gl_FragColor = vec4(finalColor, 1.0);
//     }
//       `,
//   })
// }

// TWO COLORS
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
