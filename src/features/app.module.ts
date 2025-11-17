import { Module } from '@nestjs/common';
import { TestingModule } from './testing/testing.module';
import { VideosModule } from './videos/videos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from '../core/config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../core/common/exceptions';
import { McpModule } from '@nestjs-mcp/server';
import { MCPServerConfig } from '../core/config/mcp';
import { BlogModule } from './blog/blog.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    McpModule.forRootAsync(MCPServerConfig()),
    TypeOrmModule.forRootAsync(TypeOrmConfigService()),
    TestingModule,
    VideosModule,
    BlogModule,
    PostModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
