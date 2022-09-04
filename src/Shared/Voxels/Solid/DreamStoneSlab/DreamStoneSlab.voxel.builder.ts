import type { VoxelConstructorObject } from "libs/dve/Meta/index";let topUV = 0;
let bottomUV = 0;
let sideUV = 0;
export const DreamStoneSlabVoxelBuilderThread: VoxelConstructorObject = {
 id: "dve:dreamstoneslab",
 
 hooks: {
  texturesRegistered: (DVEB) => {
   topUV = DVEB.textureManager.getTextureUV(
    "solid",
    "dreamstone",
    "grassy-top"
   );
   bottomUV = DVEB.textureManager.getTextureUV("solid", "dreamstone");
   sideUV = DVEB.textureManager.getTextureUV(
    "solid",
    "dreamstone",
    "grassy-side"
   );
  },
 },
 process: function (data, DVEB) {
  if (data.exposedFaces[0]) {
   data.uvTemplate.push(topUV);
   data.overlayUVTemplate.push(0);
  } else {
   sideUV = bottomUV;
  }
  if (data.exposedFaces[1]) {
   data.uvTemplate.push(bottomUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  if (data.exposedFaces[2]) {
   data.uvTemplate.push(sideUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  if (data.exposedFaces[3]) {
   data.uvTemplate.push(sideUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  if (data.exposedFaces[4]) {
   data.uvTemplate.push(sideUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }
  if (data.exposedFaces[5]) {
   data.uvTemplate.push(sideUV);
   data.overlayUVTemplate.push(0, 0, 0, 0);
  }

  DVEB.processor.processVoxelLight(data);
  return;
 },
};
