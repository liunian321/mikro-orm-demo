import { EntityManager } from '@mikro-orm/postgresql';
import { TransactionEntity } from '../entities/transaction.entity';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { RemittanceInput } from '../dto/transaction.input';
import { TransactionType } from '../common/enums/base.enum';
import { TransactionService } from './transaction.service';

@Injectable()
export class MoneyService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly transactionService: TransactionService,
  ) {}
  /**
   * 汇款
   * @param remittanceInput
   */
  async remittance(
    remittanceInput: RemittanceInput,
  ): Promise<TransactionEntity> {
    // 确认汇款用户存在
    const fromUser = await this.entityManager.findOne(User, {
      id: remittanceInput.fromUserId,
    });

    if (!fromUser) {
      throw new Error('转账用户不存在');
    }

    // 确认余额
    if (fromUser.balance < remittanceInput.amount) {
      throw new Error('余额不足');
    }

    if (remittanceInput.amount <= 0) {
      throw new Error('金额必须大于0');
    }

    // 确认收款用户存在
    const toUser = await this.entityManager.findOne(User, {
      id: remittanceInput.toUserId,
    });
    if (!toUser) {
      throw new Error('收款用户不存在');
    }
    await this.entityManager.begin();

    try {
      // 转账用户扣钱
      fromUser.balance -= remittanceInput.amount;
      await this.entityManager.upsert(fromUser);
      // 收款用户加钱
      toUser.balance += remittanceInput.amount;
      await this.entityManager.upsert(toUser);

      // 保存转账记录

      const transaction = this.transactionService.createTransaction({
        amount: remittanceInput.amount,
        timestamp: new Date(),
        type: TransactionType.REMITTANCE,
        fromUser: fromUser,
        toUser: toUser,
      });

      await this.entityManager.flush();
      // 提交事务
      await this.entityManager.commit();
      return transaction;
    } catch (e) {
      console.log(e);
      await this.entityManager.rollback();
    }
  }
}
