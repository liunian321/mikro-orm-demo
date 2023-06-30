import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { isEmpty } from 'lodash';
import { FilterQuery } from '@mikro-orm/core/typings';
import { PostEntity } from './post.entity';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { ObjectUtil } from '../common/utils/object.util';
import { BasePostInput, CreatePostInput, UpdatePostInput } from './post.input';

@Injectable()
export class PostService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}

  /**
   * 查询帖子
   * @param input
   */
  async queryPosts(input: BasePostInput): Promise<PostEntity[]> {
    const where: FilterQuery<PostEntity> = {
      users:
        typeof input.userIds === 'undefined' || input.userIds.length === 0
          ? undefined
          : await this.userService.getUsersByIds(input.userIds),
      categories:
        typeof input.category === 'undefined'
          ? undefined
          : await this.categoryService.queryMany({
              name: input.category,
            }),
      title: input.title,
    };
    // 过滤掉undefined的属性
    const properties = ObjectUtil.filterUndefinedProperties(where);

    return this.entityManager.find(PostEntity, properties);
  }

  /**
   * 创建帖子
   * @param input
   */
  async createPost(input: CreatePostInput): Promise<PostEntity> {
    const categoryEntity = await this.categoryService.queryMany({
      name: input.category,
    });
    if (isEmpty(categoryEntity)) {
      throw new Error(`类别: ${input.category}不存在`);
    }
    const post = this.entityManager.create(PostEntity, {
      title: input.title,
      content: input.content,
      categories: [],
    });
    await this.entityManager.flush();
    return post;
  }

  /**
   * 删除帖子
   * @param id
   */
  async deletePost(id: number): Promise<boolean> {
    try {
      await this.entityManager.nativeDelete(PostEntity, { id });
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 更新帖子
   * @param input
   */
  async updatePost(input: UpdatePostInput): Promise<PostEntity> {
    const post = await this.entityManager.upsert(PostEntity, {
      id: input.postId,
      ...input,
    });
    return post;
  }
}
