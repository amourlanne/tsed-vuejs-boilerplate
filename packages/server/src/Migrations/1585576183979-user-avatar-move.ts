import {MigrationInterface, QueryRunner} from "typeorm";

export class userAvatarMove1585576183979 implements MigrationInterface {
    name = 'userAvatarMove1585576183979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `images` DROP FOREIGN KEY `FK_96514329909c945f10974aff5f8`", undefined);
        await queryRunner.query("DROP INDEX `REL_96514329909c945f10974aff5f` ON `images`", undefined);
        await queryRunner.query("ALTER TABLE `images` DROP COLUMN `userId`", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `avatarId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD UNIQUE INDEX `IDX_3e1f52ec904aed992472f2be14` (`avatarId`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_3e1f52ec904aed992472f2be14` ON `users` (`avatarId`)", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_3e1f52ec904aed992472f2be147` FOREIGN KEY (`avatarId`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_3e1f52ec904aed992472f2be147`", undefined);
        await queryRunner.query("DROP INDEX `REL_3e1f52ec904aed992472f2be14` ON `users`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP INDEX `IDX_3e1f52ec904aed992472f2be14`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `avatarId`", undefined);
        await queryRunner.query("ALTER TABLE `images` ADD `userId` int NULL", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_96514329909c945f10974aff5f` ON `images` (`userId`)", undefined);
        await queryRunner.query("ALTER TABLE `images` ADD CONSTRAINT `FK_96514329909c945f10974aff5f8` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
