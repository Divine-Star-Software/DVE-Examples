import type { VoxelData } from "libs/dve/Meta/index";

export const DreamStonePillarVoxelData: VoxelData = {
 name: "Dream Stone Pillar",
 shapeId: "Box",
 id: "dve:dreamstonepillar",
 substance: "solid",
 material : "stone",
 hardnress : 1000,
 physics : {
    collider : "Box",
    checkCollisions : true
 }
};
