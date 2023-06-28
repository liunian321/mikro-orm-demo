import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class InterestRate {
  @Field(() => ID)
  @PrimaryKey()
  id!: number;

  /**
   * 利率
   */
  @Field()
  @Property()
  rate!: number;

  /**
   * 生效时间
   */
  @Field()
  @Property()
  effectiveFrom!: Date;
}
