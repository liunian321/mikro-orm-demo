import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { BasePostInput, CreatePostInput, UpdatePostInput } from './post.input';

@Resolver(() => PostEntity)
export class PostResolver {
  constructor(private readonly transactionService: PostService) {}

  /**
   * 查询帖子
   * @param input
   */
  @Query(() => [PostEntity], { description: '查询帖子' })
  async postsQuery(@Args('input') input: BasePostInput): Promise<PostEntity[]> {
    return this.transactionService.queryPosts(input);
  }

  /**
   * 创建帖子
   */
  @Mutation(() => PostEntity, { description: '创建帖子' })
  async postCreate(@Args('input') input: CreatePostInput): Promise<PostEntity> {
    return this.transactionService.createPost(input);
  }

  /**
   * 删除帖子
   */
  @Mutation(() => Boolean, { description: '删除帖子' })
  async postDelete(@Args('id') id: number): Promise<boolean> {
    return this.transactionService.deletePost(id);
  }

  /**
   * 更新帖子
   */
  @Mutation(() => PostEntity, { description: '更新帖子' })
  async postUpdate(@Args('input') input: UpdatePostInput): Promise<PostEntity> {
    return this.transactionService.updatePost(input);
  }
}
