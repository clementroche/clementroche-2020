import { Uniform } from 'three'
import { Effect, BlendFunction } from 'postprocessing'

const fragment = `
  uniform sampler2D tFluid;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    // vec4 color = texture2D(tFluid,uv);
    // outputColor.rgb = color.rgb;
    // outputColor.a = 1.0;

    vec2 vUv = uv;

    vec3 fluid = texture2D(tFluid, vUv).rgb;
    vec2 vw = vUv - fluid.rg * 0.0002;

    outputColor = texture2D(inputBuffer, vw);

    // outputColor = texture2D(tFluid, vUv);
  }
`

export default class MouseFlowmapEffect extends Effect {
  constructor({ blendFunction = BlendFunction.NORMAL, flowmap = null } = {}) {
    super('MouseFlowmapEffect', fragment, {
      blendFunction,
      uniforms: new Map([['tFluid', new Uniform(flowmap)]])
    })
  }
}
