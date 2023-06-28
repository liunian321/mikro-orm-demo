import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, Length } from 'class-validator';

@InputType()
export class BaseUserInput {
  @Field({ nullable: true })
  @Length(2, 20)
  name?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
}

@InputType()
export class UserInput extends BaseUserInput {
  @Field()
  @Length(6, 32)
  password: string;
}
@InputType()
export class UpdateUserInput extends UserInput {
  @Field()
  userId: string;
}

@InputType()
export class QueryPostInput {
  @Field({ nullable: true })
  @Length(1, 20)
  title?: string;

  @Field({ nullable: true })
  userId?: string;
}

@InputType()
export class CreatePostInput {
  @Field()
  @Length(1, 20)
  title: string;

  @Field()
  userId: string;

  @Field()
  @Length(1)
  content: string;
}

@InputType()
export class UpdatePostInput {
  @Field()
  postId: number;

  @Field()
  @Length(1, 20)
  title: string;

  @Field()
  @Length(1)
  content: string;
}

@InputType()
export class CategoryInput {
  @Field()
  @Length(1, 20)
  name: string;
}

@InputType()
export class UpdateCategoryInput extends CategoryInput {
  @Field()
  id: number;
}
