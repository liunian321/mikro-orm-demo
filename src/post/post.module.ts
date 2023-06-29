import { Module } from '@nestjs/common';
import { PostResolver } from './resolvers/post.resolver';
import { PostService } from './services/post.service';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [PostResolver, PostService],
  exports: [PostResolver],
  imports: [CategoryModule, UserModule],
})
export class PostModule {}
