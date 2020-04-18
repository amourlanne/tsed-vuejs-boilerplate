import {Service} from '@tsed/di';
import {UserRepository} from "../Repositories/UserRepository";
import {User} from "../Entities/User";
import jwt from 'jsonwebtoken';
import {UpdateResult} from "typeorm";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";

@Service()
export class UserService {

    constructor(private readonly userRepository: UserRepository) {
    }

    public async getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    public async getById(id: number): Promise<User> {
        return this.userRepository.findOne({ id });
    }

    public async save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    public async merge(user: User, userData): Promise<User> {
        return this.userRepository.merge(user, userData);
    }

    public async getOneByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({username: username});
    }

    public async getOneByUsernameOrEmail(username: string): Promise<User> {
        return this.userRepository.findOneByUsernameOrEmail(username);
    }

    public async getBearerToken(user: User): Promise<string> {
        return jwt.sign({
            id: user.id,
            username: user.username,
        }, "secret", {/* expiresIn: "1h" */})
    }

    public async remove(user: User) {
        return this.userRepository.remove(user);
    }
}
