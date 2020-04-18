import {MigrationInterface, QueryRunner} from "typeorm";

export class addUser1585075190543 implements MigrationInterface {
    name = 'addUser1585075190543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `role` enum ('admin', 'user') NOT NULL DEFAULT 'user', `password` varchar(255) NOT NULL, `gender` enum ('male', 'female', 'other') NOT NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `images` (`id` int NOT NULL AUTO_INCREMENT, `path` varchar(255) NOT NULL, `originalName` varchar(255) NOT NULL, `fileName` varchar(255) NOT NULL, `mimeType` varchar(255) NOT NULL, `size` int NOT NULL, `discr` varchar(255) NOT NULL, `userId` int NULL, UNIQUE INDEX `REL_96514329909c945f10974aff5f` (`userId`), INDEX `IDX_b3edd42747444523034ea2652e` (`discr`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `images` ADD CONSTRAINT `FK_96514329909c945f10974aff5f8` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `images` DROP FOREIGN KEY `FK_96514329909c945f10974aff5f8`", undefined);
        await queryRunner.query("DROP INDEX `IDX_b3edd42747444523034ea2652e` ON `images`", undefined);
        await queryRunner.query("DROP INDEX `REL_96514329909c945f10974aff5f` ON `images`", undefined);
        await queryRunner.query("DROP TABLE `images`", undefined);
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`", undefined);
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`", undefined);
        await queryRunner.query("DROP TABLE `users`", undefined);
    }

}
