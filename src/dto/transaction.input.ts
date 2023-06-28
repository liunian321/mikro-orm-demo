import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, Min, NotEquals } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class DepositInput {
  @Field()
  userId: string;

  @Field()
  @Min(0, { message: '金额必须大于0' })
  @NotEquals(0)
  @IsNumber()
  amount: number;
}

@InputType()
export class WithdrawInput {
  @Field()
  userId: string;

  @Field()
  @Min(0, { message: '金额必须大于0' })
  @NotEquals(0)
  @IsNumber()
  amount: number;
}

@InputType()
export class RemittanceInput {
  @Field()
  fromUserId: string;

  @Field()
  toUserId: string;

  @Field()
  @Min(0, { message: '金额必须大于0' })
  @NotEquals(0)
  @IsNumber()
  amount: number;
}

@InputType()
export class TransactionInput {
  @Field({ nullable: true })
  fromUserId?: string;

  @Field({ nullable: true })
  toUserId?: string;

  @Field({ nullable: true })
  @Min(0, { message: '金额必须大于0' })
  @NotEquals(0)
  @IsNumber()
  amount?: number;
}
