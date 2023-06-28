import { Migration } from '@mikro-orm/migrations';

export class Migration20230628025358 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "transaction" drop constraint "transaction_user_id_foreign";',
    );

    this.addSql(
      'alter table "user" alter column "balance" type int using ("balance"::int);',
    );
    this.addSql('alter table "user" alter column "balance" set default 0;');

    this.addSql(
      'alter table "transaction" add column "to_user_id" uuid not null;',
    );
    this.addSql(
      'alter table "transaction" add constraint "transaction_to_user_id_foreign" foreign key ("to_user_id") references "user" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "transaction" rename column "user_id" to "from_user_id";',
    );
    this.addSql(
      'alter table "transaction" add constraint "transaction_from_user_id_foreign" foreign key ("from_user_id") references "user" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "transaction" drop constraint "transaction_from_user_id_foreign";',
    );
    this.addSql(
      'alter table "transaction" drop constraint "transaction_to_user_id_foreign";',
    );

    this.addSql('alter table "user" alter column "balance" drop default;');
    this.addSql(
      'alter table "user" alter column "balance" type int using ("balance"::int);',
    );

    this.addSql(
      'alter table "transaction" add column "user_id" uuid not null;',
    );
    this.addSql(
      'alter table "transaction" add constraint "transaction_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );
    this.addSql('alter table "transaction" drop column "from_user_id";');
    this.addSql('alter table "transaction" drop column "to_user_id";');
  }
}
