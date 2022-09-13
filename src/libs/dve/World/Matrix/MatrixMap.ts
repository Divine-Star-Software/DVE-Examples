import { VoxelSubstanceMap, VoxelSubstanceRecord } from "../../Constants/Voxels/VoxelData.js";
import { DVEW } from "../DivineVoxelEngineWorld.js";

export const MatrixMap = {
 shapeMap: <Record<string, number>>{},

 substanceMap: VoxelSubstanceMap,
 substanceRecord: VoxelSubstanceRecord,

 __shapeMapSet: false,

 isReady() {
  if (DVEW.environment == "node") {
   return true;
  } else {
   return this.__shapeMapSet;
  }
 },

 setShapeMap(shapeMap: Record<string, number>) {
  this.shapeMap = shapeMap;
  this.__shapeMapSet = true;
 },

 flush() {
  (this as any).shapeMap = null;
 },
};
