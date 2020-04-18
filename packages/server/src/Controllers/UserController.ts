import {BodyParams, Controller, Get, Post, Req, Res, UseFilter} from "@tsed/common";
import {UserService} from "../Services/UserService";
import {User} from "../Entities/User";
import {UpdateUserModel} from "../Models/UpdateUserModel";

@Controller("/users")
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @Get("/")
    private async getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Post("/username/available")
    private async usernameAvailable(@BodyParams("username") username: string) {
        const user = await this.userService.getOneByUsername(username);
        return { available: !user };
    }

    @Post("/")
    private async update(@BodyParams() user: UpdateUserModel): Promise<User> {
        return <User>user;
    }
}
