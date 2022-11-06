import type { DivineVoxelEngineBuilder } from "Constructor/Builder/DivineVoxelEngineBuilder";
import type { AOAddOverride, CullFaceOverride } from "Meta/Constructor/OverRide.types";
import type { VoxelProcessData } from "Meta/Constructor/Voxel.types";
/**# Voxel Substance Type
 * ---
 * All solid and transparent voxels are grouped together in the same mesh per chunk.
 * While the the fluid and magma will chunks will have their own seperate meshes per chunk.
 * Transparent voxels will not cause the faces of solid voxels next to them to be culled they also have double sided rendering.
 */
export declare type VoxelSubstanceType = "solid" | "transparent" | "flora" | "fluid" | "magma";
/**VoxelT emplateS ubstance Type
 * ---
 * Basically same as Voxel Substance Type but only has the substances which have their own generated mesh.
 */
export declare type VoxelTemplateSubstanceType = "solid" | "flora" | "fluid" | "magma";
export declare type VoxelHooks = "texturesRegistered" | "beforeAdd" | "afterAdd" | "beforeRemove" | "afterAfter" | any;
export declare type VoxelConstructorThreadHooks = "texturesRegistered" | any;
export declare type VoxelWorldThreadHooks = "beforeAdd" | "afterAdd" | "beforeRemove" | "afterAfter" | any;
/**# Voxel Data
 * ---
 * This the needed information for each voxel.
 */
export declare type VoxelData = {
    name: string;
    shapeId: string;
    id: string;
    substance: VoxelSubstanceType;
    material: string;
    hardnress: number;
    isRich?: boolean;
    physics?: {
        collider: string;
        checkCollisions: boolean;
    };
    states?: number;
    lightSource?: boolean;
    lightValue?: number;
};
export declare type VoxelConstructorObject = {
    id: string;
    hooks: Record<VoxelConstructorThreadHooks, (DVEB: DivineVoxelEngineBuilder) => any>;
    cullFace?: {
        (data: CullFaceOverride): boolean;
    };
    aoOverRide?: {
        (data: AOAddOverride): boolean;
    };
    process(data: VoxelProcessData, DVEB: DivineVoxelEngineBuilder): void;
};
