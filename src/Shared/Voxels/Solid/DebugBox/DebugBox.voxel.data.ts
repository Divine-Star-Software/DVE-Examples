import type { VoxelData } from "libs/dve/Meta/index";

export const DebugBoxVoxelData: VoxelData = {
 name: "Debug Box",
 shapeId: "Box",
 id: "dve:debugbox",
 substance: "solid",
 material: "stone",
 hardnress: 1000,
 lightSource: true,
 lightValue: 0b1111_1111_1111_0000,
 physics: {
  collider: "Box",
  checkCollisions: true,
 },
};
