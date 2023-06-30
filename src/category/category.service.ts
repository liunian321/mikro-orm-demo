import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { CategoryEntity } from './category.entity';
import { ManyCategoryInput, UpdateCategoryInput } from './category.input';

@Injectable()
export class CategoryService {
  constructor(private readonly entityManager: EntityManager) {}

  /**
   * 创建帖子类别
   * @param input
   */
  async create(input: ManyCategoryInput): Promise<boolean> {
    try {
      // TODO: 优化获取表名
      const query = `INSERT INTO category (name) VALUES ${input.name
        .map((entity) => `('${entity}')`)
        .join(',')}`;
      await this.entityManager.execute<CategoryEntity[]>(query);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 查询帖子类别
   * @param input
   */
  async queryMany(input: ManyCategoryInput): Promise<CategoryEntity[]> {
    const categoryEntities = await this.entityManager.find(CategoryEntity, {
      name: { $in: input.name },
    });
    if (isEmpty(categoryEntities)) {
      throw new Error('分类不存在');
    }
    return categoryEntities;
  }

  /**
   * 删除帖子类别
   * @param id
   */
  async delete(id: number): Promise<boolean> {
    const categoryEntity = await this.entityManager.findOne(CategoryEntity, {
      id,
    });
    if (categoryEntity === null) {
      throw new Error('分类不存在');
    }
    if (!isEmpty(categoryEntity.posts)) {
      throw new Error('分类下存在帖子，不能删除');
    }
    await this.entityManager.nativeDelete(CategoryEntity, { id });
    return true;
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
    return category;
  }
}
