import { WorldMatrix } from "../../../Matrix/WorldMatrix.js";
import { Util } from "../../../Global/Util.helper.js";
//functions
import { runRGBFloodFillAt, runRGBFloodRemove, runRGBFloodRemoveAt, runRGBFloodFill, } from "./Functions/RGBFloodLight.js";
import { PopulateWorldColumnWithSunLight, RunSunLightFloodDown, RunSunLightFloodOut, runSunLightRemove, runSunLightRemoveAt, runSunLightUpdate, runSunLightUpdateAt, RunSunLightUpdateAtMaxY, SunLightAboveCheck, } from "./Functions/SunLight.js";
import { CardinalNeighbors } from "../../../Constants/Util/CardinalNeighbors.js";
export const IlluminationManager = {
    lightByte: Util.getLightByte(),
    air: [-1, 0],
    //sun
    runSunLightUpdateAt: runSunLightUpdateAt,
    runSunLightUpdate: runSunLightUpdate,
    runSunLightRemove: runSunLightRemove,
    runSunLightRemoveAt: runSunLightRemoveAt,
    populateWorldColumnWithSunLight: PopulateWorldColumnWithSunLight,
    runSunLightUpdateAtMaxY: RunSunLightUpdateAtMaxY,
    runSunLightFloodDown: RunSunLightFloodDown,
    runSunLightFloodOut: RunSunLightFloodOut,
    sunLightAboveCheck: SunLightAboveCheck,
    _sunLightUpdateQue: Util.getAQueue(),
    _sunLightFloodDownQue: Util.getAQueue(),
    _sunLightFloodOutQue: {},
    _sunLightRemoveQue: [],
    //rgb
    runRGBFloodFillAt: runRGBFloodFillAt,
    runRGBFloodFill: runRGBFloodFill,
    runRGBFloodRemoveAt: runRGBFloodRemoveAt,
    runRGBFloodRemove: runRGBFloodRemove,
    _RGBlightUpdateQue: [],
    _RGBlightRemovalQue: [],
    _visitMap: {},
    checkForSunLight(x, y, z) {
        const sl = WorldMatrix.getLight(x, y, z);
        const tn = WorldMatrix.getLight(x, y + 1, z);
        if (tn > 0) {
            if (this.lightByte.getS(tn) == 0xf) {
                WorldMatrix.setLight(x, y + 1, z, this.lightByte.setS(0xf, tn));
                return;
            }
        }
        let bn = 0;
        for (let i = 0; i < CardinalNeighbors.length; i++) {
            const n = CardinalNeighbors[i];
            const l = WorldMatrix.getLight(x + n[0], y + n[1], z + n[2]);
            if (l > 0) {
                const nl = this.lightByte.getS(l);
                if (nl > bn) {
                    bn = nl;
                }
            }
        }
        WorldMatrix.setLight(x, y, z, this.lightByte.getMinusOneForSun(sl, bn));
    },
    checkForRGBLight(x, y, z) {
        for (let i = 0; i < CardinalNeighbors.length; i++) {
            const n = CardinalNeighbors[i];
            const l = WorldMatrix.getLight(x + n[0], y + n[1], z + n[2]);
            if (this.lightByte.getRGB(l) > 0) {
                this._RGBlightUpdateQue.push([x + n[0], y + n[1], z + n[2]]);
            }
        }
    },
};
