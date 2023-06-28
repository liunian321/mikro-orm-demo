import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostEntity } from '../../entities/post.entity';
import { PostService } from '../services/post.service';
import {
  CreatePostInput,
  QueryPostInput,
  UpdatePostInput,
} from '../../dto/blog.input';

@Resolver(() => PostEntity)
export class PostResolver {
  constructor(private readonly transactionService: PostService) {}

  /**
   * 查询帖子
   * @param input
   */
  @Query(() => [PostEntity], { description: '查询帖子' })
  async queryPost(@Args('input') input: QueryPostInput): Promise<PostEntity[]> {
    return this.transactionService.queryPost(input);
  }

  /**
   * 创建帖子
   */
  @Mutation(() => PostEntity, { description: '创建帖子' })
  async createPost(@Args('input') input: CreatePostInput): Promise<PostEntity> {
    return this.transactionService.createPost(input);
  }

  /**
   * 删除帖子
   */
  @Mutation(() => Boolean, { description: '删除帖子' })
  async deletePost(@Args('id') id: number): Promise<boolean> {
    return this.transactionService.deletePost(id);
  }

  /**
   * 更新帖子
   */
  @Mutation(() => PostEntity, { description: '更新帖子' })
  async updatePost(@Args('input') input: UpdatePostInput): Promise<PostEntity> {
    return this.transactionService.updatePost(input);
  }
}
