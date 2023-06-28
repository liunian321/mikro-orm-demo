import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from './entities/user.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { InterestRate } from './entities/interestRate.entity';
import { MoneyResolver } from './resolvers/money.resolver';
import { TransactionResolver } from './resolvers/transaction.resolver';
import { MoneyService } from './services/money.service';
import { TransactionService } from './services/transaction.service';
import process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    MikroOrmModule.forFeature([User, TransactionEntity, InterestRate]),
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      driver: PostgreSqlDriver,
      dbName:
        typeof process.env.DATABASE_NAME === 'undefined'
          ? 'postgres'
          : process.env.DATABASE_NAME,
      user:
        typeof process.env.DATABASE_USERNAME === 'undefined'
          ? 'postgres'
          : process.env.DATABASE_USERNAME,
      password:
        typeof process.env.DATABASE_PASSWORD === 'undefined'
          ? 'test'
          : process.env.DATABASE_PASSWORD,
      host:
        typeof process.env.DATABASE_HOST === 'undefined'
          ? 'localhost'
          : process.env.DATABASE_HOST,
      port: parseInt(
        typeof process.env.DATABASE_PORT === 'undefined'
          ? '5432'
          : process.env.DATABASE_PORT,
      ),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [
    UserResolver,
    MoneyResolver,
    TransactionResolver,
    UserService,
    MoneyService,
    TransactionService,
  ],
})
export class AppModule {}
