import {BodyParams, Controller, Get, PathParams, Post, Req, Res, UseFilter} from "@tsed/common";
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

    @Get("/:username")
    private async getOneByUsername(@PathParams("username") username: string): Promise<User> {
        return this.userService.getOneByUsername(username);
    }

    @Post("/username/available")
    private async usernameAvailable(@BodyParams("username") username: string) {
        const user = await this.userService.getOneByUsername(username);
        return { available: !user };
    }
}
