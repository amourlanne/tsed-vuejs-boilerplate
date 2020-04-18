import {Email, Enum, MaxLength, MinLength, Property, Required} from "@tsed/common";
import {GenderEnum} from "../Enums/GenderEnum";

export class UpdateAccountModel {

    @Property()
    firstName: string;

    @Property()
    lastName: string;

    @Email()
    @Property()
    email: string;

    @Property()
    removeAvatar: boolean;

    @Property()
    @Enum(GenderEnum)
    gender: GenderEnum;

    @Property()
    newPassword: string;

    @Property()
    password: string;
}
