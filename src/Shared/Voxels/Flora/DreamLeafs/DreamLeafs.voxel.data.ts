import type { VoxelData } from "libs/dve/Meta/index";

export const DreamLeafsVoxelData: VoxelData ={
    name: "Dream Leafs",
    shapeId: "Box",
    id: "dve:dream-leafs",
    substance: "flora",
    material : "grass",
    hardnress : 1000,
    physics : {
        collider : "Box",
        checkCollisions : true
     }
   };