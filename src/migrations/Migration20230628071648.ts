import { Migration } from '@mikro-orm/migrations';

export class Migration20230628071648 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" add column "version" int not null default 1;',
    );

    this.addSql(
      'alter table "transaction" add constraint transaction_amount_check check(amount > 0);',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "version";');

    this.addSql(
      'alter table "transaction" drop constraint transaction_amount_check;',
    );
  }
}
