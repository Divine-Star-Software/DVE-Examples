import { ItemConstructorObject } from "libs/dve/Meta/Items/Item.types";

let uv = 0;
export const DreamVineItemConstructorObject: ItemConstructorObject = {
 id: "dve:dreamvine-item",
 shapeId: "vine",
 hooks: {
  texturesRegistered: (DVEB) => {
   uv = DVEB.textureManager.getTextureUV("Item", "dream-vine");
  },
 },
 process(data, DVEB) {
  data.uvs.push(uv);
 },
};
