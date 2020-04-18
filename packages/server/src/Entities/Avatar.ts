import {
    ChildEntity,
    OneToOne,
} from "typeorm";

import {Property} from "@tsed/common";

import {User} from "./User";
import {Image} from "./Image";

@ChildEntity("avatar")
export class Avatar extends Image {

    @Property()
    @OneToOne(() => User, user => user.avatar)
    user: User;

    static fromMulterFile(imageFile: Express.Multer.File) {
        return <Avatar>super.fromMulterFile(imageFile);
    }

}
