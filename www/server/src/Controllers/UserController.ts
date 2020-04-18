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

    @Post("/")
    private async update(@BodyParams() user: UpdateUserModel): Promise<User> {
        return <User>user;
    }
}
