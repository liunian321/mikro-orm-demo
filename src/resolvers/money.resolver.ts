import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TransactionEntity } from '../entities/transaction.entity';
import { MoneyService } from '../services/money.service';
import { RemittanceInput } from '../dto/transaction.input';

@Resolver(() => TransactionEntity)
export class MoneyResolver {
  constructor(private readonly moneyService: MoneyService) {}
  /**
   * 汇款
   */
  @Mutation(() => TransactionEntity, { description: '汇款' })
  async remittance(@Args('input') input: RemittanceInput) {
    try {
      return this.moneyService.remittance(input);
    } catch (e) {
      return new TransactionEntity();
    }
  }
}
