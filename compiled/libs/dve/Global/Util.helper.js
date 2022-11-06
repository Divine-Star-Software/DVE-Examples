import { LightByte } from "./Util/LightByte.js";
import { VoxelByte } from "./Util/VoxelByte.js";
import { Flat3DArray } from "./Util/Flat3DArray.js";
import { WorldBounds } from "./Util/WorldBounds.js";
import { GetWorkerPort } from "./Util/GetWorkerPort.js";
import { CreatePromiseCheck } from "./Util/CreatePromiseCheck.js";
import { FaceByte } from "./Util/FaceByte.js";
import { HeightByte } from "./Util/HeightByte.js";
import { HeightMapArray } from "./Util/HeightMapArray.js";
import { MeshFaceDataByte } from "./Util/MeshFaceDataBytes.js";
import { DataEncoder } from "./Util/DataEncoder.js";
import { EntityFlat3dArray } from "./Util/EntityFlat3dArray.js";
import { Queue } from "./Util/Queue.js";
import { ChunkReader } from "./Util/ChunkReader.js";
export const Util = {
    createPromiseCheck: CreatePromiseCheck,
    getWorkerPort: GetWorkerPort,
    getEnviorment() {
        let environment = "browser";
        //@ts-ignore
        if (typeof process !== "undefined" && typeof Worker === "undefined") {
            environment = "node";
        }
        return environment;
    },
    getChunkReader() {
        return ChunkReader;
    },
    getAQueue() {
        return new Queue();
    },
    getEntityFlat3dArray() {
        return EntityFlat3dArray;
    },
    getDataEncoder() {
        return DataEncoder;
    },
    getMeshFaceDataByte() {
        return MeshFaceDataByte;
    },
    getFlat3DArray() {
        return Flat3DArray;
    },
    getFaceByte() {
        return FaceByte;
    },
    getHeightMapArray() {
        return HeightMapArray;
    },
    getHeightByte() {
        return HeightByte;
    },
    getVoxelByte() {
        return VoxelByte;
    },
    getLightByte() {
        return LightByte;
    },
    getWorldBounds() {
        return WorldBounds;
    },
    degtoRad(degrees) {
        return degrees * (Math.PI / 180);
    },
    radToDeg(radians) {
        return radians * (180 / Math.PI);
    },
};
