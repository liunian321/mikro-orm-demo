import { Migration } from '@mikro-orm/migrations';

export class Migration20230628113457 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "category" ("id" serial primary key, "name" varchar(255) not null);');

    this.addSql('create table "transaction" ("id" serial primary key, "title" varchar(255) not null, "content" varchar(255) not null, "version" int not null default 1, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now());');

    this.addSql('create table "category_posts" ("category_entity_id" int not null, "post_entity_id" int not null, constraint "category_posts_pkey" primary key ("category_entity_id", "post_entity_id"));');

    this.addSql('create table "transaction_categories" ("post_entity_id" int not null, "category_entity_id" int not null, constraint "transaction_categories_pkey" primary key ("post_entity_id", "category_entity_id"));');

    this.addSql('create table "user" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), constraint "user_pkey" primary key ("id"));');

    this.addSql('create table "transaction_users" ("post_entity_id" int not null, "user_id" uuid not null, constraint "transaction_users_pkey" primary key ("post_entity_id", "user_id"));');

    this.addSql('create table "user_posts" ("user_id" uuid not null, "post_entity_id" int not null, constraint "user_posts_pkey" primary key ("user_id", "post_entity_id"));');

    this.addSql('alter table "category_posts" add constraint "category_posts_category_entity_id_foreign" foreign key ("category_entity_id") references "category" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "category_posts" add constraint "category_posts_post_entity_id_foreign" foreign key ("post_entity_id") references "transaction" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "transaction_categories" add constraint "transaction_categories_post_entity_id_foreign" foreign key ("post_entity_id") references "transaction" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "transaction_categories" add constraint "transaction_categories_category_entity_id_foreign" foreign key ("category_entity_id") references "category" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "transaction_users" add constraint "transaction_users_post_entity_id_foreign" foreign key ("post_entity_id") references "transaction" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "transaction_users" add constraint "transaction_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_posts" add constraint "user_posts_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_posts" add constraint "user_posts_post_entity_id_foreign" foreign key ("post_entity_id") references "transaction" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "interest_rate" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "category_posts" drop constraint "category_posts_category_entity_id_foreign";');

    this.addSql('alter table "transaction_categories" drop constraint "transaction_categories_category_entity_id_foreign";');

    this.addSql('alter table "category_posts" drop constraint "category_posts_post_entity_id_foreign";');

    this.addSql('alter table "transaction_categories" drop constraint "transaction_categories_post_entity_id_foreign";');

    this.addSql('alter table "transaction_users" drop constraint "transaction_users_post_entity_id_foreign";');

    this.addSql('alter table "user_posts" drop constraint "user_posts_post_entity_id_foreign";');

    this.addSql('alter table "transaction_users" drop constraint "transaction_users_user_id_foreign";');

    this.addSql('alter table "user_posts" drop constraint "user_posts_user_id_foreign";');

    this.addSql('create table "interest_rate" ("id" serial primary key, "rate" int4 not null default null, "effective_from" timestamptz not null default null);');

    this.addSql('drop table if exists "category" cascade;');

    this.addSql('drop table if exists "transaction" cascade;');

    this.addSql('drop table if exists "category_posts" cascade;');

    this.addSql('drop table if exists "transaction_categories" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "transaction_users" cascade;');

    this.addSql('drop table if exists "user_posts" cascade;');
  }

}
