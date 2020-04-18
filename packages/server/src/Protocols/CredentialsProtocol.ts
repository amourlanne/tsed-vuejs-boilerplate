import {OnVerify, Protocol} from "@tsed/passport";
import {IStrategyOptions, Strategy} from "passport-local";
import {BodyParams, Req} from "@tsed/common";
import {UserService} from "../Services/UserService";
import {Unauthorized} from "ts-httpexceptions";

@Protocol<IStrategyOptions>({
    name: "credentials",
    useStrategy: Strategy,
    settings: {
        usernameField: "username",
        passwordField: "password"
    }
})
export class CredentialsProtocol implements OnVerify {
    constructor(private userService: UserService) {
    }

    async $onVerify(@BodyParams("username") username: string, @BodyParams("password") password: string) {

        const user = await this.userService.getOneByUsernameOrEmail(username);

        if (!user) {
            throw new Unauthorized("Wrong credentials");
        }

        if(! await user.verifyPassword(password)) {
            throw new Unauthorized("Wrong credentials");
        }

        return user;
    }
}
