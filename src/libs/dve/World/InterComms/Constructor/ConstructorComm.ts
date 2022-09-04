import type {
 InterCommInterface,
 InterCommPortTypes,
} from "Meta/Comms/InterComm.types";
import { ConstructorToWorldMessages } from "../../../Constants/InterComms/ConstructorToWorld.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";

export const GetNewConstructorComm = (
 count: number,
 port: InterCommPortTypes
) => {
 const threadName = `constructor-${count}`;
 const newComm: InterCommInterface = CreateInterComm(threadName, {
  ready: false,
 });
 newComm.onSetPort((port) => {
  newComm.name = threadName;
  DVEW.matrixCentralHub.registerThread(threadName, port);
  DVEW.matrixCentralHub.syncVoxelPaletteInThread(threadName);
 });
 newComm.setPort(port);
 DVEW.constructorCommManager.numConstructors++;
 newComm.messageFunctions = {
  ready: (data, event) => {
   DVEW.constructorCommManager.constructorsConnected++;
  },
 };

 newComm.messageFunctions[ConstructorToWorldMessages.addToRebuildQue] = (
  data
 ) => {
  const x = data[1];
  const y = data[2];
  const z = data[3];
  const substance = data[4];

  DVEW.queues.addToRebuildQue(x, y, z, substance);
 };

 newComm.messageFunctions[ConstructorToWorldMessages.runRebuildQue] = () => {
  DVEW.queues.runRebuildQue();
 };

 newComm.messageFunctions[ConstructorToWorldMessages.syncShapeMap] = (data) => {
  DVEW.matrixMap.setShapeMap(data[1]);
 };


 newComm.messageFunctions[ConstructorToWorldMessages.addToRGBLightUpdateQue] = (
  data
 ) => {
  const x = data[1];
  const y = data[2];
  const z = data[3];
  DVEW.queues.addToRGBUpdateQue(x, y, z);
 };

 return newComm;
};
