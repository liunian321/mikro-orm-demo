import { Migration } from '@mikro-orm/migrations';

export class Migration20230627113121 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "interest_rate" ("id" serial primary key, "rate" int not null, "effective_from" timestamptz(0) not null);',
    );

    this.addSql(
      'create table "user" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "balance" int not null, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), constraint "user_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "transaction" ("id" serial primary key, "user_id" uuid not null, "type" varchar(255) not null, "amount" int not null, "timestamp" timestamptz(0) not null, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now());',
    );

    this.addSql(
      'alter table "transaction" add constraint "transaction_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "transaction" drop constraint "transaction_user_id_foreign";',
    );

    this.addSql('drop table if exists "interest_rate" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "transaction" cascade;');
  }
}
