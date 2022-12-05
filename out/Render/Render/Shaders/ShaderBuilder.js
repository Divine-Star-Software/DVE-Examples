//shared functions
import { SharedFogFunctions } from "./Code/Shared/Fog/FogShaderFunctions.js";
import { ShaderNoiseFunctions } from "./Code/Shared/Noise/NoiseShaderFunctions.js";
import { SharedFragmentShader } from "./Code/Shared/Fragment/FragmentShader.js";
import { CommonShader } from "./Code/Shared/ComonShader.js";
import { SharedVertexShader } from "./Code/Shared/Vertex/VertexShader.js";
import { skyboxShaders } from "./Code/SkyBox/SkyBox.shader.js";
import { VoxelShaders } from "./Code/Voxel/VoxelShader.js";
/**# ShaderBuilder
 *---
 * Helps construct raw text shaders.
 */
export const ShaderBuilder = {
    buildVertexShader(data, setPosition, doAO = true, vars = "") {
        return `
${SharedVertexShader.top}
${SharedVertexShader.attributes()}
${SharedVertexShader.uniforams}
${SharedVertexShader.varying()}
${SharedVertexShader.optionVars()}
${ShaderNoiseFunctions.fbm2}
${SharedVertexShader.useTime(true)}
${SharedFogFunctions.fogVertexTop}
${data.uvs.uniformRegisterCode}
${data.overlayUVs.uniformRegisterCode}
${data.uvs.animationFunctionCode}
${data.overlayUVs.animationFunctionCode}
${vars}
${SharedVertexShader.getAnimationType}
${SharedVertexShader.animationFunctions}
${CommonShader.getMainFunction(`
 ${setPosition}
 ${SharedFogFunctions.fogVertexMain}
 ${SharedVertexShader.passTime}
 ${SharedVertexShader.setUVInMain}
 ${doAO ? SharedVertexShader.doAO : ""}
 ${SharedVertexShader.doRGB}
 ${SharedVertexShader.doSun}
 ${SharedVertexShader.doColors}
 ${SharedVertexShader.doNormals}
 ${SharedVertexShader.updateVarying}
 ${SharedVertexShader.passAnimationState}
`)}
`;
    },
    buildFragmentShader(fragMain, doAO = true, vars = "") {
        return `
  ${SharedFragmentShader.top}
  ${SharedFragmentShader.hsv2rgbSmooth}
  ${SharedFragmentShader.useTime}
  ${ShaderNoiseFunctions.fbm3}
  ${SharedFogFunctions.fogFragConstants}
  ${SharedFragmentShader.optionVariables()}
  ${SharedFragmentShader.varying()}
  ${SharedFogFunctions.fogFragVars}
  ${SharedFogFunctions.fogFunctions}
  ${SharedFragmentShader.getColor}
  ${doAO ? SharedFragmentShader.getAO : ""}
  ${SharedFragmentShader.getLight}
  ${SharedFragmentShader.doFog}
  ${SharedFragmentShader.doVFog}
  ${vars}
  ${CommonShader.getMainFunction(`
  ${fragMain}
  `)}`;
    },
    getDefaultVertexShader(voxelSubstance, data) {
        if (voxelSubstance == "magma") {
            return this.buildVertexShader(data, VoxelShaders.liquid.vertexWave, false, VoxelShaders.liquid.vertexVars);
        }
        if (voxelSubstance == "flora") {
            return this.buildVertexShader(data, VoxelShaders.flora.setPosition);
        }
        if (voxelSubstance == "liquid") {
            return this.buildVertexShader(data, VoxelShaders.liquid.vertexWave, false, VoxelShaders.liquid.vertexVars);
        }
        if (voxelSubstance == "solid") {
            return this.buildVertexShader(data, SharedVertexShader.standardPositionMain);
        }
        if (voxelSubstance == "Item") {
            return this.buildVertexShader(data, SharedVertexShader.standardPositionMain, false);
        }
        return "";
    },
    getDefaultFragmentShader(voxelSubstance) {
        if (voxelSubstance == "solid") {
            return this.buildFragmentShader(VoxelShaders.solid.fragMain);
        }
        if (voxelSubstance == "magma") {
            return this.buildFragmentShader(VoxelShaders.liquid.fragMain, false, VoxelShaders.liquid.fragVars);
        }
        if (voxelSubstance == "liquid") {
            return this.buildFragmentShader(VoxelShaders.liquid.fragMain, false, VoxelShaders.liquid.fragVars);
        }
        if (voxelSubstance == "flora") {
            return this.buildFragmentShader(VoxelShaders.flora.fragMain);
        }
        if (voxelSubstance == "Item") {
            return this.buildFragmentShader(VoxelShaders.item.fragMain, false);
        }
        return "";
    },
    getSkyBoxVertexShader() {
        return `
${SharedVertexShader.top}
${SharedVertexShader.defaultAttributes}
${SharedVertexShader.uniforams}
${SharedVertexShader.defaultVarying}
${SharedVertexShader.useTime(true)}
${SharedFogFunctions.fogVertexTop}
${CommonShader.getMainFunction(`
 ${SharedVertexShader.standardPositionMain}
 ${SharedVertexShader.passTime}
 ${SharedVertexShader.updateVarying}
 ${SharedFogFunctions.fogVertexMain}
`)}
`;
    },
    getSkyBoxFragmentShader() {
        return `
${SharedFragmentShader.top}
${SharedFragmentShader.defaultVarying}
${SharedFragmentShader.useTime}
${ShaderNoiseFunctions.fbm3}
${SharedFogFunctions.fogFragConstants}
${SharedFogFunctions.fogFragVars}
${SharedFogFunctions.fogFunctions}
${SharedFragmentShader.doFog}
${CommonShader.getMainFunction(`
${skyboxShaders.fragMain}
`)}`;
    },
};
