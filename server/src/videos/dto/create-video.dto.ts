import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { VideoType } from '../../generated/prisma/enums';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9_-]{11}$/, {
    message: 'youtubeId must be exactly 11 valid YouTube ID characters',
  })
  youtubeId: string;

  @IsEnum(VideoType)
  type: VideoType;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
