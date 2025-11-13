import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Resolutions } from '../../../domain/resolutions.enum';

export class UpdateVideoInputModel {
  @IsOptional()
  @IsString()
  @MaxLength(40)
  title: string;
  @IsOptional()
  @IsString()
  @MaxLength(20)
  author: string;
  @IsOptional()
  @IsArray()
  @IsEnum(Resolutions, { each: true })
  availableResolutions: Resolutions[];
  @IsOptional()
  @IsBoolean()
  canBeDownloaded: true;
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(18)
  minAgeRestriction: number | null;
  @IsOptional()
  @IsDate()
  publicationDate: Date;
}
