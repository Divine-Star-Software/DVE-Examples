export declare type SetChunkMeshTask = [
    dimension: string,
    substanceType: number,
    chunkX: number,
    chunkY: number,
    chunkZ: number,
    positions: Float32Array,
    normals: Float32Array,
    indicies: Uint16Array,
    faceData: Float32Array,
    AOColors: Float32Array,
    lightColors: Float32Array,
    colors: Float32Array,
    uvs: Float32Array,
    overlayUVs: Float32Array
];
export declare type RemoveChunkMeshTasks = [
    dimension: string,
    substanceType: number,
    chunkX: number,
    chunkY: number,
    chunkZ: number
];
