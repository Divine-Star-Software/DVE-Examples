//types
import type { EngineSettingsData } from "Meta/index.js";
//objects
import { AnimationManager } from "./Animations/AnimationManager.js";
import { ShaderBuilder } from "./Shaders/ShaderBuilder.js";
import { TextureCreator } from "./Textures/TextureCreator.js";

//meshes
import { SolidMesh } from "./Meshes/Solid/SolidMesh.js";
import { FloraMesh } from "./Meshes/Flora/FloraMesh.js";
import { FluidMesh } from "./Meshes/Fluid/FluidMesh.js";
import { MagmaMesh } from "./Meshes/Magma/MagmaMesh.js";
import { ItemMesh } from "./Meshes/Item/ItemMesh.js";

//materials
import { SolidMaterial } from "./Materials/Solid/SolidMaterial.js";
import { FloraMaterial } from "./Materials/Flora/FloraMaterial.js";
import { FluidMaterial } from "./Materials/Fluid/FluidMaterial.js";
import { MagmaMaterial } from "./Materials/Magma/MagmaMaterial.js";
import { SkyBoxMaterial } from "./Materials/SkyBox/SkyBoxMaterial.js";
import { ItemMaterial } from "./Materials/Item/ItemMaterial.js";
import { StandardSolidMaterial } from "./Materials/Solid/Standard/SolidMaterial.bjsmp.js";
import { StandardFluidMaterial } from "./Materials/Fluid/Standard/FluidMaterial.bjsmp.js";

export const RenderManager = {
 shaderBuilder: ShaderBuilder,
 textureCreator: TextureCreator,
 animationManager: AnimationManager,

 solidMaterial: SolidMaterial,
 floraMaterial: FloraMaterial,
 fluidMaterial: FluidMaterial,
 magmaMaterial: MagmaMaterial,
 itemMaterial: ItemMaterial,

 solidStandardMaterial: StandardSolidMaterial,
 fluidStandardMaterial: StandardFluidMaterial,

 skyBoxMaterial: SkyBoxMaterial,

 solidMesh: SolidMesh,
 floraMesh: FloraMesh,
 fluidMesh: FluidMesh,
 magmaMesh: MagmaMesh,
 itemMesh: ItemMesh,

 scene: <BABYLON.Scene | null>null,

 reStart() {},

 setScene(scene: BABYLON.Scene) {
  this.scene = scene;
 },

 syncSettings(settings: EngineSettingsData) {
  this.solidMesh.syncSettings(settings);
  this.floraMesh.syncSettings(settings);
  this.fluidMesh.syncSettings(settings);
  this.magmaMesh.syncSettings(settings);
  this.itemMesh.syncSettings(settings);
 },

 getScene() {
  return this.scene;
 },

 createSkyBoxMaterial(scene?: BABYLON.Scene) {
  if (!this.scene && !scene) {
   throw new Error(`Must set a scene first.`);
  }
  if (!this.scene && scene) {
   this.skyBoxMaterial.createMaterial(scene);
  }
  if (this.scene && !scene) {
   this.skyBoxMaterial.createMaterial(this.scene);
  }
  return this.skyBoxMaterial.getMaterial();
 },

 setSunLevel(level: number) {
  this.solidMaterial.setSunLightLevel(level);
  this.fluidMaterial.setSunLightLevel(level);
  this.floraMaterial.setSunLightLevel(level);
  this.itemMaterial.setSunLightLevel(level);
 },
 setBaseLevel(level: number) {
  this.solidMaterial.setBaseLevel(level);
  this.fluidMaterial.setBaseLevel(level);
  this.floraMaterial.setBaseLevel(level);
  this.itemMaterial.setBaseLevel(level);
 },
};
