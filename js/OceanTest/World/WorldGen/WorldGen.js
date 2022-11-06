import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
    generateChunk(chunkX, chunkZ) {
        let baseY = 0;
        let maxY = 31;
        brush.start();
        for (let x = chunkX; x < chunkX + 16; x++) {
            for (let z = chunkZ; z < chunkZ + 16; z++) {
                for (let y = 0; y < 50; y++) {
                    brush.setXYZ(x, y, z);
                    if (y > baseY && y <= maxY) {
                        brush.setId("dve:liquiddreamether").paint();
                    }
                    if (y == baseY) {
                        brush.setId("dve:dreamstone").paint();
                    }
                }
            }
        }
        brush.stop();
    },
};
