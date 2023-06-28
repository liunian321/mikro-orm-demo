import { Args, Query, Resolver } from '@nestjs/graphql';
import { TransactionEntity } from '../entities/transaction.entity';
import { TransactionService } from '../services/transaction.service';
import { TransactionInput } from '../dto/transaction.input';

@Resolver(() => TransactionEntity)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  /**
   * 查询交易记录
   * @param input
   */
  @Query(() => [TransactionEntity], { description: '查询交易记录' })
  async queryTransaction(@Args('input') input: TransactionInput) {
    return this.transactionService.queryTransaction(input);
  }
}
