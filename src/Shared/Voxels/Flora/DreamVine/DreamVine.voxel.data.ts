import type { VoxelData } from "libs/dve/Meta/index";

export const DreamVineVoxelData: VoxelData = {
 name: "Dream Vine",
 shapeId: "Panel",
 id: "dve:dreamvine",
 substance: "flora",
 material : "grass",
 hardnress : 1000,
 physics : {
    collider : "Box",
    checkCollisions : true
 }
};

