import { Field, InputType } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@InputType()
export class BasePostInput {
  @Field({ nullable: true })
  @Length(1)
  @IsString()
  @IsOptional()
  postId?: string;

  @Field({ nullable: true })
  @Length(2, 20)
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @Length(1)
  @IsString()
  @IsOptional()
  content?: string;

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
