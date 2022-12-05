import { ColumnDataTool } from "../../../Tools/Data/ColumnDataTool.js";
import { WorldBounds } from "../../../Data/World/WorldBounds.js";
import { $2dMooreNeighborhood } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { VoxelMath } from "../../../Libs/Math/VoxelMath.js";
import { BuilderTool } from "../../../Tools/Build/Builder.js";
/**# Infinite World Generator
 *
 */
export class IWG {
    data;
    columnTool = new ColumnDataTool();
    builder = new BuilderTool();
    dimension = "main";
    _cachedPosition = [0, 0, 0];
    _columnQueue = [];
    _generateQueue = [];
    _visitedMap = new Map();
    _activeColumns = new Map();
    constructor(data) {
        this.data = data;
    }
    setDimension(id) {
        this.dimension = id;
    }
    update() {
        const position = this.data.positionWatch;
        let positionChanged = false;
        const wx = position[0];
        const wy = position[1];
        const wz = position[2];
        if (wx != this._cachedPosition[0] ||
            wy != this._cachedPosition[1] ||
            wz != this._cachedPosition[2])
            positionChanged = true;
        if (positionChanged) {
        }
        const columnPOS = WorldBounds.getColumnPosition(wx, wz, wy);
        this._generateQueue.push([columnPOS.x, columnPOS.y, columnPOS.z]);
        const activeColumns = new Map();
        while (this._generateQueue.length) {
            const node = this._generateQueue.shift();
            if (!node)
                break;
            const cx = node[0];
            const cy = node[1];
            const cz = node[2];
            if (VoxelMath.distance3D(wx, cy, wz, cx, cy, cz) > this.data.renderDistance) {
                const columnKey = WorldBounds.getColumnKey(cx, cz, cy);
                const value = this._activeColumns.get(columnKey);
                if (value) {
                    this.builder
                        .setDimension(this.dimension)
                        .setXYZ(value[0], value[1], value[2])
                        .removeColumn();
                    this._activeColumns.delete(columnKey);
                }
                continue;
            }
            if (!this.columnTool.loadIn(cx, cy, cz)) {
                this.data.generate(this.dimension, cx, cy, cz);
                if (this.columnTool.loadIn(cx, cy, cz)) {
                    this.columnTool.setTagValue("#dve:is_world_gen_done", 1);
                }
            }
            else {
                if (!this.columnTool.getTagValue("#dve:is_world_gen_done")) {
                    this.data.generate(this.dimension, cx, cy, cz);
                    if (this.columnTool.loadIn(cx, cy, cz)) {
                        this.columnTool.setTagValue("#dve:is_world_gen_done", 1);
                    }
                    continue;
                }
                let nWorldGenAllDone = true;
                for (const n of $2dMooreNeighborhood) {
                    const nx = cx + n[0] * WorldBounds.chunkXSize;
                    const nz = cz + n[1] * WorldBounds.chunkZSize;
                    const columnPOS = WorldBounds.getColumnPosition(nx, nz, cy);
                    const columnKey = WorldBounds.getColumnKey(columnPOS.x, columnPOS.z, cy);
                    if (this._visitedMap.has(columnKey))
                        continue;
                    this._visitedMap.set(columnKey, true);
                    this._generateQueue.push([columnPOS.x, cy, columnPOS.z]);
                    if (!this.columnTool.loadIn(columnPOS.x, cy, columnPOS.z)) {
                        nWorldGenAllDone = false;
                    }
                    else {
                        if (!this.columnTool.getTagValue("#dve:is_world_gen_done")) {
                            nWorldGenAllDone = false;
                        }
                    }
                }
                if (nWorldGenAllDone) {
                    const columnKey = WorldBounds.getColumnKey(cx, cz, cy);
                    activeColumns.set(columnKey, true);
                    if (!this._activeColumns.has(columnKey)) {
                        this.builder
                            .setDimension(this.dimension)
                            .setXYZ(cx, cy, cz)
                            .buildColumn();
                        this._activeColumns.set(columnKey, [cx, cy, cz]);
                    }
                }
            }
        }
        for (const [key, value] of this._activeColumns) {
            if (!activeColumns.has(key)) {
                this.builder
                    .setDimension(this.dimension)
                    .setXYZ(value[0], value[1], value[2])
                    .removeColumn();
                this._activeColumns.delete(key);
            }
        }
        this._visitedMap.clear();
    }
}
