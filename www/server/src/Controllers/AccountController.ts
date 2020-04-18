import {BodyParams, Controller, Get, Post, Req, Res, UseFilter} from "@tsed/common";
import {UserService} from "../Services/UserService";
import {User} from "../Entities/User";
import {Authenticate} from "@tsed/passport";
import {UpdateAccountModel} from "../Models/UpdateAccountModel";
import {BadRequest} from "ts-httpexceptions";
import {MultipartFile} from "@tsed/multipartfiles";
import {Avatar} from "../Entities/Avatar";

@Controller("/account")
export class AccountController {

    constructor(private readonly userService: UserService) {
    }

    @Get()
    @Authenticate('jwt')
    private async getAccount(@Req('user') user: User): Promise<User> {
        return user;
    }

    @Post()
    @Authenticate('jwt')
    private async postAccount(@Req('user') user: User,
                              @BodyParams() updateAccountdata: UpdateAccountModel,
                              @MultipartFile("avatar") avatarFile: Express.Multer.File): Promise<User> {

        if(updateAccountdata.newPassword) {
            if (await user.verifyPassword(updateAccountdata.password)) {
                user.password = updateAccountdata.password;
                await user.hashPassword();
            } else {
                throw new BadRequest("wrong password")
            }
            // ne marche pas
        }

        if(updateAccountdata.removeAvatar) {
            user.avatar = null;
        }

        if(avatarFile) {
            user.avatar = Avatar.fromMulterFile(avatarFile);
        }

        return this.userService.save(Object.assign(user, updateAccountdata));
    }
}
