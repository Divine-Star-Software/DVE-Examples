import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterItemData } from "../../Shared/Functions/RegisterItemData.js";
import { GetAnalyzerCubeWorld } from "../../Shared/Debug/Anaylzer/Cube.js";
RegisterVoxels(DVEW);
RegisterItemData(DVEW);
await DVEW.$INIT();
const builder = DVEW.getBuilder();
const dataTool = DVEW.getDataTool();
DVEW.data.dimensions.registerDimension("other", {
    fluidFlowSpeed: 1,
    magmaFlowSpeed: 1,
    sunLight: true,
});
for (let x = -16; x <= 16; x += 16) {
    for (let z = -16; z <= 16; z += 16) {
        WorldGen.generateChunk("main", x, z);
    }
}
for (let x = -64; x <= -32; x += 16) {
    for (let z = -64; z <= -32; z += 16) {
        WorldGen.generateChunk("other", x, z);
    }
}
builder.setDimension("main");
for (let x = -16; x <= 16; x += 16) {
    for (let z = -16; z <= 16; z += 16) {
        builder.setXZ(x, z).buildColumn();
    }
}
builder.setDimension("other");
for (let x = -64; x <= -32; x += 16) {
    for (let z = -64; z <= -32; z += 16) {
        builder.setXZ(x, z).buildColumn();
    }
}
GetAnalyzerCubeWorld(DVEW);
self.DVEW = DVEW;
self.dataTool = dataTool;
