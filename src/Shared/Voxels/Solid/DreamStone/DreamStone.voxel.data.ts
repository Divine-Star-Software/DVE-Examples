import type { VoxelData } from "libs/dve/Meta/index";

export const DreamStoneVoxelData: VoxelData = {
 name: "Dream Stone",
 shapeId: "Box",
 id: "dve:dreamstone",
 substance: "solid",
 states: 1,
 material : "stone",
 hardnress : 1000,
 physics : {
    collider : "Box",
    checkCollisions : true
 }
};
