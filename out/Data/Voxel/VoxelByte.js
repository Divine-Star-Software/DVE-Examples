const voxelStateMasks = {
    level: 0b00_1111,
    levelState: 0b11_0000,
    shapeState: 0b1111_1111_11_00_0000,
    extraVoxelId: 0xffff0000,
};
/**# Voxel Byte
 * ---
 * Used to decode voxel data.
 */
export const VoxelReader = {
    setId(id, value) {
        return (value & ~(0xffff << 16)) | (id << 16);
    },
    getId(value) {
        return (value & (0xffff << 16)) >> 16;
    },
    getLight(voxelData) {
        return voxelData & 0xffff;
    },
    setLight(voxelData, encodedLight) {
        return (voxelData & ~0xffff) | encodedLight;
    },
    getLevel(stateData) {
        return stateData & voxelStateMasks.level;
    },
    setLevel(stateData, level) {
        return (stateData & ~voxelStateMasks.level) | level;
    },
    getLevelState(stateData) {
        return (stateData & voxelStateMasks.levelState) >> 4;
    },
    setLevelState(stateData, levelState) {
        return (stateData & ~voxelStateMasks.levelState) | (levelState << 4);
    },
    getShapeState(voxelData) {
        return (voxelData & voxelStateMasks.shapeState) >> 6;
    },
    setShapeState(voxelData, shapeState) {
        return (voxelData & ~voxelStateMasks.shapeState) | (shapeState << 6);
    },
};
