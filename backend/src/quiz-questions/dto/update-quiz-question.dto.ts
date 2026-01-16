import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateQuizQuestionDto {
  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  type?: 'Boolean' | 'Input' | 'Checkbox';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  answer?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  answerOptions?: string[];
}
