import { DVER } from "../../../DivineVoxelEngineRender.js";
export const FloraMaterial = {
    material: null,
    getMaterial() {
        return this.material;
    },
    setSunLightLevel(level) {
        if (!this.material) {
            throw new Error("Material must be created first before it can be updated.");
        }
        this.material.setFloat("sunLightLevel", level);
    },
    setBaseLevel(level) {
        if (!this.material) {
            throw new Error("Material must be created first before it can be updated.");
        }
        this.material.setFloat("baseLevel", level);
    },
    updateMaterialSettings(settings) {
        if (!this.material) {
            throw new Error("Material must be created first before it can be updated.");
        }
        if (settings.lighting?.doAO) {
            this.material.setFloat("doAO", 1.0);
        }
        else {
            this.material.setFloat("doAO", 0.0);
        }
        if (settings.lighting?.doSunLight) {
            this.material.setFloat("doSun", 1.0);
        }
        else {
            this.material.setFloat("doSun", 0.0);
        }
        if (settings.lighting?.doRGBLight) {
            this.material.setFloat("doRGB", 1.0);
        }
        else {
            this.material.setFloat("doRGB", 0.0);
        }
        if (settings.voxels?.doColors) {
            this.material.setFloat("doColor", 1.0);
        }
        else {
            this.material.setFloat("doColor", 0.0);
        }
    },
    createMaterial(data) {
        const animData = DVER.renderManager.animationManager.registerAnimations("flora", data.animations, data.animationTimes);
        const overlayAnimData = DVER.renderManager.animationManager.registerAnimations("flora", data.overlayAnimations, data.overlayAnimationTimes, true);
        BABYLON.Effect.ShadersStore["floraVertexShader"] =
            DVER.renderManager.shaderBuilder.getDefaultVertexShader("flora", animData.uniformRegisterCode, animData.animationFunctionCode, overlayAnimData.uniformRegisterCode, overlayAnimData.animationFunctionCode);
        BABYLON.Effect.ShadersStore["floraFragmentShader"] =
            DVER.renderManager.shaderBuilder.getDefaultFragmentShader("flora");
        const shaderMaterial = new BABYLON.ShaderMaterial("flora", data.scene, "flora", {
            attributes: [
                "position",
                "normal",
                "faceData",
                "cuv3",
                "ocuv3",
                "aoColors",
                "colors",
                "rgbLightColors",
                "sunLightColors",
            ],
            uniforms: [
                "world",
                "view",
                "viewProjection",
                "worldView",
                "worldViewProjection",
                "vFogInfos",
                "vFogColor",
                "cameraPosition",
                "sunLightLevel",
                "baseLevel",
                "projection",
                "arrayTex",
                "overlayTex",
                "doAO",
                "doSun",
                "doRGB",
                "doColor",
                ...animData.uniforms,
                ...overlayAnimData.uniforms,
            ],
            needAlphaBlending: false,
            needAlphaTesting: true,
        });
        shaderMaterial.fogEnabled = true;
        data.texture.hasAlpha = true;
        data.overlayTexture.hasAlpha = true;
        shaderMaterial.setTexture("arrayTex", data.texture);
        shaderMaterial.setTexture("overlayTex", data.overlayTexture);
        // shaderMaterial.alphaMode = BABYLON.Engine.ALPHA_COMBINE;
        // shaderMaterial.backFaceCulling = false;
        // shaderMaterial.separateCullingPass = false;
        // shaderMaterial.needDepthPrePass = true;
        shaderMaterial.onBind = (mesh) => {
            const effect = shaderMaterial.getEffect();
            const scene = mesh.getScene();
            if (!effect)
                return;
            effect.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity);
            effect.setColor3("vFogColor", scene.fogColor);
            effect.setColor4("baseLightColor", new BABYLON.Color3(0.5, 0.5, 0.5), 1);
        };
        let time = 0;
        data.scene.registerBeforeRender(function () {
            time += 0.005;
            shaderMaterial.setFloat("time", time);
        });
        this.material = shaderMaterial;
        DVER.renderManager.animationManager.registerMaterial("magma", shaderMaterial);
        this.updateMaterialSettings(data.settings);
        return this.material;
    },
};
