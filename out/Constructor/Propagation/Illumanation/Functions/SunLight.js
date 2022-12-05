const removeEnd = (IM, x, y, z) => {
    IM._sDataTool.loadIn(x, y, z);
    IM._sDataTool.setBarrier().commit();
    IM.runSunLightUpdate();
    IM._sDataTool.loadIn(x, y, z);
    IM._sDataTool.setAir().commit();
};
export function runSunLightRemoveAt(x, y, z) {
    this._sDataTool.loadIn(x, y, z);
    const l = this.lightData.getS(this._sDataTool.getLight());
    if (l >= 0) {
        this._sunLightRemove.push([x, y, z]);
        this.runSunLightRemove();
        removeEnd(this, x, y, z);
        return;
    }
    this._nDataTool.loadIn(x, y - 1, z);
    const l2 = this.lightData.getS(this._nDataTool.getLight());
    if (l2 >= 0) {
        this._sunLightRemove.push([x, y, z]);
        this._sunLightRemove.push([x, y - 1, z]);
        this.runSunLightRemove();
        removeEnd(this, x, y, z);
    }
}
export function runSunLightRemove() {
    while (this._sunLightRemove.length != 0) {
        const node = this._sunLightRemove.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        if (!this._sDataTool.loadIn(x, y, z))
            continue;
        const sl = this._sDataTool.getLight();
        if (sl <= 0)
            continue;
        if (!this.lightData.getS(sl))
            continue;
        if (this._nDataTool.loadIn(x - 1, y, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > 0) {
                if (this.lightData.isLessThanForSunRemove(nl, sl)) {
                    this._sunLightRemove.push([x - 1, y, z]);
                }
                else {
                    if (this.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        this._sunLightUpdate.enqueue([x - 1, y, z]);
                    }
                }
            }
        }
        if (this._nDataTool.loadIn(x + 1, y, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > 0) {
                if (this.lightData.isLessThanForSunRemove(nl, sl)) {
                    this._sunLightRemove.push([x + 1, y, z]);
                }
                else {
                    if (this.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        this._sunLightUpdate.enqueue([x + 1, y, z]);
                    }
                }
            }
        }
        if (this._nDataTool.loadIn(x, y, z - 1)) {
            const nl = this._nDataTool.getLight();
            if (nl > 0) {
                if (this.lightData.isLessThanForSunRemove(nl, sl)) {
                    this._sunLightRemove.push([x, y, z - 1]);
                }
                else {
                    if (this.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        this._sunLightUpdate.enqueue([x, y, z - 1]);
                    }
                }
            }
        }
        if (this._nDataTool.loadIn(x, y, z + 1)) {
            const nl = this._nDataTool.getLight();
            if (nl > 0) {
                if (this.lightData.isLessThanForSunRemove(nl, sl)) {
                    this._sunLightRemove.push([x, y, z + 1]);
                }
                else {
                    if (this.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        this._sunLightUpdate.enqueue([x, y, z + 1]);
                    }
                }
            }
        }
        if (this._nDataTool.loadIn(x, y - 1, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > 0) {
                if (this.lightData.sunLightCompareForDownSunRemove(nl, sl)) {
                    this._sunLightRemove.push([x, y - 1, z]);
                }
                else {
                    if (this.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        this._sunLightUpdate.enqueue([x, y - 1, z]);
                    }
                }
            }
        }
        if (this._nDataTool.loadIn(x, y + 1, z)) {
            const n6 = this._nDataTool.getLight();
            if (n6 > 0) {
                if (this.lightData.isLessThanForSunRemove(n6, sl)) {
                    this._sunLightRemove.push([x, y + 1, z]);
                }
                else {
                    if (this.lightData.isGreaterOrEqualThanForSunRemove(n6, sl)) {
                        this._sunLightUpdate.enqueue([x, y + 1, z]);
                    }
                }
            }
        }
        this.addToRebuildQue(x, y, z);
        this._sDataTool.setLight(this.lightData.removeSunLight(sl)).commit();
    }
}
export function runSunLightUpdate() {
    const queue = this._sunLightUpdate;
    while (this._sunLightUpdate.size > 0) {
        const node = this._sunLightUpdate.dequeue();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        if (!this._sDataTool.loadIn(x, y, z))
            continue;
        const sl = this._sDataTool.getLight();
        if (sl <= 0)
            continue;
        if (!this.lightData.getS(sl))
            continue;
        if (this._nDataTool.loadIn(x - 1, y, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.enqueue([x - 1, y, z]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadIn(x + 1, y, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.enqueue([x + 1, y, z]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadIn(x, y, z - 1)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.enqueue([x, y, z - 1]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadIn(x, y, z + 1)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.enqueue([x, y, z + 1]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadIn(x, y - 1, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAddDown(nl, sl)) {
                if (this._nDataTool.isAir()) {
                    queue.enqueue([x, y - 1, z]);
                    this._nDataTool
                        .setLight(this.lightData.getSunLightForUnderVoxel(sl, nl))
                        .commit();
                }
                else {
                    const substance = this._nDataTool.getSubstance();
                    if (substance != "magma" && substance != "solid") {
                        queue.enqueue([x, y - 1, z]);
                        this._nDataTool
                            .setLight(this.lightData.getMinusOneForSun(sl, nl))
                            .commit();
                    }
                }
            }
        }
        if (this._nDataTool.loadIn(x, y + 1, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.enqueue([x, y + 1, z]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        this.addToRebuildQue(x, y, z);
    }
}
export function runSunLightUpdateAt(x, y, z) {
    this._sunLightUpdate.enqueue([x, y, z]);
    this.runSunLightUpdate();
}
