import { Module } from '@nestjs/common';
import { CategoryResolver } from './resolvers/category.resolver';
import { CategoryService } from './services/category.service';

@Module({
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
