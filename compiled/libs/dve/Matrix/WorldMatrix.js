//objects
import { Util } from "../Global/Util.helper.js";
import { VoxelMatrix } from "./VoxelMatrix.js";
/**# World Matrix
 * ---
 * Hanldes the getting and setting of data that are loaded in the matrix.
 */
export const WorldMatrix = {
    _3dArray: Util.getFlat3DArray(),
    worldBounds: Util.getWorldBounds(),
    voxelByte: Util.getVoxelByte(),
    lightByte: Util.getLightByte(),
    heightByte: Util.getHeightByte(),
    chunkReader: Util.getChunkReader(),
    voxelMatrix: VoxelMatrix,
    _air: ["dve:air", 0],
    _barrier: ["dve:barrier", 0],
    //two minutes
    updateDieTime: 120000,
    loadDieTime: 10000,
    regions: {},
    chunks: {},
    chunkStates: {},
    paletteMode: 0,
    voxelPalette: {},
    voxelPaletteMap: {},
    voxelManager: null,
    lightValueFunctions: {
        r: (value) => {
            return WorldMatrix.lightByte.getR(value);
        },
        g: (value) => {
            return WorldMatrix.lightByte.getG(value);
        },
        b: (value) => {
            return WorldMatrix.lightByte.getB(value);
        },
        s: (value) => {
            return WorldMatrix.lightByte.getS(value);
        },
    },
    threadName: "",
    setVoxelManager(voxelManager) {
        this.voxelManager = voxelManager;
    },
    syncChunkBounds() {
        this.worldBounds.syncBoundsWithArrays();
    },
    getVoxelPaletteNumericId(voxelId, voxelState) {
        const numericID = this.voxelPaletteMap[voxelId];
        const stateId = voxelState + numericID;
        if (this.voxelPalette[stateId] != voxelId) {
            throw new Error(`${voxelState} is not a valid state for voxel with id : ${voxelId}`);
        }
        return stateId;
    },
    /**# Await Chunk Load
     * ---
     * Wait for a chunk to loaded into the matrix  for use.
     */
    awaitChunkLoad(x, y, z, timeout = 120000) {
        return Util.createPromiseCheck({
            check: () => {
                return this.getChunk(x, y, z) !== false;
            },
            checkInterval: 10,
            failTimeOut: timeout,
            onFail: () => {
                const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
                console.warn(`${this.threadName} could not load the chunk ${chunkKey} in time.`);
            },
        });
    },
    __setGlobalVoxelPalette(palette, map) {
        this.voxelPalette = palette;
        this.voxelPaletteMap = map;
    },
    getVoxel(x, y, z, secondary = false) {
        const numericVoxelId = this.getVoxelNumberID(x, y, z, secondary);
        if (numericVoxelId === false)
            return false;
        if (numericVoxelId == 0)
            return this._air;
        if (numericVoxelId == 1)
            return this._barrier;
        const paletteId = this.voxelPalette[numericVoxelId];
        const mapId = this.voxelPaletteMap[paletteId];
        return [paletteId, numericVoxelId - mapId];
    },
    getVoxelShapeState(x, y, z) {
        let data = this.getData(x, y, z, true);
        if (!data)
            data = 0;
        return this.voxelByte.getShapeState(data);
    },
    getLevel(x, y, z) {
        let data = this.getData(x, y, z, true);
        if (data < 0)
            data = 0;
        return this.voxelByte.decodeLevelFromVoxelData(data);
    },
    setLevel(level, x, y, z) {
        let data = this.getData(x, y, z, true);
        if (!data)
            data = 0;
        data = this.voxelByte.encodeLevelIntoVoxelData(data, level);
        this.setData(x, y, z, data, true);
    },
    getLevelState(x, y, z) {
        let data = this.getData(x, y, z, true);
        if (!data)
            data = 0;
        const state = this.voxelByte.decodeLevelStateFromVoxelData(data);
        return state;
    },
    setLevelState(state, x, y, z) {
        let data = this.getData(x, y, z, true);
        if (!data)
            data = 0;
        data = this.voxelByte.encodeLevelStateIntoVoxelData(data, state);
        this.setData(x, y, z, data, true);
    },
    setVoxel(voxelId, voxelStateId, shapeState, x, y, z) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk)
            return false;
        const voxelPaletteId = this.getVoxelPaletteNumericId(voxelId, voxelStateId);
        const voxelSubstance = this.voxelMatrix.getTrueSubstance(voxelPaletteId);
        const data = this.getVoxelPaletteIdForWorldGen(voxelId, voxelStateId);
        if (data < 0)
            return false;
        const voxelPOS = this.worldBounds.getVoxelPosition(x, y, z);
        this.__handleHeightMapUpdateForVoxelAdd(voxelPOS, voxelSubstance, chunk);
        let stateData = this.voxelByte.setShapeState(0, shapeState);
        this.chunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, data);
        this.chunkReader.setVoxelDataUseObj(chunk.data, voxelPOS, stateData, true);
    },
    __handleHeightMapUpdateForVoxelAdd(voxelPOS, voxelSubstance, chunk) {
        if (voxelSubstance == "transparent") {
            voxelSubstance = "solid";
        }
        this.heightByte.calculateHeightAddDataForSubstance(voxelPOS.y, voxelSubstance, voxelPOS.x, voxelPOS.z, chunk.data);
        this.heightByte.updateChunkMinMax(voxelPOS, chunk.data);
    },
    getVoxelPaletteIdForWorldGen(voxelId, voxelStateId) {
        const paletteId = WorldMatrix.getVoxelPaletteNumericId(voxelId, voxelStateId);
        if (paletteId) {
            return this.voxelByte.setId(paletteId, 0);
        }
        return -1;
    },
    getVoxelData(x, y, z, secondary = false) {
        if (!this.voxelManager) {
            throw new Error(`A voxel manager must be set in order for this function to work. `);
        }
        const voxelCheck = this.getVoxel(x, y, z, secondary);
        if (!voxelCheck) {
            return false;
        }
        if (voxelCheck[0] == "dve:air" || voxelCheck[0] == "dve:barrier")
            return false;
        const voxelData = this.voxelManager.getVoxelData(voxelCheck[0]);
        if (!voxelData)
            return false;
        return voxelData;
    },
    _createRegion(x, y, z) {
        const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
        const region = {
            chunks: {},
        };
        this.regions[regionKey] = region;
        return region;
    },
    /**# Set Chunk
     * ---
     * To be only called by the Matrix Hub.
     */
    __setChunk(x, y, z, chunkData, chunkStates) {
        const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
        let region = this.regions[regionKey];
        if (!region) {
            region = this._createRegion(x, y, z);
        }
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const worldColumnKey = this.worldBounds.getWorldColumnKeyFromObj(chunkPOS);
        const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
        if (!region.chunks[worldColumnKey])
            region.chunks[worldColumnKey] = {};
        region.chunks[worldColumnKey][chunkKey] = {
            data: new DataView(chunkData),
            chunkStates: new Uint8Array(chunkStates),
        };
    },
    getVoxelSubstance(x, y, z, secondary = false) {
        const data = this.getData(x, y, z, secondary);
        const vid = this.voxelByte.getId(data);
        return this.voxelMatrix.getTrueSubstance(vid);
    },
    getVoxelShapeId(x, y, z, secondary = false) {
        const data = this.getData(x, y, z, secondary);
        const vid = this.voxelByte.getId(data);
        return this.voxelMatrix.getShapeId(vid);
    },
    isVoxelALightSource(x, y, z, secondary = false) {
        const data = this.getData(x, y, z, secondary);
        const vid = this.voxelByte.getId(data);
        return this.voxelMatrix.isLightSource(vid);
    },
    getLightSourceValue(x, y, z, secondary = false) {
        const data = this.getData(x, y, z, secondary);
        const vid = this.voxelByte.getId(data);
        return this.voxelMatrix.getLightValue(vid);
    },
    isAir(x, y, z) {
        const data = this.getData(x, y, z);
        const vid = this.voxelByte.getId(data);
        return vid == 0;
    },
    getRegion(x, y, z) {
        const regionKey = this.worldBounds.getRegionKeyFromPosition(x, y, z);
        let region = this.regions[regionKey];
        if (!region)
            return false;
        return region;
    },
    /**# Remove Chunk
     * ---
     * To be only called by the Matrix Hub.
     */
    __removeChunk(x, y, z) {
        const region = this.getRegion(x, y, z);
        if (!region)
            return false;
        const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
        delete region.chunks[chunkKey];
    },
    getChunk(x, y, z) {
        const region = this.getRegion(x, y, z);
        if (!region)
            return false;
        const chunkPOS = this.worldBounds.getChunkPosition(x, y, z);
        const worldColumnKey = this.worldBounds.getWorldColumnKeyFromObj(chunkPOS);
        if (!region.chunks[worldColumnKey])
            return false;
        const chunkKey = this.worldBounds.getChunkKey(chunkPOS);
        if (!region.chunks[worldColumnKey][chunkKey])
            return false;
        return region.chunks[worldColumnKey][chunkKey];
    },
    getWorldColumn(x, z) {
        const region = this.getRegion(x, 0, z);
        if (!region)
            return false;
        const worldColumnKey = this.worldBounds.getWorldColumnKey(x, z);
        if (!region.chunks[worldColumnKey])
            return false;
        return region.chunks[worldColumnKey];
    },
    isChunkLocked(x, y, z) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk)
            return false;
        return Atomics.load(chunk.chunkStates, 0) == 1;
    },
    lockChunk(x, y, z) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk)
            return false;
        Atomics.store(chunk.chunkStates, 0, 1);
        return true;
    },
    unLockChunk(x, y, z) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk)
            return false;
        Atomics.store(chunk.chunkStates, 0, 0);
        return true;
    },
    updateChunkData(x, y, z, run) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk) {
            return false;
        }
        return Util.createPromiseCheck({
            check: () => {
                return !this.isChunkLocked(x, y, z);
            },
            onReady: () => {
                run(chunk);
            },
            checkInterval: 10,
            failTimeOut: this.updateDieTime,
            onFail: () => {
                const chunkKey = this.worldBounds.getChunkKeyFromPosition(x, y, z);
                console.warn(`${this.threadName} could not load the chunk ${chunkKey} in time.`);
            },
        });
    },
    setData(x, y, z, data, state = false) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk)
            return false;
        this.chunkReader.setVoxelDataUseObj(chunk.data, this.worldBounds.getVoxelPosition(x, y, z), data, state);
        return true;
    },
    getData(x, y, z, state = false) {
        const chunk = this.getChunk(x, y, z);
        if (!chunk)
            return -1;
        return this.chunkReader.getVoxelDataUseObj(chunk.data, this.worldBounds.getVoxelPosition(x, y, z), state);
    },
    getVoxelNumberID(x, y, z, secondary = false) {
        const rawVoxelData = this.getData(x, y, z, secondary);
        if (rawVoxelData < 0)
            return false;
        return this.voxelByte.getId(rawVoxelData);
    },
    getLight(x, y, z) {
        const rawVoxelData = this.getData(x, y, z);
        if (rawVoxelData < 0)
            return -1;
        if (rawVoxelData >= 0) {
            const voxelId = this.voxelByte.getId(rawVoxelData);
            if (voxelId == 0) {
                return this.voxelByte.decodeLightFromVoxelData(rawVoxelData);
            }
            if (voxelId == 1) {
                return -1;
            }
            else {
                const voxel = this.getVoxel(x, y, z);
                if (!voxel)
                    return -1;
                const isLightSource = this.voxelMatrix.isLightSource(voxelId);
                const lightValue = this.voxelMatrix.getLightValue(voxelId);
                if (isLightSource && lightValue) {
                    return lightValue;
                }
                const substance = this.voxelMatrix.getTrueSubstance(voxelId);
                if (substance == "solid") {
                    return -1;
                }
                return this.voxelByte.decodeLightFromVoxelData(rawVoxelData);
            }
        }
        return -1;
    },
    setAir(x, y, z, lightValue) {
        let data = this.lightByte.encodeLightIntoVoxelData(0, lightValue);
        this.setData(x, y, z, data);
        this.setData(x, y, z, 0, true);
    },
    setFullSun(x, y, z) {
        const value = this.getLight(x, y, z);
        const newValue = this.lightByte.setS(0xf, value);
        this.setLight(x, y, z, newValue);
    },
    setLight(x, y, z, lightValue) {
        let data = this.getData(x, y, z);
        if (data === -1)
            return;
        data = this.lightByte.encodeLightIntoVoxelData(data, lightValue);
        this.setData(x, y, z, data);
    },
    getLightValue(x, y, z, type) {
        return this.lightValueFunctions[type](this.getLight(x, y, z));
    },
    sameVoxel(x, y, z, cx, cy, cz) {
        const v1 = this.getData(x, y, z);
        const v2 = this.getData(cx, cy, cz);
        if (v1 < 0 || v2 < 0)
            return false;
        const v1ID = this.voxelByte.getId(v1);
        const v2ID = this.voxelByte.getId(v2);
        return v1ID == v2ID;
    },
};
