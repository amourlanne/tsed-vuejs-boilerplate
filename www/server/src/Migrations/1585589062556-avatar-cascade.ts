import {MigrationInterface, QueryRunner} from "typeorm";

export class avatarCascade1585589062556 implements MigrationInterface {
    name = 'avatarCascade1585589062556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_3e1f52ec904aed992472f2be147`", undefined);
        await queryRunner.query("DROP INDEX `IDX_3e1f52ec904aed992472f2be14` ON `users`", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_3e1f52ec904aed992472f2be147` FOREIGN KEY (`avatarId`) REFERENCES `images`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_3e1f52ec904aed992472f2be147`", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_3e1f52ec904aed992472f2be14` ON `users` (`avatarId`)", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_3e1f52ec904aed992472f2be147` FOREIGN KEY (`avatarId`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

}
