import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcrypt';
import { EntityData, FilterQuery } from '@mikro-orm/core/typings';
import { isEmpty } from 'lodash';
import { User } from './user.entity';
import { ObjectUtil } from '../common/utils/object.util';
import { BCRYPT_ROUND } from '../common/constants/base.constant';
import {
  BaseUserInput,
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from './user.input';

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) {}

  /**
   * 获取用户
   * @param input
   */
  async queryUsersByCondition(input: BaseUserInput): Promise<User[]> {
    const where: FilterQuery<User> = {
      nickName:
        typeof input.nickName === 'undefined'
          ? undefined
          : { $like: `%${input.nickName}%` },
      email: input.email,
    };
    const properties = ObjectUtil.filterUndefinedProperties(where);

    const users = await this.entityManager.find(User, properties);

    if (isEmpty(users)) {
      throw new Error('用户不存在');
    }
    return users;
  }

  async getUsersByIds(ids: string[]): Promise<User[]> {
    const users = await this.entityManager.find(User, {
      id: { $in: ids },
    });

    if (isEmpty(users)) {
      throw new Error('用户不存在');
    }
    return users;
  }

  /**
   * 创建用户
   * @param input
   */
  async createUser(input: CreateUserInput): Promise<User> {
    const data = {
      name: input.name,
      nickName: input.nickName,
      password: await bcrypt.hash(input.password, BCRYPT_ROUND),
      email: input.email,
    };

    const properties = ObjectUtil.filterUndefinedProperties(data);

    const user = this.entityManager.create(User, properties);
    await this.entityManager.flush();
    return user;
  }

  /**
   * 删除用户
   * @param id
   */
  async deleteUser(id: string): Promise<boolean> {
    try {
      await this.entityManager.nativeDelete(User, { id });
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
    const data: EntityData<User> = {
      id: input.userId,
      ...input,
    };

    const properties = ObjectUtil.filterUndefinedProperties(data);

    try {
      await this.entityManager.upsert<User>(User, properties);
      await this.entityManager.flush();
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 登录
   * @param input
   */
  async login(input: LoginUserInput): Promise<User> {
    const user = await this.entityManager.findOne(User, {
      email: input.email,
    });
    if (user === null) {
      throw new Error('用户不存在');
    }

    const password = await bcrypt.hash(input.password, BCRYPT_ROUND);
    if (user.password !== password) {
      throw new Error('密码错误');
    }

    return user;
  }
}
