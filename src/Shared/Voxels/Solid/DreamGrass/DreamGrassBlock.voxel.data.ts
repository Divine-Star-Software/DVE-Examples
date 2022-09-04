import type { VoxelData } from "libs/dve/Meta/index";

export const DreamGrassBlockVoxelData: VoxelData = {
    name: "Dream Grass Block",
    shapeId: "Box",
    id: "dve:dreamgrassblock",
    substance: "flora",
    material : "stone",
    hardnress : 1000,
    physics : {
        collider : "Box",
        checkCollisions : true
     }
   };
