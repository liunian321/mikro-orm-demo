import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import {
  BaseUserInput,
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from './user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * 获取用户
   * @param input
   */
  @Query(() => [User], { description: '获取用户' })
  async usersQuery(@Args('input') input: BaseUserInput): Promise<User[]> {
    return this.userService.queryUsersByCondition(input);
  }

  /**
   * 创建用户
   * @param input
   */
  @Mutation(() => User, { description: '创建用户' })
  async userCreate(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.createUser(input);
  }

  /**
   * 删除用户
   * @param id
   */
  @Mutation(() => Boolean, { description: '删除用户' })
  async userDelete(@Args('id') id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  }

  /**
   * 修改资料
   */
  @Mutation(() => Boolean, { description: '修改资料' })
  async userUpdate(@Args('input') input: UpdateUserInput): Promise<boolean> {
    return this.userService.updateUser(input);
  }

  /**
   * 登录
   */
  @Query(() => User, { description: '登录' })
  async login(@Args('input') input: LoginUserInput): Promise<User> {
    return this.userService.login(input);
  }
}
