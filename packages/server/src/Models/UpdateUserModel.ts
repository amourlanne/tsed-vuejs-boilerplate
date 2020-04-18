import {
    AllowTypes,
    Email,
    Enum,
    IgnoreProperty,
    MaxLength,
    MinLength,
    Property,
    PropertyDeserialize,
    PropertySerialize,
    Required
} from "@tsed/common";
import {RoleEnum} from "../Enums/RoleEnum";
import {GenderEnum} from "../Enums/GenderEnum";

import bcrypt from "bcrypt";

export class UpdateUserModel {

    @Required()
    @MaxLength(20)
    @MinLength(4)
    username: string;

    @Email()
    @Required()
    email: string;

    @Property()
    password: string;

    @Required()
    @Enum(RoleEnum)
    role: RoleEnum;

    @Required()
    firstName: string;

    @Required()
    lastName: string;

    @Required()
    @Enum(GenderEnum)
    gender: GenderEnum;

    @PropertyDeserialize(avatar => avatar === 'null' ? null : avatar)
    @AllowTypes("null")
    avatar: any;

    async hashPassword(): Promise<any> {
        this.password = await bcrypt.hashSync(this.password, 8);
    }
}
