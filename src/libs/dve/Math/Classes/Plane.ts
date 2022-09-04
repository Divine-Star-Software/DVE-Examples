import { Vector3 } from "./Vector3";

export type PlaneConstrucotrData = {
 v1: Vector3;
 v2: Vector3;
 v3: Vector3;
 v4: Vector3;
};

export class Plane {
 v1: Vector3;
 v2: Vector3;
 v3: Vector3;
 v4: Vector3;
 minX = Infinity;
 maxX = -Infinity;
 minZ = Infinity;
 maxZ = -Infinity;
 minY = Infinity;
 maxY = -Infinity;
 constructor(data: PlaneConstrucotrData) {
  this.v1 = data.v1;
  this.v2 = data.v2;
  this.v3 = data.v3;
  this.v4 = data.v4;
  this._minMaxCompare(this.v1, this.v2);
  this._minMaxCompare(this.v1, this.v3);
  this._minMaxCompare(this.v1, this.v4);

  this._minMaxCompare(this.v2, this.v3);
  this._minMaxCompare(this.v2, this.v4);

  this._minMaxCompare(this.v3, this.v4);
 }

 _compareVales(
  v1: Vector3,
  v2: Vector3,
  axis: "x" | "y" | "z",
  minProperty: "minX" | "minY" | "minZ",
  maxProperty: "maxX" | "maxY" | "maxZ"
 ) {
  const c1 = v1;
  const c2 = v2;

  if (c1[axis] < this[minProperty]) {
   if (c1[axis] <= c2[axis]) {
    this[minProperty] = c1[axis];
   }
  }
  if (c2[axis] < this[minProperty]) {
   if (c2[axis] <= c1[axis]) {
    this[minProperty] = c2[axis];
   }
  }
  if (c1[axis] > this[maxProperty]) {
   if (c1[axis] >= c2[axis]) {
    this[maxProperty] = c1[axis];
   }
  }
  if (c2[axis] > this[maxProperty]) {
   if (c2[axis] >= c1[axis]) {
    this[maxProperty] = c2[axis];
   }
  }
 }
 _minMaxCompare(v1: Vector3, v2: Vector3) {
  this._compareVales(v1, v2, "x", "minX", "maxX");
  this._compareVales(v1, v2, "y", "minY", "maxY");
  this._compareVales(v1, v2, "z", "minZ", "maxZ");
 }
}
