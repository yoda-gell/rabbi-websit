import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @IsOptional()
  @IsString()
  answer?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  isPublished?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labels?: string[];
}
