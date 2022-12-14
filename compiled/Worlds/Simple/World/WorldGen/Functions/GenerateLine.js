import { DVEW } from "../../../../../libs/dve/World/DivineVoxelEngineWorld.js";
const diagonalLineGenerators = {
    north: (voxel, shapeState, yStart, xzStart, start, end) => {
        let y = yStart;
        for (let z = start; z < end; z++) {
            DVEW.worldData.paintVoxel(voxel, 0, shapeState, xzStart, y, z);
            for (let zy = y - 1; zy >= yStart; zy--) {
                DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, shapeState, xzStart, zy, z);
            }
            y++;
        }
    },
    south: (voxel, shapeState, yStart, xzStart, start, end) => {
        let y = yStart;
        for (let z = start; z > end; z--) {
            DVEW.worldData.paintVoxel(voxel, 0, shapeState, xzStart, y, z);
            for (let zy = y - 1; zy >= yStart; zy--) {
                DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, shapeState, xzStart, zy, z);
            }
            y++;
        }
    },
    east: (voxel, shapeState, yStart, xzStart, start, end) => {
        let y = yStart;
        for (let x = start; x < end; x++) {
            DVEW.worldData.paintVoxel(voxel, 0, shapeState, x, y, xzStart);
            for (let zy = y - 1; zy >= yStart; zy--) {
                DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, shapeState, x, zy, xzStart);
            }
            y++;
        }
    },
    west: (voxel, shapeState, yStart, xzStart, start, end) => {
        let y = yStart;
        for (let x = start; x > end; x--) {
            DVEW.worldData.paintVoxel(voxel, 0, shapeState, x, y, xzStart);
            for (let zy = y - 1; zy >= yStart; zy--) {
                DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, shapeState, x, zy, xzStart);
            }
            y++;
        }
    },
};
export const GenerateDiagonalLine = (direction, voxel, shapeState, yStart, xzStart, start, end) => {
    diagonalLineGenerators[direction](voxel, shapeState, yStart, xzStart, start, end);
};
