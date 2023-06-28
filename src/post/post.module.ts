import { Module } from '@nestjs/common';
import { PostResolver } from './resolvers/post.resolver';
import { PostService } from './services/post.service';

@Module({ providers: [PostResolver, PostService], exports: [PostResolver] })
export class PostModule {}
