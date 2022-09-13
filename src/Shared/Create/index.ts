export const RunInit = (init: Function) => {
  const readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete" && typeof BABYLON !== undefined) {
      clearInterval(readyStateCheckInterval);
      init();
    }
  }, 10);
};

export const SetUpWorkers = (
  basePath: string,
  worldPath: string,
  constructorPath: string,
  nexusPath: string | false | null | undefined = null,
  dataPath: string | false | null | undefined = null,
  fxPath: string | false | null | undefined = null,
  richWorldPath: string | false | null | undefined = null
) => {
  const worldWorker = new Worker(new URL(worldPath, basePath), {
    type: "module",
  });

  const constructorWorkers: Worker[] = [];
  const cPath = new URL(constructorPath, basePath);
  let threads = 4;
  if (navigator) {
    if (navigator.hardwareConcurrency) {
      threads = navigator.hardwareConcurrency;
    }
  }
  for (let i = 0; i < threads; i++) {
    constructorWorkers.push(
      new Worker(cPath, {
        type: "module",
      })
    );
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
