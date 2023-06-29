import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '../../entities/user.entity';
import {
  BaseUserInput,
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from '../../dto/blog.input';
import { isEmpty } from 'lodash';
import * as bcrypt from 'bcrypt';
import { EntityData, FilterQuery } from '@mikro-orm/core/typings';
import { ObjectUtil } from '../../common/util/object.util';
import { BCRYPT_ROUND } from '../../common/constants/base.constant';

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) {}

  /**
   * 获取用户
   * @param input
   */
  async queryUsersByCondition(input: BaseUserInput): Promise<User[]> {
    const where: FilterQuery<User> = {
      nickName: isEmpty(input.nickName)
        ? undefined
        : { $like: '%' + input.nickName + '%' },
      email: input.email,
    };
    const filterUndefinedProperties =
      ObjectUtil.filterUndefinedProperties(where);

    return this.entityManager.find(User, filterUndefinedProperties);
  }

  async getUsersByIds(ids: string[]): Promise<User[]> {
    return this.entityManager.find(User, {
      id: { $in: ids },
    });
  }

  /**
   * 创建用户
   * @param input
   */
  async createUser(input: CreateUserInput): Promise<User> {
    input.password = await bcrypt.hash(input.password, BCRYPT_ROUND);
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
      await this.entityManager.nativeDelete(User, { id });
      await this.entityManager.flush();
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
    const filterUndefinedProperties =
      ObjectUtil.filterUndefinedProperties(data);

    try {
      const user = await this.entityManager.upsert(
        User,
        filterUndefinedProperties,
      );
      await this.entityManager.flush();
      return !isEmpty(user);
    } catch (e) {
      return false;
    }
  }

  /**
   * 登录
   * @param input
   */
  async login(input: LoginUserInput) {
    const user = await this.entityManager.findOne(User, {
      nickName: input.nickName,
    });
    if (isEmpty(user)) {
      throw new Error('用户不存在');
    }

    const password = await bcrypt.hash(input.password, BCRYPT_ROUND);
    if (user.password !== password) {
      throw new Error('密码错误');
    }

    return user;
  }
}
