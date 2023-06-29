import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import {
  ManyCategoryInput,
  CategoryInput,
  UpdateCategoryInput,
} from '../../dto/blog.input';
import { CategoryEntity } from '../../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly entityManager: EntityManager) {}

  /**
   * 创建帖子类别
   * @param input
   */
  async create(input: ManyCategoryInput) {
    try {
      // TODO: 优化获取表名
      const query = `INSERT INTO category (name) VALUES ${input.name
        .map((entity) => `('${entity}')`)
        .join(',')}`;
      await this.entityManager.execute<CategoryEntity[]>(query);
      await this.entityManager.flush();
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 查询帖子类别
   * @param input
   */
  async queryOne(input: CategoryInput): Promise<CategoryEntity> {
    return this.entityManager.findOne(CategoryEntity, input);
  }

  /**
   * 查询帖子类别
   * @param input
   */
  async queryMany(input: ManyCategoryInput) {
    return this.entityManager.find(CategoryEntity, {
      name: { $in: input.name },
    });
  }

  /**
   * 删除帖子类别
   * @param id
   */
  async delete(id: number): Promise<boolean> {
    try {
      await this.entityManager.nativeDelete(CategoryEntity, { id: id });
      await this.entityManager.flush();
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
    const category = await this.entityManager.upsert(CategoryEntity, {
      id: input.id,
      name: input.name,
    });
    await this.entityManager.flush();
    return category;
  }
}
