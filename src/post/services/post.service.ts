import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import {
  CreatePostInput,
  QueryPostInput,
  UpdatePostInput,
} from '../../dto/blog.input';
import { isEmpty } from 'lodash';
import { PostEntity } from '../../entities/post.entity';
import { Loaded } from '@mikro-orm/core/typings';

@Injectable()
export class PostService {
  constructor(private readonly entityManager: EntityManager) {}

  /**
   * 查询帖子
   * @param input
   */
  async queryPost(input: QueryPostInput): Promise<Loaded<PostEntity>[]> {
    return this.entityManager.find(PostEntity, input);
  }

  /**
   * 创建帖子
   * @param input
   */
  async createPost(input: CreatePostInput): Promise<PostEntity> {
    const post = this.entityManager.create(PostEntity, input);
    await this.entityManager.flush();
    return post;
  }

  /**
   * 删除帖子
   * @param id
   */
  async deletePost(id: number): Promise<boolean> {
    const post = await this.entityManager.findOne(PostEntity, { id: id });
    if (isEmpty(post)) {
      return false;
    }
    await this.entityManager.removeAndFlush(post);
    return true;
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
