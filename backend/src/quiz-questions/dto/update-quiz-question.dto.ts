import { IsOptional, IsString } from 'class-validator';

export class UpdateQuizQuestionDto {
  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  type?: 'Boolean' | 'Input' | 'Checkbox';

  @IsOptional()
  answer?: string;
}
