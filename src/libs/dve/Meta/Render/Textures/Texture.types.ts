import { VoxelSubstanceType } from "Meta/index";

export type TextureTypes = VoxelSubstanceType | "Item";
export type TextureProccesedData = {
 textureAnimations: Record<TextureTypes, number[][]>;
 textureAnimationTimes: Record<TextureTypes, number[][]>;
 texturePaths: Record<TextureTypes, string[]>;
};

export type TextureAnimationData = {
 /**# Frames
  * If the texture has animation frames the number of frames must be set to the number
  * texture animatoin images. This number must be greater than 1.
  *
  * The number will be used to locate all the associated frames.
  *
  * Example: If you specify 3 frames for a texture with the ID **dreamstone** the folder would look like this:
  * - dreamstone/default-1.png
  * - dreamstone/default-2.png
  * - dreamstone/default-3.png
  */
 frames: number;
 /**# Anim Keys
  * If the texture is animated you must supply the anim key frames which
  * is just the order of the frames.
  */
 animKeys?: number[];
 /**# Global Frame Time
  * ---
  * Specifies how many frames every anim key should be display.
  */
 globalFrameTime?: number;
 /**# Anim Key Frame Time
  * ---
  * If set globalFrameTime will be ignored.
  * Specifies how many frames every anim should be displayed.
  * You must supply a number for every animKey.
  */
 animKeyFrameTimes?: number[];
};
export type TextureData = {
 /**# Name
  * The name of the texutre.
  */
 name: string;
 /**# ID
  * The id of the texture.
  * This will be used to locate the file.
  */
 id: string;
 /**# Path
  * If the texture is not in the default path specify it here.
  */
 path?: string;
 /**# Overlay
  * If the texture is an overlay specify it here.
  */
 overlay?: boolean;
 /**# normalMap
  * If the texture is an overlay specify it here.
  */
 normalMap?: boolean;
 /**# Varations
  * The name of the texture must be default with the folder being its ID.
  * Variations allow you to add variations to the same texture.
  *
  * If you add a variation of "grassy-top" you must you include in the
  * folder of the texture one with the name 'grassy-top'.
  *
  * So the files in that folder would be for a texture with the ID **dreamstone**
  * - dreamstone/default.png
  * - dreamstone/grassy-top.png
  */
 variations?: Record<string, TextureAnimationData>;
} & TextureAnimationData;
