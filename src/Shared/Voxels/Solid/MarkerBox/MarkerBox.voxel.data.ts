import type { VoxelData } from "libs/dve/Meta/index";

export const MarkerBoxVoxelData: VoxelData = {
 name: "Marker Box",
 shapeId: "Box",
 id: "dve:markerbox",
 substance: "solid",
 lightSource: false,
 material: "stone",
 hardnress: 1000,
 states : 15,
 physics: {
  collider: "Box",
  checkCollisions: true,
 },
};
