// tutorial: https://tympanus.net/codrops/2021/01/26/twisted-colorful-spheres-with-three-js/
// codepen: https://codepen.io/marioecg/pen/mdrvgpq
// palletes: https://iquilezles.org/articles/palettes/

import { ShaderMaterial, DoubleSide } from 'three'
import { sphereNoise } from '../../utils'
const rotation = `
  mat3 rotation3dY(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat3(
      c, 0.0, -s,
      0.0, 1.0, 0.0,
      s, 0.0, c
    );
  }
  
  vec3 rotateY(vec3 v, float angle) {
    return rotation3dY(angle) * v;
  }  
`

const vertexShader = `  
  varying vec2 vUv;
  varying float vDistort;
  
  uniform float uTime;
  uniform float uSpeed;
  uniform float uNoiseDensity;
  uniform float uNoiseStrength;
  uniform float uFrequency;
  uniform float uAmplitude;
  
  ${sphereNoise}
  
  ${rotation}
  
  void main() {
    vUv = uv;
    
    float t = uTime * uSpeed;
    float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;

    vec3 pos = position + (normal * distortion);
    float angle = sin(uv.y * uFrequency + t) * uAmplitude;
    pos = rotateY(pos, angle);    
    
    vDistort = distortion;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
  }  
`

const fragmentShader = `
  varying vec2 vUv;
  varying float vDistort;
  
  uniform float uTime;
  uniform float uIntensity;
  
  vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
  }     
  
  void main() {
    float distort = vDistort * uIntensity;
    
    vec3 brightness = vec3(0.01, 0.1, .6);
    vec3 contrast = vec3(1., .1, .012);
    vec3 oscilation = vec3(.3, 1., 1.);
    vec3 phase = vec3(.9, .02, 1.4);
  
    vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);
    
    gl_FragColor = vec4(color, 1.0);
  }  
`

const twistedMaterial = (
  speed,
  density,
  strength,
  frequency,
  amplitude,
  intensity
) =>
  new ShaderMaterial({
    side: DoubleSide,
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uNoiseDensity: { value: density },
      uNoiseStrength: { value: strength },
      uFrequency: { value: frequency },
      uAmplitude: { value: amplitude },
      uIntensity: { value: intensity },
    },
  })

export default twistedMaterial
