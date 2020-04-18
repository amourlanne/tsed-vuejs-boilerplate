import {BodyParams, Controller, Delete, Get, PathParams, Post, Put, Req} from "@tsed/common";
import {User} from "../Entities/User";
import {UserService} from "../Services/UserService";
import {MultipartFile} from "@tsed/multipartfiles";
import {CreateUserModel} from "../Models/CreateUserModel";
import {Avatar} from "../Entities/Avatar";
import {BadRequest} from "ts-httpexceptions";
import {UpdateUserModel} from "../Models/UpdateUserModel";
import {Authenticate} from "@tsed/passport";
import {RoleEnum} from "../Enums/RoleEnum";

@Controller("/users")
@Authenticate('jwt', {role: RoleEnum.Admin})
export class AdminUserController {

    constructor(private readonly userService: UserService) {
    }

    @Get()
    private async getUser(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get("/:username")
    private async getUserByUsername(@PathParams("username") username: string): Promise<User> {
        return this.userService.getOneByUsername(username);
    }

    @Post()
    private async postUser(@BodyParams() userModel: CreateUserModel,
                           @MultipartFile("avatar") avatarFile: Express.Multer.File): Promise<User> {

        if(avatarFile) {
            userModel.avatar = Avatar.fromMulterFile(avatarFile);
        }

        return this.userService.save(userModel);
    }

    @Put("/:id")
    private async putUser(@PathParams("id") id: number,
                          @BodyParams() userModel: UpdateUserModel,
                          @MultipartFile("avatar") avatarFile: Express.Multer.File): Promise<User> {

        let user = await this.userService.getById(id);

        if(userModel.removeAvatar) {
            user.avatar = null;
        }

        if(avatarFile) {
            user.avatar = Avatar.fromMulterFile(avatarFile);
        }

        user = await this.userService.merge(user, userModel);

        if(userModel.password) {
            await user.hashPassword()
        }

        return this.userService.save(user);
    }

    @Delete("/:username")
    private async removeUser(@Req('user') user: User, @PathParams("username") username: string): Promise<User> {

        if(user.username === username) {
            throw new BadRequest("Cannot remove your account") ;
        }

        const findUser = await this.userService.getOneByUsername(username);

        if(!findUser) {
            throw new BadRequest("User not found")
        }

        return this.userService.remove(findUser);
    }
}
