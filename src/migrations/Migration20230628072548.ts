import { Migration } from '@mikro-orm/migrations';

export class Migration20230628072548 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "transaction" drop constraint transaction_amount_check;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "transaction" add constraint transaction_amount_check check(amount > 0);',
    );
  }
}
