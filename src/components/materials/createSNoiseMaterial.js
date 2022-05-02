// https://javascript.plainenglish.io/making-an-animated-html5-canvas-gradient-effect-62e7f84d7c2f
// https://github.com/smpnjn/webgl-gradient
// https://codepen.io/smpnjn/pen/pobGMKp

import { ShaderMaterial, DoubleSide } from 'three'
import { randomisePosition, sNoise } from '../../utils'

function createSNoiseMaterial(color1, color2, color3, color4, isDistorted) {
  return new ShaderMaterial({
    side: DoubleSide,
    uniforms: {
      u_bg: { type: 'v3', value: color1 },
      u_bgMain: { type: 'v3', value: color2 },
      u_color1: { type: 'v3', value: color3 },
      u_color2: { type: 'v3', value: color4 },
      u_time: { type: 'f', value: 30 },
      u_randomisePosition: { type: 'v2', value: randomisePosition },
    },
    vertexShader:
      sNoise +
      `
      uniform float u_time;
      uniform vec2 u_randomisePosition;

      varying float vDistortion;
      varying float xDistortion;
      varying vec2 vUv;

      void main() {
          vUv = uv;
          vec3 pos = position;
          ${
            isDistorted
              ? ` vDistortion = snoise(vUv.xx * 3. - u_randomisePosition * 0.15);
          xDistortion = snoise(vUv.yy * 1. - u_randomisePosition * 0.05);
          pos.z += (vDistortion * 35.);
          pos.x += (xDistortion * 25.);`
              : ''
          }


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

export { createSNoiseMaterial }
