import {Repository} from "typeorm";
import {EntityRepository} from "@tsed/typeorm";
import {User} from "../Entities/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async findOneByUsernameOrEmail(username: string) {
        return this.findOne({
            where: [
                {username: username},
                {email: username},
            ],
        });
    }
}
