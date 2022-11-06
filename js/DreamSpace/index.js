import { SetUpEngine, SetUpCanvas, SetUpDefaultCamera, SetUpDefaultSkybox, runRenderLoop, SetUpDefaultScene, } from "../Shared/Babylon/index.js";
import { RunInit, SetUpWorkers, SyncWithGraphicsSettings, } from "../Shared/Create/index.js";
import { DVER } from "../../out/Render/DivineVoxelEngineRender.js";
import { RegisterTexutres } from "../Shared/Functions/RegisterTextures.js";
import { GetRenderPlayer } from "../Shared/Player/Render/RenderPlayer.js";
RegisterTexutres(DVER);
const workers = SetUpWorkers(import.meta.url, "./World/world.js", "../Shared/Constructor/constructor.js", "./Nexus/nexus.js");
await DVER.$INIT({
    worldWorker: workers.worldWorker,
    constructorWorker: workers.constructorWorkers,
    nexusWorker: workers.nexusWorker,
    nexus: {
        enabled: true,
        autoSyncVoxelPalette: true,
        autoSyncChunks: true,
    },
    lighting: {
        doAO: true,
        doRGBLight: true,
        doSunLight: true,
        autoRGBLight: true,
        autoSunLight: true,
    },
    materials: {
        doAO: true,
        doRGBLight: true,
        doSunLight: true,
    },
    chunks: {
        chunkXPow2: 4,
        chunkZPow2: 4,
        chunkYPow2: 4,
        autoHeightMap: true,
    },
    meshes: {
        clearChachedGeometry: false,
    },
});
SyncWithGraphicsSettings(DVER);
const init = async () => {
    const canvas = SetUpCanvas();
    const engine = SetUpEngine(canvas);
    const scene = SetUpDefaultScene(engine);
    const camera = SetUpDefaultCamera(scene, canvas, { x: 0, y: 0.01, z: 0 });
    const box = SetUpDefaultSkybox(scene);
    const bmat = DVER.renderManager.createSkyBoxMaterial(scene);
    if (bmat) {
        box.material = bmat;
    }
    window.DVER = DVER;
    scene.fogDensity = 0.005;
    await DVER.$SCENEINIT({ scene: scene });
    DVER.renderManager.setBaseLevel(0);
    DVER.renderManager.setSunLevel(0.8);
    GetRenderPlayer(true, scene, canvas, DVER);
    runRenderLoop(engine, scene, camera);
};
RunInit(init);
