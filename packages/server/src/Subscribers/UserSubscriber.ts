import {EntitySubscriberInterface, EventSubscriber, RemoveEvent, UpdateEvent} from "typeorm";
import {User} from "../Entities/User";
import {ImageRepository} from "../Repositories/ImageRepository";

@EventSubscriber()
export class ImageSubscriber implements EntitySubscriberInterface {

    listenTo() {
        return User;
    }

    async beforeUpdate(event: UpdateEvent<User>): Promise<any> {
        await this._handleOneToOneRemoveOldAvatar(event);
    }

    async beforeRemove(event: RemoveEvent<User>): Promise<any> {
        await this._handleCascadeRemoveAvatar(event);
    }

    async _handleOneToOneRemoveOldAvatar(event: UpdateEvent<User>) {

        const oldId = event.databaseEntity.avatar && event.databaseEntity.avatar.id;
        const newId = event.entity.avatar && event.entity.avatar.id;

        if(oldId !== null && oldId !== newId) {
            await event.manager
                .getCustomRepository(ImageRepository)
                .delete(oldId);
        }
    }

    async _handleCascadeRemoveAvatar(event: RemoveEvent<User>) {
        const id = event.entity.avatar && event.entity.avatar.id;

        if(id) {
            await event.manager
                .getCustomRepository(ImageRepository)
                .delete(id);
        }
    }
}
