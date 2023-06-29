import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import {
  CreatePostInput,
  QueryPostInput,
  UpdatePostInput,
} from '../../dto/blog.input';
import { isEmpty } from 'lodash';
import { PostEntity } from '../../entities/post.entity';
import { FilterQuery, Loaded } from '@mikro-orm/core/typings';
import { CategoryService } from '../../category/services/category.service';
import { UserService } from '../../user/services/user.service';
import { ObjectUtil } from '../../common/util/object.util';

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
  async queryPost(input: QueryPostInput): Promise<Loaded<PostEntity>[]> {
    const where: FilterQuery<PostEntity> = {
      users: isEmpty(input.userIds)
        ? undefined
        : await this.userService.getUsersByIds(input.userIds),
      categories: isEmpty(input.category)
        ? undefined
        : await this.categoryService.queryMany({
            name: input.category,
          }),
      title: input.title,
    };
    // 过滤掉undefined的属性
    const filterUndefinedProperties =
      ObjectUtil.filterUndefinedProperties(where);

    return this.entityManager.find(PostEntity, filterUndefinedProperties);
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
      throw new Error(`类别${input.category}不存在`);
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
      await this.entityManager.flush();
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
    await this.entityManager.flush();
    return post;
  }
}
