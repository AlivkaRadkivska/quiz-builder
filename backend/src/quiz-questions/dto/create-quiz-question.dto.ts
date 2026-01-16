import { IsNumber, IsString } from 'class-validator';

export class CreateQuizQuestionDto {
  @IsNumber()
  quizId: number;

  @IsString()
  question: string;

  @IsString()
  type: 'Boolean' | 'Input' | 'Checkbox';

  @IsString()
  answer: string;
}
