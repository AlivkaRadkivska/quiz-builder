import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { QuizQuestion } from '../../generated/prisma/client';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
import { QuizQuestionsService } from './quiz-questions.service';

@Controller('quiz-questions')
export class QuizQuestionsController {
  constructor(private readonly quizQuestionsService: QuizQuestionsService) {}

  @Get('')
  async getQuizQuestions(): Promise<QuizQuestion[]> {
    return this.quizQuestionsService.getQuizQuestions();
  }

  @Get('quiz/:quizId')
  async getQuizQuestionsByQuizId(
    @Param('quizId', ParseIntPipe) quizId: number,
  ): Promise<QuizQuestion[]> {
    return this.quizQuestionsService.getQuizQuestionsByQuizId(quizId);
  }

  @Get(':id')
  async getQuizQuestionById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<QuizQuestion | null> {
    return this.quizQuestionsService.getQuizQuestionById(id);
  }

  @Post('')
  async createQuizQuestion(
    @Body() dto: CreateQuizQuestionDto,
  ): Promise<QuizQuestion> {
    return this.quizQuestionsService.createQuizQuestion(dto);
  }

  @Patch(':id')
  async updateQuizQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuizQuestionDto,
  ): Promise<QuizQuestion> {
    return this.quizQuestionsService.updateQuizQuestion(id, dto);
  }

  @Delete(':id')
  async deleteQuizQuestion(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<QuizQuestion> {
    return this.quizQuestionsService.deleteQuizQuestion(id);
  }
}
