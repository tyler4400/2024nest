import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailAndAge1723356934009 implements MigrationInterface {
    name = 'AddEmailAndAge1723356934009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`email\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`age\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`name\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`age\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`email\``);
    }

}
