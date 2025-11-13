import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Resolutions } from '../../../domain/resolutions.enum';
import { Type } from 'class-transformer';

export class UpdateVideoInputModel {
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  @Type(() => String)
  title: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @Type(() => String)
  author: string;
  @IsNotEmpty()
  @IsArray()
  @IsEnum(Resolutions, { each: true })
  availableResolutions: Resolutions[];
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  canBeDownloaded: true;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(18)
  @Type(() => Number)
  minAgeRestriction: number | null;
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  publicationDate: Date;
}
