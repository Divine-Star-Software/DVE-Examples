export function InitWorkers(DVER, initData) {
    DVER.settings.syncSettings(initData);
    DVER._handleOptions();
    if (typeof initData.worldWorker == "string") {
        const worker = DVER.__createWorker(initData.worldWorker);
        DVER.worldComm.setPort(worker);
    }
    else if (initData.worldWorker instanceof Worker) {
        DVER.worldComm.setPort(initData.worldWorker);
    }
    else {
        throw Error("Supplied data for World Worker is not correct. Must be path to worker or a worker.");
    }
    if (typeof initData.constructorWorker == "string") {
        DVER.constructorCommManager.createConstructors(initData.constructorWorker);
    }
    else if (Array.isArray(initData.constructorWorker) &&
        initData.constructorWorker[0] instanceof Worker) {
        DVER.constructorCommManager.setConstructors(initData.constructorWorker);
    }
    else {
        throw Error("Supplied data for the Constructor Workers is not correct. Must be path to worker or an array workers.");
    }
    if (initData.nexusWorker && initData.nexus?.enabled) {
        if (typeof initData.nexusWorker == "string") {
            const worker = DVER.__createWorker(initData.nexusWorker);
            DVER.nexusComm.setPort(worker);
        }
        else if (initData.nexusWorker instanceof Worker) {
            DVER.nexusComm.setPort(initData.nexusWorker);
        }
        else {
            throw Error("Supplied data for Nexus Worker is not correct. Must be path to worker or a worker.");
        }
        DVER.nexusComm.$INIT();
    }
    if (initData.dataWorker && initData.data?.enabled) {
        if (typeof initData.dataWorker == "string") {
            const worker = DVER.__createWorker(initData.dataWorker);
            DVER.dataComm.setPort(worker);
        }
        else if (initData.dataWorker instanceof Worker) {
            DVER.dataComm.setPort(initData.dataWorker);
        }
        else {
            throw Error("Supplied data for Data Worker is not correct. Must be path to worker or a worker.");
        }
        DVER.dataComm.$INIT();
    }
    if (initData.fxWorker && initData.fx?.enabled) {
        if (typeof initData.fxWorker == "string") {
            const worker = DVER.__createWorker(initData.fxWorker);
            DVER.fxComm.setPort(worker);
        }
        else if (initData.fxWorker instanceof Worker) {
            DVER.fxComm.setPort(initData.fxWorker);
        }
        else {
            throw Error("Supplied data for FX Worker is not correct. Must be path to worker or a worker.");
        }
        DVER.fxComm.$INIT();
    }
    if (initData.richWorldWorker && initData.richWorld?.enabled) {
        if (typeof initData.richWorldWorker == "string") {
            const worker = DVER.__createWorker(initData.richWorldWorker);
            DVER.richWorldComm.setPort(worker);
        }
        else if (initData.richWorldWorker instanceof Worker) {
            DVER.richWorldComm.setPort(initData.richWorldWorker);
        }
        else {
            throw Error("Supplied data for Rich World Worker is not correct. Must be path to worker or a worker.");
        }
        DVER.richWorldComm.$INIT();
    }
    DVER.syncSettingsWithWorkers(initData);
    DVER.textureManager.generateTexturesData();
    DVER.textureManager.generateTexturesData(true);
    DVER.constructorCommManager.$INIT();
    //terminate all workers
    window.addEventListener("beforeunload", () => {
        for (const constructor of DVER.constructorCommManager.constructors) {
            //@ts-ignore
            constructor.port.terminate();
        }
        //@ts-ignore
        DVER.worldComm.port.terminate();
        if (DVER.nexusComm.port) {
            //@ts-ignore
            DVER.nexusComm.port.terminate();
        }
    });
}
