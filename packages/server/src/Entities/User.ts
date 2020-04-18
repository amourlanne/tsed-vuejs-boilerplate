import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, JoinColumn, BeforeInsert} from "typeorm";
import {Email, Enum, IgnoreProperty, MaxLength, MinLength, Property, Required} from "@tsed/common";

import bcrypt from "bcrypt";

import {GenderEnum} from "../Enums/GenderEnum";
import {RoleEnum} from "../Enums/RoleEnum";
import {Avatar} from "./Avatar";

@Entity("users")
@Unique(['username'])
@Unique(['email'])
export class User {

    @Property()
    @PrimaryGeneratedColumn()
    id: number;

    @Required()
    @MaxLength(20)
    @MinLength(4)
    @Column()
    username: string;

    @Required()
    @Column()
    firstName: string;

    @Required()
    @Column()
    lastName: string;

    @Email()
    @Required()
    @Column()
    email: string;

    @Required()
    @Enum(RoleEnum)
    @Column({
        type: 'enum',
        enum: RoleEnum,
        default: RoleEnum.User,
    })
    role: RoleEnum;

    @IgnoreProperty()
    @Column()
    password: string;

    @Required()
    @Enum(GenderEnum)
    @Column({
        type: 'enum',
        enum: GenderEnum,
    })
    gender: GenderEnum;

    @Property()
    @OneToOne(() => Avatar, avatar => avatar.user, {
        cascade: true,
        eager: true,
        onDelete: "SET NULL"
    })
    @JoinColumn()
    avatar: Avatar;

    @BeforeInsert()
    async hashPassword(): Promise<any> {
        this.password = await bcrypt.hashSync(this.password, 8);
    }

    async verifyPassword(password: string): Promise<boolean> {
        return bcrypt.compareSync(password, this.password)
    }
}
