import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostEntity } from '../../entities/post.entity';
import { CategoryService } from '../services/category.service';
import { CategoryInput, UpdateCategoryInput } from '../../dto/blog.input';
import { CategoryEntity } from '../../entities/category.entity';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 创建分类
   * @param input
   */
  @Mutation(() => CategoryEntity, { description: '创建分类' })
  async createCategory(@Args('input') input: CategoryInput) {
    try {
      return this.categoryService.create(input);
    } catch (e) {
      return new PostEntity();
    }
  }

  /**
   * 查询分类
   * @param input
   */
  @Query(() => CategoryEntity, { description: '查询分类' })
  async queryCategory(@Args('input') input: CategoryInput) {
    return this.categoryService.query(input);
  }

  /**
   * 删除分类
   */
  @Mutation(() => CategoryEntity, { description: '删除分类' })
  async deleteCategory(@Args('id') id: number) {
    return this.categoryService.delete(id);
  }

  /**
   * 更新分类
   */
  @Mutation(() => CategoryEntity, { description: '更新分类' })
  async updateCategory(@Args('input') input: UpdateCategoryInput) {
    return this.categoryService.update(input);
  }
}
