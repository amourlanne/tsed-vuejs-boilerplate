import {Arg, OnVerify, PassportMiddleware, Protocol} from "@tsed/passport";
import {ExtractJwt, Strategy, StrategyOptions} from "passport-jwt";
import {Req} from "@tsed/common";
import {UserService} from "../Services/UserService";
import {User} from "../Entities/User";

interface JWTPayload {
    id: number;
    username: string;
}

@Protocol<StrategyOptions>({
    name: "jwt",
    useStrategy: Strategy,
    settings: {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "secret",
    }
})
export class JwtProtocol implements OnVerify {
    constructor(private userService: UserService) {
    }

    async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: JWTPayload): Promise<User | false> {

        const user = await this.userService.getById(jwtPayload.id);

        if (!user) {
            return false;
        }

        const {options = {}} = req.ctx.endpoint.get(PassportMiddleware);

        if(options.role) {
            if(user.role !== options.role) {
                return false
            }
        }

        return user;
    }
}
