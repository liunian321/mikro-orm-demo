import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PostEntity } from './post.entity';

@ObjectType()
@Entity({ tableName: 'user' })
export class User {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Field()
  @Property()
  @Unique()
  nickName!: string;

  @Field()
  @Property()
  name!: string;

  @Field({ nullable: true })
  @Property()
  email!: string;

  @Property({ lazy: true })
  password!: string;

  @Field({ nullable: true })
  @Property({ defaultRaw: 'now()', lazy: true })
  createdAt: Date = new Date();

  @Field({ nullable: true })
  @Property({ defaultRaw: 'now()', onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();

  @ManyToMany(() => PostEntity)
  posts = new Collection<PostEntity>(this);
}
