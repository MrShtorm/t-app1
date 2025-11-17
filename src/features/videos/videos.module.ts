import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity, VideoViewEntity } from './domain';
import { VideosController, VideosMcp } from './api';
import { VideoService } from './application';
import {
  VideoQueryRepository,
  VideoRepository,
} from './infrastructure/repository';
import { VideoAdapter, VideoQueryAdapter } from './infrastructure/adapter';
import { McpModule } from '@nestjs-mcp/server';

@Module({
  imports: [
    McpModule.forFeature(),
    TypeOrmModule.forFeature([VideoEntity, VideoViewEntity]),
  ],
  controllers: [
    /*VideosController*/
  ],
  providers: [
    VideosMcp,
    VideoService,
    {
      provide: VideoRepository,
      useClass: VideoAdapter,
    },
    {
      provide: VideoQueryRepository,
      useClass: VideoQueryAdapter,
    },
  ],
  exports: [],
})
export class VideosModule {}
