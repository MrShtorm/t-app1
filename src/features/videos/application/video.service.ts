import { Injectable, NotFoundException } from '@nestjs/common';
import { VideoRepository } from '../infrastructure/repository';
import { VideoEntity } from '../domain';
import {
  CreateVideoInputModel,
  UpdateVideoInputModel,
} from '../api/models/input';

@Injectable()
export class VideoService {
  constructor(private readonly videoRepository: VideoRepository) {}

  async createVideo(video: CreateVideoInputModel): Promise<number> {
    const newVideo = VideoEntity.create(video);
    const { id } = await this.videoRepository.save(newVideo);
    return id;
  }

  async updateVideo(
    id: number,
    updateVideo: UpdateVideoInputModel,
  ): Promise<void> {
    const video = await this.videoRepository.findById(id);
    if (!video) throw new NotFoundException();
    video.update(updateVideo);
    await this.videoRepository.save(video);
  }

  async deleteVideo(id: number): Promise<void> {
    const video = await this.videoRepository.findById(id);
    if (!video) throw new NotFoundException();
    await this.videoRepository.delete(id);
  }
}
