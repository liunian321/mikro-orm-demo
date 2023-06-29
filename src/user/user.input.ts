import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class BaseUserInput {
  @Field({ nullable: true })
  @Length(1)
  @IsString()
  @IsOptional()
  userId?: string;

  @Field({ nullable: true })
  @Length(2, 20)
  @IsOptional()
  @IsString()
  nickName?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @Length(6, 32)
  @IsString()
  @IsOptional()
  password?: string;

  @Field({ nullable: true })
  @Length(2, 20)
  @IsString()
  @IsOptional()
  name?: string;
}

@InputType()
export class CreateUserInput extends BaseUserInput {
  @Field()
  @Length(6, 32)
  @IsString()
  password: string;

  @Field()
  @Length(2, 20)
  @IsString()
  nickName: string;
}

@InputType()
export class UpdateUserInput extends BaseUserInput {
  @Field()
  @IsString()
  userId: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(6, 32)
  @IsString()
  password: string;
}
