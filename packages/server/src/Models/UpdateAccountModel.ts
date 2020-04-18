import {
    AllowTypes,
    Email,
    Enum,
    MaxLength,
    MinLength,
    Property,
    PropertyDeserialize,
    PropertyType,
    Required
} from "@tsed/common";
import {GenderEnum} from "../Enums/GenderEnum";

import bcrypt from "bcrypt";

export class UpdateAccountModel {

    @Required()
    @MaxLength(20)
    @MinLength(4)
    username: string;

    @Property()
    firstName: string;

    @Property()
    lastName: string;

    @Email()
    @Property()
    email: string;

    @Property()
    @Enum(GenderEnum)
    gender: GenderEnum;

    @Property({name: 'newPassword'})
    password: string;

    @PropertyDeserialize(avatar => avatar === 'null' ? null : avatar)
    @AllowTypes("null")
    avatar: any;

    async hashPassword(): Promise<any> {
        this.password = await bcrypt.hashSync(this.password, 8);
    }
}
