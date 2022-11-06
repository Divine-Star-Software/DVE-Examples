import { DVEC } from "../../libs/dve/Constructor/DivineVoxelEngineConstructor.js";
import { RegisterVoxelsForConstructor } from "../Functions/RegisterVoxelsForConstructor.js";
RegisterVoxelsForConstructor(DVEC);
await DVEC.$INIT({ onReady: () => { } });
if (DVEC.environment == "browser") {
    //testing purposes only
    self.DVEC = DVEC;
}
