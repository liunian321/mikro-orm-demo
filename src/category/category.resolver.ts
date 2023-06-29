import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryEntity } from './category.entity';
import { ManyCategoryInput, UpdateCategoryInput } from './category.input';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 创建分类
   * @param input
   */
  @Mutation(() => Boolean, { description: '创建分类' })
  async categoryCreate(@Args('input') input: ManyCategoryInput) {
    try {
      return this.categoryService.create(input);
    } catch (e) {
      return false;
    }
  }

  /**
   * 查询分类
   * @param input
   */
  @Query(() => CategoryEntity, { description: '查询分类' })
  async categoriesQuery(@Args('input') input: ManyCategoryInput) {
    return this.categoryService.queryMany(input);
  }

  /**
   * 删除分类
   */
  @Mutation(() => CategoryEntity, { description: '删除分类' })
  async categoryDelete(@Args('id') id: number) {
    return this.categoryService.delete(id);
  }

  /**
   * 更新分类
   */
  @Mutation(() => CategoryEntity, { description: '更新分类' })
  async categoryUpdate(@Args('input') input: UpdateCategoryInput) {
    return this.categoryService.update(input);
  }
}
