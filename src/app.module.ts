import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from './entities/user.entity';
import { PostEntity } from './entities/post.entity';
import process from 'process';
import * as dotenv from 'dotenv';
import { CategoryEntity } from './entities/category.entity';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';

dotenv.config();
@Module({
  imports: [
    MikroOrmModule.forFeature([User, PostEntity, CategoryEntity]),
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      debug: true,
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
      playground: true,
      include: [UserModule, PostModule, CategoryModule],
    }),
    UserModule,
    PostModule,
    CategoryModule,
  ],
})
export class AppModule {}
