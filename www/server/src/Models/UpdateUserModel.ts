
import {Email, Enum, IgnoreProperty, MaxLength, MinLength, Property, Required} from "@tsed/common";
import {User} from "../Entities/User";
import {RoleEnum} from "../Enums/RoleEnum";
import {GenderEnum} from "../Enums/GenderEnum";

export class UpdateUserModel extends User {

    @Required()
    @MaxLength(20)
    @MinLength(4)
    username: string;

    @Required()
    firstName: string;

    @Required()
    lastName: string;

    @Property()
    removeAvatar: boolean;

    @Email()
    @Required()
    email: string;

    @Required()
    @Enum(RoleEnum)
    role: RoleEnum;

    @Required()
    @Enum(GenderEnum)
    gender: GenderEnum;
}
