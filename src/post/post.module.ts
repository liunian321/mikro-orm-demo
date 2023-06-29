import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [PostResolver, PostService],
  exports: [PostResolver],
  imports: [CategoryModule, UserModule],
})
export class PostModule {}
