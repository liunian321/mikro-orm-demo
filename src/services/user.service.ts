import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '../entities/user.entity';
import {
  CreateUserInput,
  DepositInput,
  WithdrawInput,
} from '../dto/transaction.input';
import { LockMode } from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) {}

  /**
   * 获取用户
   * @param id
   */
  async getUser(id: string) {
    await this.entityManager.begin();
    const user = await this.entityManager.findOne(
      User,
      { id },
      { lockMode: LockMode.PESSIMISTIC_PARTIAL_WRITE },
    );
    await this.entityManager.commit();
    return user;
  }

  /**
   * 创建用户
   * @param input
   */
  async createUser(input: CreateUserInput) {
    const user = this.entityManager.create(User, input);
    await this.entityManager.flush();
    return user;
  }

  /**
   * 存钱
   * @param input
   */
  async deposit(input: DepositInput): Promise<User> {
    const user = await this.entityManager.findOne(User, { id: input.userId });
    user.balance += input.amount;
    await this.entityManager.flush();
    return user;
  }

  /**
   * 取钱
   * @param input
   */
  async withdraw(input: WithdrawInput): Promise<User> {
    const user = await this.entityManager.findOne(User, { id: input.userId });
    if (user.balance >= input.amount) {
      user.balance -= input.amount;
      await this.entityManager.flush();
      return user;
    } else {
      throw new Error('余额不足');
    }
  }

  /**
   * 删除用户
   * @param id
   */
  async deleteUser(id: string): Promise<boolean> {
    try {
      await this.entityManager.removeAndFlush(await this.getUser(id));
      return true;
    } catch (e) {
      return false;
    }
  }
}
