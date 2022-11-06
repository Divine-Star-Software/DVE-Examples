import type { EntityTypes } from "Meta/Data/Entity/Entity.types";
import type { NexusEntity, NexusEntityData, NexusEntityInterface } from "Meta/Interfaces/Entity/NexusEntity.types";
import { Position3Matrix } from "Meta/Util.types";
export declare const NexusEntites: {
    entityTemplate: Record<string, {
        template: NexusEntity;
        data: NexusEntityData;
    }>;
    loaedEntities: Record<EntityTypes, Record<string, NexusEntityInterface>>;
    registerEntity(id: string, entityData: NexusEntityData, nexusEntity: NexusEntity): void;
    _getID(): string;
    _unqiueId(): string;
    _generateUUI(): string;
    spawnEntity(entityId: string, position: Position3Matrix, otherData?: any, identiferId?: string): void;
    ddSepawnEntity(entityId: string, identiferId: string): void;
};
