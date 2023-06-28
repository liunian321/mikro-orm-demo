import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CategoryInput, UpdateCategoryInput } from '../../dto/blog.input';
import { CategoryEntity } from '../../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly entityManager: EntityManager) {}

  /**
   * 创建帖子类别
   * @param input
   */
  async create(input: CategoryInput): Promise<CategoryEntity> {
    return this.entityManager.create(CategoryEntity, input);
  }

  /**
   * 查询帖子类别
   * @param input
   */
  async query(input: CategoryInput) {
    return this.entityManager.findOne(CategoryEntity, { name: input.name });
  }

  /**
   * 删除帖子类别
   * @param id
   */
  async delete(id: number): Promise<boolean> {
    try {
      await this.entityManager.removeAndFlush({ id: id });
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 更新帖子类别
   * @param input
   */
  async update(input: UpdateCategoryInput) {
    return this.entityManager.upsert(CategoryEntity, input);
  }
}
