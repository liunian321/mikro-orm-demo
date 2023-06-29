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
@Entity({ tableName: 'category' })
export class CategoryEntity {
  @Field(() => ID)
  @PrimaryKey()
  id!: number;

  /**
   * 分类名称
   */
  @Field()
  @Property()
  @Unique()
  name!: string;

  @Field()
  @Property({ defaultRaw: 'now()', lazy: true })
  createdAt: Date = new Date();

  @Field()
  @Property({ defaultRaw: 'now()', onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();

  @ManyToMany(() => PostEntity)
  posts = new Collection<PostEntity>(this);
}
