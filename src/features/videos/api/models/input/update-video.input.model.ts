import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Resolutions } from '../../../domain/resolutions.enum';
import { Transform } from 'class-transformer';

export class UpdateVideoInputModel {
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  title: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  author: string;
  @IsNotEmpty()
  @IsArray()
  @IsEnum(Resolutions, { each: true })
  availableResolutions: Resolutions[];
  @IsNotEmpty()
  @IsBoolean()
  canBeDownloaded: true;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(18)
  minAgeRestriction: number | null;
  @IsNotEmpty()
  // @IsDate()
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
  publicationDate: Date;
}
