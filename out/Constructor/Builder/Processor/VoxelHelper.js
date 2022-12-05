export const VoxelHelper = {
    substanceMap: {
        solid: 1,
        flora: 2,
        transparent: 3,
        liquid: 4,
        magma: 5,
    },
    substanceRules: {
        "solid-solid": false,
        "solid-flora": true,
        "solid-transparent": true,
        "solid-liquid": true,
        "solid-magma": true,
        "flora-solid": true,
        "flora-flora": true,
        "flora-transparent": true,
        "flora-liquid": true,
        "flora-magma": true,
        "transparent-solid": true,
        "transparent-flora": true,
        "transparent-transparent": false,
        "transparent-liquid": true,
        "transparent-magma": true,
        "liquid-solid": false,
        "liquid-flora": true,
        "liquid-transparent": true,
        "liquid-liquid": false,
        "liquid-magma": true,
        "magma-solid": false,
        "magma-flora": true,
        "magma-transparent": true,
        "magma-liquid": true,
        "magma-magma": false,
    },
    ruleMap: {},
    $INIT() {
        for (const s1 of Object.keys(this.substanceMap)) {
            for (const s2 of Object.keys(this.substanceMap)) {
                const v1 = this.substanceMap[s1];
                const v2 = this.substanceMap[s2];
                const fv = v1 * 5 - 5 + v2;
                this.ruleMap[fv] = this.substanceRules[`${s1}-${s2}`];
            }
        }
        this.substanceRules = null;
    },
    substanceRuleCheck(voxel, neightborVoxel) {
        const v = this.substanceMap[voxel] * 5 -
            5 +
            this.substanceMap[neightborVoxel];
        return this.ruleMap[v];
    },
};
