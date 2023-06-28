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
  name!: string;

  @ManyToMany(() => PostEntity)
  posts = new Collection<PostEntity>(this);
}
