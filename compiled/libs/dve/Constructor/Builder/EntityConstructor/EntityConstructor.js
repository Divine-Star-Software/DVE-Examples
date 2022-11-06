import { Util } from "../../../Global/Util.helper.js";
import { WorldMatrix } from "../../../Matrix/WorldMatrix.js";
export const EntityConstructor = {
    voxelData: [],
    _3dArray: Util.getEntityFlat3dArray(),
    voxelByte: Util.getVoxelByte(),
    lightByte: Util.getLightByte(),
    pos: { x: 0, y: 0, z: 0 },
    totalComposed: 1,
    width: 0,
    depth: 0,
    height: 0,
    setEntityData(x, y, z, width, height, depth, composed, voxelData) {
        this.pos.x = x;
        this.pos.y = y;
        this.pos.z = z;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.totalComposed = composed;
        this.voxelData = voxelData;
        this._3dArray.setBounds(width, height, depth);
    },
    getVoxel(x, y, z, composed = 1) {
        const rawVoxelData = this.voxelData[composed - 1];
        const voxelData = this._3dArray.getValue(x, y, z, rawVoxelData);
        const numericVoxelId = this.voxelByte.getId(voxelData);
        if (numericVoxelId == 0)
            return WorldMatrix._air;
        if (numericVoxelId == 1)
            return WorldMatrix._barrier;
        const paletteId = WorldMatrix.voxelPalette[numericVoxelId];
        const mapId = WorldMatrix.voxelPaletteMap[paletteId];
        return [paletteId, numericVoxelId - mapId];
    },
    getLevel(x, y, z, composed = 1) {
        const rawVoxelData = this.voxelData[composed];
        const stateData = this._3dArray.getValue(x, y, z, rawVoxelData);
        return this.voxelByte.decodeLevelFromVoxelData(stateData);
    },
    getLevelState(x, y, z, composed = 1) {
        const rawVoxelData = this.voxelData[composed];
        const stateData = this._3dArray.getValue(x, y, z, rawVoxelData);
        return this.voxelByte.decodeLevelStateFromVoxelData(stateData);
    },
    getShapeState(x, y, z, composed = 1) {
        const rawVoxelData = this.voxelData[composed];
        const stateData = this._3dArray.getValue(x, y, z, rawVoxelData);
        return this.voxelByte.getShapeState(stateData);
    },
    getLight(x, y, z, composed = 1) {
        const rawVoxelData = this.voxelData[composed - 1];
        const voxelData = this._3dArray.getValue(x, y, z, rawVoxelData);
        return this.voxelByte.decodeLightFromVoxelData(voxelData);
    },
    clearEntityData() {
        this.pos.x = 0;
        this.pos.y = 0;
        this.pos.z = 0;
        this.width = 0;
        this.height = 0;
        this.depth = 0;
        this.totalComposed = 0;
        this.voxelData = [];
    },
};
