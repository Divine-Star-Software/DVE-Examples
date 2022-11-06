import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
    generateChunk(chunkX, chunkY, chunkZ) {
        let maxY = 30;
        for (let x = chunkX; x < chunkX + 16; x++) {
            for (let z = chunkZ; z < chunkZ + 16; z++) {
                for (let y = 0; y < maxY; y++) {
                    brush.setXYZ(x, y, z);
                    if (y < maxY - 2) {
                        brush.setId("dve:dreamstonepillar").paint();
                    }
                    if (y == maxY - 2) {
                        brush.setId("dve:dreamlamp").paint();
                    }
                }
            }
        }
    },
};
