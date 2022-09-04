import { VoxelSubstanceType } from "Meta/index";
import type { Position3Matrix } from "Meta/Util.types";
import {
 AOAddOverride,
 AOAFlipOverride,
 CullFaceOverride,
} from "./OverRide.types";

/** # Voxel Shape Add DAta
---
* The chunk meshes positions
* @var positions
* The chunk mesh indices
* @var indices
* The chunk mesh full colors
* @var fullColors
* The chunk mesh linear space colors
* @var linearColors
* The chunk mesh uvs
* @var uvs
* ## Face
* The current face that is being added to the mesh.
* 0 -> top
* 1 -> bottom
* 2 -> west
* 3 -> east
* 4 -> north
* 5 -> south
* @var face
* The current indicie index of the mesh.
* @var indicieIndex: number;
* The calculated uv template.
* @var unTemplate: number[];
* The current index of the uv template
* @var uvTemplateIndex: number;
* The calcuated light values
* @var lightTemplate: number[];
* The current light template index.
* @var lightIndex: number[];
* The calculated AO values.
* @var  aoTemplate: number[];
* The current AO index.
* @var aoIndex: number[];
* The relative chunk position that the voxel is being added.
* @var position: Position3Matrix;
*/
export type VoxelShapeAddData = {
 LOD: number;
 substance: VoxelSubstanceType;
 //actual mesh data
 positions: number[];
 normals: number[];
 indices: number[];
 faceData: number[];
 RGBLightColors: number[];
 sunLightColors: number[];
 AOColors: number[];
 colors: number[];
 uvs: number[];
 overlayUVs: number[];
 face: number;
 indicieIndex: number;

 //chunk template data
 shapeState: number;
 flowTemplateIndex?: number;
 flowTemplate?: number[];
 unTemplate: number[];
 uvTemplateIndex: number;
 overylayUVTemplate: number[];
 overylayUVTemplateIndex: number;
 colorTemplate: number[];
 colorIndex: number;
 lightTemplate: number[];
 lightIndex: number;
 aoTemplate: number[];
 aoIndex: number;
 position: Position3Matrix;
};

export type VoxelShapeAddReturnData = {
 newIndicieIndex: number;
 newUVTemplateIndex: number;
 newOverlayUVTemplateIndex: number;
 newColorIndex: number;
 newlightIndex: number;
 newAOIndex: number;
 newFlowTemplateIndex?: number;
};

/**# Voxel Shape
 * ---
 * Describes a basic voxel shape such as a box or half box.
 * Voxel shapes are used by the mesh bulder to generate the mush.
 * It checks with the voxel shape to build the proper mesh.
 */
export type VoxelShapeInterface = {
 id: string;
 cullFaceOverrideFunctions: Record<string, (data: CullFaceOverride) => boolean>;
 aoAddOverrideFunctions: Record<string, (data: AOAddOverride) => boolean>;
 aoFlipOverrideFunctions: Record<string, (data: AOAFlipOverride) => boolean>;

 cullFaceOverride(data: CullFaceOverride): boolean;
 registerShapeForCullFaceOverride(
  shapeId: string,
  func: (data: CullFaceOverride) => boolean
 ): void;

 aoAddOverride(data: AOAddOverride): boolean;
 registerShapeAOAddOverride(
  shapeId: string,
  func: (data: AOAddOverride) => boolean
 ): void;

 aoFlipOverride(data: AOAFlipOverride): boolean;
 registerShapeAOFlipOverride(
  shapeId: string,
  func: (data: AOAFlipOverride) => boolean
 ): void;

 /**# Add To Chunk Mesh
  * ---
  */
 addToChunkMesh(data: VoxelShapeAddData): VoxelShapeAddReturnData;
};
