import { WorldPlayer } from "../../Shared/Player/World/WorldPlayer.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { GetAnalyzerCubeWorld } from "../../Shared/Debug/Anaylzer/Cube.js";
import { VoxelReader } from "../../../out/Data/Voxel/VoxelByte.js";
RegisterVoxels(DVEW);
await DVEW.$INIT();
console.log("start");
const numChunks = 2;
let startX = -16 * numChunks;
let startZ = -16 * numChunks;
let endX = 16 * numChunks;
let endZ = 16 * numChunks;
const builder = DVEW.getBuilder();
const tasks = DVEW.getTasksTool();
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        WorldGen.generateWorldColumn(x, z);
        tasks.light.worldSun.add(x, z);
    }
}
await tasks.light.worldSun.runAndAwait();
for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
        builder.setXZ(x, z).buildColumn();
    }
}
GetAnalyzerCubeWorld(DVEW);
await WorldPlayer(DVEW);
self.tasks = DVEW.getTasksTool();
self.builder = DVEW.getBuilder();
self.dt = DVEW.getDataTool();
self.VR = VoxelReader;
self.DVEW = DVEW;
