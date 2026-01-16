import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

class CreateQuizQuestionWithQuizDto {
  @IsString()
  question: string;

  @IsString()
  type: 'Boolean' | 'Input' | 'Checkbox';

  @IsArray()
  @IsString({ each: true })
  answer: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  answerOptions?: string[];
}

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuizQuestionWithQuizDto)
  questions: CreateQuizQuestionWithQuizDto[];
}
