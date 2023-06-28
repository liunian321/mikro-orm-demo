import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';
import { CategoryEntity } from './category.entity';

@ObjectType()
@Entity({ tableName: 'transaction' })
export class PostEntity {
  @Field(() => ID)
  @PrimaryKey()
  id!: number;

  @Field()
  @Property()
  title!: string;

  @Field()
  @Property()
  content!: string;

  @Field()
  @Property({ version: true })
  version!: number;

  @Field()
  @Property({ defaultRaw: 'now()', lazy: true })
  createdAt: Date = new Date();

  @Field()
  @Property({ defaultRaw: 'now()', onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();

  @ManyToMany(() => User)
  users = new Collection<User>(this);

  @ManyToMany(() => CategoryEntity)
  categories = new Collection<CategoryEntity>(this);
}
