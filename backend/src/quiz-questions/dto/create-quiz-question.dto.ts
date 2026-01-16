import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuizQuestionDto {
  @IsNumber()
  quizId: number;

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
