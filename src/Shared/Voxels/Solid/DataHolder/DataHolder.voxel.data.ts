import { VoxelData } from "libs/dve/Meta/index";

export const DataHolderVoxelData: VoxelData = {
 name: "Data Holder",
 shapeId: "Box",
 id: "dve:dataholder",
 substance: "solid",
 material : "stone",
 hardnress : 1000,
 isRich : true,
 physics: {
  collider: "Box",
  checkCollisions: true,
 },
};
