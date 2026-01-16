import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class CreateQuizQuestionWithQuizDto {
  @IsString()
  question: string;

  @IsString()
  type: 'Boolean' | 'Input' | 'Checkbox';

  @IsString()
  answer: string;
}

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuizQuestionWithQuizDto)
  questions: CreateQuizQuestionWithQuizDto[];
}
