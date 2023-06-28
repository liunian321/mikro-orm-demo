import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '../../entities/user.entity';
import {
  BaseUserInput,
  UpdateUserInput,
  UserInput,
} from '../../dto/blog.input';
import { isEmpty } from 'lodash';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) {}

  /**
   * 获取用户
   * @param input
   */
  async getUsers(input: BaseUserInput): Promise<User[]> {
    return this.entityManager.find(User, {
      name: { $like: '%' + input.name + '%' },
      ...(input.email ? { email: input.email } : {}),
    });
  }

  /**
   * 创建用户
   * @param input
   */
  async createUser(input: UserInput): Promise<User> {
    input.password = await bcrypt.hash(input.password, 10);
    const user = this.entityManager.create(User, input);
    await this.entityManager.flush();
    return user;
  }

  /**
   * 删除用户
   * @param id
   */
  async deleteUser(id: string): Promise<boolean> {
    try {
      await this.entityManager.removeAndFlush({ id });
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 修改资料
   * @param input
   */
  async updateUser(input: UpdateUserInput): Promise<boolean> {
    try {
      const user = await this.entityManager.upsert(User, {
        id: input.userId,
        ...input,
      });
      return !isEmpty(user);
    } catch (e) {
      return false;
    }
  }
}
