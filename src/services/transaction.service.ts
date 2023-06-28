import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { TransactionInput } from '../dto/transaction.input';
import { isEmpty } from 'lodash';
import { TransactionEntity } from '../entities/transaction.entity';
import { FilterQuery, RequiredEntityData } from '@mikro-orm/core/typings';
import { User } from '../entities/user.entity';
import { ObjectUtil } from '../common/util/object.util';

@Injectable()
export class TransactionService {
  constructor(private readonly entityManager: EntityManager) {}

  /**
   * 查询交易记录
   * @param transactionInput
   */
  async queryTransaction(transactionInput: TransactionInput) {
    const fromUserIdIsEmpty = isEmpty(transactionInput.fromUserId);
    const toUserIdIsEmpty = isEmpty(transactionInput.toUserId);
    if (fromUserIdIsEmpty && toUserIdIsEmpty) {
      throw new Error('缺少查询对象');
    }
    const transactionCondition: FilterQuery<TransactionEntity> = {
      timestamp: undefined,
      fromUser: undefined,
      toUser: undefined,
    };

    if (!fromUserIdIsEmpty) {
      const user = new User();
      user.id = transactionInput.fromUserId;
      transactionCondition.fromUser = user;
    }

    if (!toUserIdIsEmpty) {
      const user = new User();
      user.id = transactionInput.toUserId;
      transactionCondition.toUser = user;
    }

    if (!isEmpty(transactionInput.amount)) {
      transactionCondition.amount = transactionInput.amount;
    }
    const filteredObj =
      ObjectUtil.filterUndefinedProperties(transactionCondition);
    return this.entityManager.find(TransactionEntity, filteredObj, {
      cache: 2_000,
      fields: ['amount', 'timestamp', 'type', 'fromUser', 'toUser'],
    });
  }

  /**
   * 创建交易记录
   * @param transaction
   */
  async createTransaction(transaction: RequiredEntityData<TransactionEntity>) {
    const result = this.entityManager.create(TransactionEntity, transaction);
    // await this.entityManager.flush();
    return result;
  }
}
