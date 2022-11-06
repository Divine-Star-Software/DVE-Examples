import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
    _type0(tx, ty, tz) {
        if (ty == 16) {
            brush.paint();
        }
    },
    _type1(tx, ty, tz) {
        if (tz == 1) {
            brush.paint();
        }
    },
    _type2(tx, ty, tz) {
        if (tx == 30) {
            brush.paint();
        }
    },
    generateChunk(chunkX, chunkY, chunkZ, type) {
        for (let x = chunkX; x < chunkX + 16; x++) {
            for (let z = chunkZ; z < chunkZ + 16; z++) {
                for (let y = 0; y < 32; y++) {
                    brush.setXYZ(x, y, z).setId("dve:liquiddreamether");
                    if (type == 0) {
                        this._type0(x, y, z);
                    }
                    if (type == 1) {
                        this._type1(x, y, z);
                    }
                    if (type == 2) {
                        this._type2(x, y, z);
                    }
                }
            }
        }
    },
};
