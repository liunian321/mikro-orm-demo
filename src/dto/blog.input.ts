import { Field, InputType } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@InputType()
export class BaseUserInput {
  @Field({ nullable: true })
  @Length(2, 20)
  @IsOptional()
  @IsString()
  nickName?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
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
  name: string;
}

@InputType()
export class UpdateUserInput extends CreateUserInput {
  @Field()
  @Length(2, 20)
  @IsString()
  name: string;

  @Field()
  @IsString()
  userId: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  @Length(2, 20)
  @IsString()
  nickName: string;

  @Field()
  @Length(6, 32)
  @IsString()
  password: string;
}

@InputType()
export class QueryPostInput {
  @Field({ nullable: true })
  @Length(1, 20)
  @IsOptional()
  title?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  userIds?: string[];

  @Field(() => [String], { nullable: true })
  @ArrayMinSize(1)
  @IsArray()
  @IsOptional()
  category?: string[];
}

@InputType()
export class CreatePostInput {
  @Field()
  @Length(1, 20)
  title: string;

  @Field(() => [String])
  @ArrayMinSize(1)
  @IsArray()
  category: string[];

  @Field()
  @IsString()
  userId: string;

  @Field()
  @Length(1)
  @IsString()
  content: string;
}

@InputType()
export class UpdatePostInput {
  @Field()
  @IsInt()
  postId: number;

  @Field()
  @Length(1, 20)
  @IsString()
  title: string;

  @Field()
  @Length(1)
  @IsString()
  content: string;
}

@InputType()
export class CategoryInput {
  @Field()
  @Length(1, 10)
  @IsString()
  name: string;
}

@InputType()
export class UpdateCategoryInput extends CategoryInput {
  @Field()
  @IsInt()
  id: number;
}

@InputType()
export class ManyCategoryInput {
  @Field(() => [String])
  @ArrayMinSize(1)
  @IsArray()
  name: string[];
}
