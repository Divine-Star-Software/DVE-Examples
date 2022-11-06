import { DVEW } from "../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
export const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    worldHeight: 256,
    minY: 60,
    generateHoleChunk(chunkX, chunkZ) {
        let rx = 0;
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            let rz = 0;
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.worldHeight; y++) {
                    if (rx == 0 || rz == 0 || rx == 15 || rz == 15) {
                        if (y > this.minY)
                            break;
                        if (y == this.minY) {
                            brush.setId("dve:dreadstone").setXYZ(x, y, z).paint();
                            if (Math.random() > 0.8) {
                                brush
                                    .setId("dve:dreadgrass")
                                    .setXYZ(x, y + 1, z)
                                    .paint();
                            }
                        }
                    }
                    if (rx == 1 || rz == 1 || rx == 14 || rz == 14) {
                        if (y == this.minY - 1) {
                            brush.setId("dve:dreadstone").setXYZ(x, y, z).paint();
                            if (Math.random() > 0.8) {
                                brush
                                    .setId("dve:dreadgrass")
                                    .setXYZ(x, y + 1, z)
                                    .paint();
                            }
                        }
                    }
                    if (rx == 2 || rz == 2 || rx == 13 || rz == 13) {
                        if (y == this.minY - 2) {
                            brush.setId("dve:dreadstone").setXYZ(x, y, z).paint();
                            if (Math.random() > 0.8) {
                                brush
                                    .setId("dve:dreadgrass")
                                    .setXYZ(x, y + 1, z)
                                    .paint();
                            }
                        }
                    }
                    if (rx == 3 || rz == 3 || rx == 12 || rz == 12) {
                        if (y == this.minY - 3) {
                            brush.setId("dve:dreadstone").setXYZ(x, y, z).paint();
                            if (Math.random() > 0.8) {
                                brush
                                    .setId("dve:dreadgrass")
                                    .setXYZ(x, y + 1, z)
                                    .paint();
                            }
                        }
                    }
                    if (rx == 4 || rz == 4 || rx == 11 || rz == 11) {
                        if (y == this.minY - 4) {
                            brush.setId("dve:dreadstone").setXYZ(x, y, z).paint();
                            if (Math.random() > 0.8) {
                                brush
                                    .setId("dve:dreadgrass")
                                    .setXYZ(x, y + 1, z)
                                    .paint();
                            }
                        }
                    }
                    if (rx == 5 || rz == 5 || rx == 10 || rz == 10) {
                        if (y == this.minY - 5) {
                            brush.setId("dve:dreadstone").setXYZ(x, y, z).paint();
                            if (Math.random() > 0.8) {
                                brush
                                    .setId("dve:dreadgrass")
                                    .setXYZ(x, y + 1, z)
                                    .paint();
                            }
                        }
                    }
                    if (rx == 6 || rz == 6 || rx == 9 || rz == 9) {
                        if (y == this.minY - 6) {
                            brush.setId("dve:dreadstone").setXYZ(x, y, z).paint();
                            if (Math.random() > 0.8) {
                                brush
                                    .setId("dve:dreadgrass")
                                    .setXYZ(x, y + 1, z)
                                    .paint();
                            }
                        }
                    }
                    if (y < this.minY - 7) {
                        brush.setId("dve:dreadstone").setXYZ(x, y, z).paint();
                        if (Math.random() > 0.8) {
                            brush
                                .setId("dve:dreadgrass")
                                .setXYZ(x, y + 1, z)
                                .paint();
                        }
                    }
                }
                rz++;
            }
            rx++;
        }
    },
    generateNormalChunk(chunkX, chunkZ) {
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.worldHeight; y++) {
                    if (y > this.minY + 1)
                        break;
                    if (y <= this.minY) {
                        brush.setId("dve:dreadstone").setXYZ(x, y, z).paint();
                    }
                    if (y == this.minY + 1) {
                        if (Math.random() > 0.8) {
                            brush.setId("dve:dreadgrass").setXYZ(x, y, z).paint();
                        }
                    }
                }
            }
        }
    },
    //1376271
    generateRoofChunk(chunkX, chunkZ) {
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.minY + 10; y++) {
                    brush.setXYZ(x, y, z);
                    if (y < this.minY - 3) {
                        brush.setId("dve:dreadstone").paint();
                    }
                    if (y == this.minY - 3 && Math.random() > 0.8) {
                        brush.setId("dve:dreadgrass").paint();
                    }
                    if (y == this.minY) {
                        brush.setId("dve:dreadstonepillar").paint();
                    }
                }
            }
        }
    },
    generateBoxChunk(chunkX, chunkZ) {
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.minY + 10; y++) {
                    brush.setXYZ(x, y, z);
                    if (y < this.minY - 3) {
                        brush.setId("dve:dreadstone").paint();
                    }
                    if (y == this.minY - 3 && Math.random() > 0.8) {
                        brush.setId("dve:dreadgrass").paint();
                    }
                    if (y == this.minY) {
                        brush.setId("dve:dreadstonepillar").paint();
                    }
                    if (y == this.minY + 5) {
                        brush.setId("dve:dreadstonepillar").paint();
                    }
                    if (y >= this.minY &&
                        y <= this.minY + 5 &&
                        (x == chunkX || x == chunkX + 15 || z == chunkZ || z == chunkZ + 15)) {
                        brush.setId("dve:dreadstonepillar").paint();
                    }
                }
            }
        }
    },
    generateWorldColumn(chunkX, chunkZ) {
        brush.start();
        let toss = Math.random();
        if ((chunkX == 0 && chunkZ == 0) ||
            (chunkX == 0 && chunkZ == -16) ||
            (chunkX == -16 && chunkZ == -0) ||
            (chunkX == -16 && chunkZ == -16)) {
            this.generateRoofChunk(chunkX, chunkZ);
            return;
        }
        if (toss < 0.3) {
            this.generateBoxChunk(chunkX, chunkZ);
            return;
        }
        if (toss > 0.6) {
            this.generateHoleChunk(chunkX, chunkZ);
            return;
        }
        this.generateNormalChunk(chunkX, chunkZ);
        brush.stop();
    },
};
