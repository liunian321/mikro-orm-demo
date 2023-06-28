import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
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
  name!: string;

  @Field({ nullable: true })
  @Property()
  email!: string;

  @Property({ lazy: true })
  password!: string;

  @ManyToMany(() => PostEntity)
  posts = new Collection<PostEntity>(this);

  @Field()
  @Property({ defaultRaw: 'now()' })
  createdAt: Date = new Date();

  @Field()
  @Property({ defaultRaw: 'now()', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
