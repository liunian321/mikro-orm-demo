import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';
import { TransactionType } from '../common/enums/base.enum';

@ObjectType()
@Entity({ tableName: 'transaction' })
export class TransactionEntity {
  @Field(() => ID)
  @PrimaryKey()
  id!: number;

  /**
   * 交易类型
   */
  @Field()
  @Property()
  type!: TransactionType;

  /**
   * 交易金额
   */
  @Field()
  @Property({ check: 'amount > 0', unsigned: true })
  amount!: number;

  /**
   * 交易时间
   */
  @Field()
  @Property()
  timestamp!: Date;

  @Field()
  @Property({ defaultRaw: 'now()', lazy: true })
  createdAt: Date = new Date();

  @Field()
  @Property({ defaultRaw: 'now()', onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();

  @Field(() => User)
  @ManyToOne(() => User)
  fromUser!: User;

  @Field(() => User)
  @ManyToOne(() => User)
  toUser!: User;
}
