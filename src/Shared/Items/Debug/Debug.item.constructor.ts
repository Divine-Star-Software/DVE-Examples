import { ItemConstructorObject } from "../../../libs/dve/Meta/Items/Item.types";
let uv = 0;
export const DebugItemConstructorObject: ItemConstructorObject = {
 id: "dve:debug-item",
 shapeId: "debug",
 hooks: {
  texturesRegistered: (DVEB) => {
   uv = DVEB.textureManager.getTextureUV("Item", "debug");
  },
 },
 process(data, DVEB) {
  data.uvs.push(uv);
 },
};
