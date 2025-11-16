import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resolutions } from './resolutions.enum';
import {
  CreateVideoInputModel,
  UpdateVideoInputModel,
} from '../api/models/input';
import { addDays } from 'date-fns';

@Entity('video')
export class VideoEntity {
  @Column()
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  title: string;
  @Column()
  author: string;
  @Column({ name: 'can_be_downloaded', type: 'boolean' })
  canBeDownloaded: boolean;
  @Column({ name: 'min_age_restriction', nullable: true })
  minAgeRestriction: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @Column({ name: 'publication_date' })
  publicationDate: Date;
  @Column({ type: 'jsonb' })
  availableResolutions: Resolutions[];

  update(video: UpdateVideoInputModel): void {
    this.title = video.title ?? this.title;
    this.author = video.author ?? this.author;
    this.canBeDownloaded = video.canBeDownloaded ?? this.canBeDownloaded;
    this.minAgeRestriction = video.minAgeRestriction ?? this.minAgeRestriction;
    this.publicationDate = video.publicationDate ?? this.publicationDate;
    this.availableResolutions =
      video.availableResolutions ?? this.availableResolutions;
  }

  static create(video: CreateVideoInputModel): VideoEntity {
    const _video = new VideoEntity();
    _video.title = video.title;
    _video.author = video.author;
    _video.canBeDownloaded = false;
    _video.minAgeRestriction = null;
    _video.createdAt = new Date();
    _video.publicationDate = addDays(new Date(), 1);
    _video.availableResolutions = video.availableResolutions;

    return _video;
  }
}
