import { Injectable, NotFoundException } from '@nestjs/common';
import { VideoQueryRepository } from '../repository';
import { VideoViewEntity } from '../../domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VideoQueryAdapter implements VideoQueryRepository {
  constructor(
    @InjectRepository(VideoViewEntity)
    private readonly videoRepository: Repository<VideoViewEntity>,
  ) {}
  async findAll(): Promise<VideoViewEntity[]> {
    return await this.videoRepository.find();
  }
  async findById(id: number): Promise<VideoViewEntity | null> {
    const video = await this.videoRepository.findOne({ where: { id } });
    if (!video) throw new NotFoundException();
    return video;
  }
}
