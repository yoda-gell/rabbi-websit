import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateQuestionDto {
  @IsOptional()
  @IsString()
  askerName?: string;

  @IsEmail()
  askerEmail: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsBoolean()
  wantsPublishedAnonymous: boolean;
}
