import type { VoxelConstructorObject } from "libs/dve/Meta/index";
let topUV = 0;
let bottomUV = 0;
let northUV = 0;
let southUV = 0;
let eastUV = 0;
let westUV = 0;
export const DebugBoxVoxelBuilderThread: VoxelConstructorObject = {
 id: "dve:debugbox",

 hooks: {
  texturesRegistered: (DVEB) => {
   topUV = DVEB.textureManager.getTextureUV("solid", "debug", "top");
   bottomUV = DVEB.textureManager.getTextureUV("solid", "debug", "bottom");
   northUV = DVEB.textureManager.getTextureUV("solid", "debug", "north");
   southUV = DVEB.textureManager.getTextureUV("solid", "debug", "south");
   eastUV = DVEB.textureManager.getTextureUV("solid", "debug", "east");
   westUV = DVEB.textureManager.getTextureUV("solid", "debug", "west");
  },
 },
 process(data, DVEB) {
  if (data.exposedFaces[0]) {
   data.uvTemplate.push(topUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  if (data.exposedFaces[1]) {
   data.uvTemplate.push(bottomUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  if (data.exposedFaces[2]) {
   data.uvTemplate.push(eastUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  if (data.exposedFaces[3]) {
   data.uvTemplate.push(westUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  if (data.exposedFaces[4]) {
   data.uvTemplate.push(southUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  if (data.exposedFaces[5]) {
   data.uvTemplate.push(northUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }

  DVEB.processor.processVoxelLight(data);
 },
};
