export const RunInit = (init) => {
    const readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete" && typeof BABYLON !== undefined) {
            clearInterval(readyStateCheckInterval);
            init();
        }
    }, 10);
};
export const SetUpWorkers = (basePath, worldPath, constructorPath, nexusPath = null, dataPath = null, fxPath = null, richWorldPath = null) => {
    const worldWorker = new Worker(new URL(worldPath, basePath), {
        type: "module",
    });
    const constructorWorkers = [];
    const cPath = new URL(constructorPath, basePath);
    for (let i = 0; i < navigator.hardwareConcurrency; i++) {
        constructorWorkers.push(new Worker(cPath, {
            type: "module",
        }));
    }
    let nexusWorker = null;
    if (nexusPath) {
        nexusWorker = new Worker(new URL(nexusPath, basePath), {
            type: "module",
        });
    }
    let dataWorker = null;
    if (dataPath) {
        dataWorker = new Worker(new URL(dataPath, basePath), {
            type: "module",
        });
    }
    let fxWorker = null;
    if (fxPath) {
        fxWorker = new Worker(new URL(fxPath, basePath), {
            type: "module",
        });
    }
    let richWorldWorker = null;
    if (richWorldPath) {
        richWorldWorker = new Worker(new URL(richWorldPath, basePath), {
            type: "module",
        });
    }
    return {
        worldWorker: worldWorker,
        constructorWorkers: constructorWorkers,
        nexusWorker: nexusWorker,
        dataWorker: dataWorker,
        fxWorker: fxWorker,
        richWorldWorker: richWorldWorker,
    };
};
export const SyncWithGraphicsSettings = (DVER) => {
    let grahpicsLevel = localStorage.getItem("graphics");
    if (!grahpicsLevel)
        grahpicsLevel = "medium";
    if (grahpicsLevel == "low") {
        DVER.renderManager.updateFogOptions({
            mode: "exponential",
        });
        DVER.renderManager.updateShaderEffectOptions({
            floraEffects: false,
            liquidEffects: false,
        });
    }
    if (grahpicsLevel == "medium") {
        DVER.renderManager.updateFogOptions({
            mode: "volumetric",
        });
        DVER.renderManager.updateShaderEffectOptions({
            floraEffects: false,
            liquidEffects: false,
        });
    }
    if (grahpicsLevel == "high") {
        DVER.renderManager.updateFogOptions({
            mode: "volumetric",
        });
        DVER.renderManager.updateShaderEffectOptions({
            floraEffects: true,
            liquidEffects: true,
        });
    }
    if (grahpicsLevel == "ultra") {
        DVER.renderManager.updateFogOptions({
            mode: "animated-volumetric",
        });
        DVER.renderManager.updateShaderEffectOptions({
            floraEffects: true,
            liquidEffects: true,
        });
    }
};
