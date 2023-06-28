import { Migration } from '@mikro-orm/migrations';

export class Migration20230628074439 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" add constraint user_balance_check check(balance >= 0);',
    );

    this.addSql(
      'alter table "transaction" add constraint transaction_amount_check check(amount > 0);',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint user_balance_check;');

    this.addSql(
      'alter table "transaction" drop constraint transaction_amount_check;',
    );
  }
}
