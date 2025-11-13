import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateVideoInputModel, UpdateVideoInputModel } from './models/input';
import { VideoViewModel } from './models/view';
import { VideoService } from '../application';
import { VideoQueryRepository } from '../infrastructure/repository';

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videoService: VideoService,
    private readonly videoQueryRepository: VideoQueryRepository,
  ) {}

  @HttpCode(201)
  @Post()
  async createVideo(
    @Body() body: CreateVideoInputModel,
  ): Promise<VideoViewModel> {
    const id = await this.videoService.createVideo(body);
    return await this.videoQueryRepository.findById(id);
  }

  @HttpCode(204)
  @Put(':id')
  async updateVideo(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateVideoInputModel,
  ): Promise<void> {
    await this.videoService.updateVideo(id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteVideo(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.videoService.deleteVideo(id);
  }

  @HttpCode(200)
  @Get(':id')
  async getVideo(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<VideoViewModel> {
    return await this.videoQueryRepository.findById(id);
  }

  @HttpCode(200)
  @Get()
  async getVideos(): Promise<VideoViewModel[]> {
    return await this.videoQueryRepository.findAll();
  }
}
