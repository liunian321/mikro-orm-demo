import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TransactionEntity } from './transaction.entity';

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

  /**
   * 账户余额
   */
  @Field({ defaultValue: 0, description: '账户余额', nullable: true })
  @Property({ default: 0, onCreate: () => 0, check: 'balance >= 0' })
  balance!: number;

  @Field()
  @Property({ version: true })
  version!: number;

  @Field(() => [TransactionEntity])
  @OneToMany(() => TransactionEntity, (transaction) => transaction.fromUser)
  transactions = new Collection<TransactionEntity>(this);

  @Field()
  @Property({ defaultRaw: 'now()' })
  createdAt: Date = new Date();

  @Field()
  @Property({ defaultRaw: 'now()', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
