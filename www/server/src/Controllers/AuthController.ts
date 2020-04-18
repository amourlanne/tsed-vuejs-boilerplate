import {BodyParams, Controller, Get, Post, Req, Res, UseFilter} from "@tsed/common";
import {UserService} from "../Services/UserService";
import {User} from "../Entities/User";
import {UpdateUserModel} from "../Models/UpdateUserModel";
import {Authenticate} from "@tsed/passport";

@Controller("/")
export class AuthController {

    constructor(private readonly userService: UserService) {
    }

    @Post("/login")
    @Authenticate('credentials')
    private async login(@Req("user") user: User, @BodyParams("rememberMe") rememberMe: boolean, @Res() response: Res) {

        const jwt = await this.userService.getBearerToken(user);

        response.cookie('bearer_jwt', jwt, rememberMe ? {
            maxAge: 60 * 60 * 1000
        } : {});

        return user;
    }
}
