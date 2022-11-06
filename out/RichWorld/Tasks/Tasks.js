import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { DVERW } from "../DivineStarVoxelEngineRichWorld.js";
export const RichWorldTasks = {
    setVoxel: ThreadComm.registerTasks("set-voxel", (data) => {
        const voxelId = data[0];
        const dimesnionId = data[1];
        const x = data[2];
        const y = data[3];
        const z = data[4];
        if (DVERW.richData.hasInitalData(voxelId)) {
            DVERW.richData.setInitalData(voxelId, x, y, z);
        }
    }),
    removeVoxel: ThreadComm.registerTasks("remove-voxel", (data) => {
        const dimesnionId = data[0];
        const x = data[1];
        const y = data[2];
        const z = data[3];
        DVERW.richData.removeData(x, y, z);
    }),
};
