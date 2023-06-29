import { Migration } from '@mikro-orm/migrations';

export class Migration20230629035414 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "category" add column "created_at" timestamptz(0) not null default now(), add column "updated_at" timestamptz(0) not null default now();',
    );

    this.addSql(
      'alter table "user" add column "nick_name" varchar(255) not null;',
    );
    this.addSql(
      'alter table "user" add constraint "user_nick_name_unique" unique ("nick_name");',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "category" drop column "created_at";');
    this.addSql('alter table "category" drop column "updated_at";');

    this.addSql('alter table "user" drop constraint "user_nick_name_unique";');
    this.addSql('alter table "user" drop column "nick_name";');
  }
}
