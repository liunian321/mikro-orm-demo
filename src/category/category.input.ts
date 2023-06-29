import { Field, InputType } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsString,
  Length,
} from 'class-validator';

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
