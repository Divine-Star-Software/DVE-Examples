import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
    generateChunk(chunkX, chunkZ) {
        brush.start().setId("dve:dreamstone");
        for (let x = chunkX; x < 16 + chunkX; x++) {
            for (let z = chunkZ; z < 16 + chunkZ; z++) {
                for (let y = 0; y < 18; y++) {
                    if (y < 5) {
                        brush.setXYZ(x, y, z).paint();
                    }
                }
            }
        }
        brush.stop();
    },
};
