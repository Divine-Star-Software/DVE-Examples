//types
import type { VoxelData, VoxelSubstanceType } from "Meta/index";

export const VoxelHelper = {
 substanceMap: <Record<VoxelSubstanceType, number>>{
  solid: 1,
  flora: 2,
  transparent: 3,
  fluid: 4,
  magma: 5,
 },

 substanceRules: <Record<string, boolean>>{
  "solid-solid": false,
  "solid-flora": true,
  "solid-transparent": true,
  "solid-fluid": true,
  "solid-magma": true,

  "flora-solid": true,
  "flora-flora": true,
  "flora-transparent": true,
  "flora-fluid": true,
  "flora-magma": true,

  "transparent-solid": true,
  "transparent-flora": true,
  "transparent-transparent": false,
  "transparent-fluid": true,
  "transparent-magma": true,

  "fluid-solid": false,
  "fluid-flora": true,
  "fluid-transparent": true,
  "fluid-fluid": false,
  "fluid-magma": true,

  "magma-solid": false,
  "magma-flora": true,
  "magma-transparent": true,
  "magma-fluid": true,
  "magma-magma": false,
 },

 ruleMap: <Record<number, boolean>>{},

 $INIT() {
  for (const s1 of Object.keys(this.substanceMap)) {
   for (const s2 of Object.keys(this.substanceMap)) {
    const v1 = (this as any).substanceMap[s1];
    const v2 = (this as any).substanceMap[s2];
    const fv = v1 * 5 - 5 + v2;
    this.ruleMap[fv] = this.substanceRules[`${s1}-${s2}`];
   }
  }
  (this as any).substanceRules = null;
 },

 substanceRuleCheck(voxel: VoxelSubstanceType, neightborVoxel: VoxelSubstanceType) {
  const v =
   this.substanceMap[voxel] * 5 -
   5 +
   this.substanceMap[neightborVoxel];
  return this.ruleMap[v];
 },
};
