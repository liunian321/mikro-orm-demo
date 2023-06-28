import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import {
  CreateUserInput,
  DepositInput,
  WithdrawInput,
} from '../dto/transaction.input';
import { User } from '../entities/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * 获取用户
   * @param id
   */
  @Query(() => User, { description: '获取用户' })
  async getUser(@Args('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  /**
   * 创建用户
   * @param input
   */
  @Mutation(() => User, { description: '创建用户' })
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.createUser(input);
  }

  /**
   * 删除用户
   * @param id
   */
  @Mutation(() => Boolean, { description: '删除用户' })
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  }

  /**
   * 存钱
   * @param input
   */
  @Mutation(() => User, { description: '存钱' })
  async deposit(@Args('input') input: DepositInput): Promise<User> {
    return this.userService.deposit(input);
  }

  /**
   * 取钱
   * @param input
   */
  @Mutation(() => User, { description: '取钱' })
  async withdraw(@Args('input') input: WithdrawInput): Promise<User> {
    return this.userService.withdraw(input);
  }
}
