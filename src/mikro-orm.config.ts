import * as dotenv from 'dotenv';
import process from 'process';

dotenv.config();
module.exports = {
  entities: ['src/entities/*.ts'], // 替换为你的实体文件路径
  dbName:
    typeof process.env.DATABASE_NAME === 'undefined'
      ? 'postgres'
      : process.env.DATABASE_NAME, // 替换为你的数据库名称
  type: 'postgresql', // 替换为你使用的数据库类型
  password:
    typeof process.env.DATABASE_PASSWORD === 'undefined'
      ? 'test'
      : process.env.DATABASE_PASSWORD,
};
