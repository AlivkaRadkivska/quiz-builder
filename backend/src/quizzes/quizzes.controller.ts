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
import { Quiz } from '../../generated/prisma/client';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get('')
  async getQuizzes(): Promise<Quiz[]> {
    return this.quizzesService.getQuizzes();
  }

  @Get(':id')
  async getQuizById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Quiz | null> {
    return this.quizzesService.getQuizById(id);
  }

  @Post('')
  async createQuiz(@Body() dto: CreateQuizDto): Promise<Quiz> {
    return this.quizzesService.createQuiz(dto);
  }

  @Patch(':id')
  async updateQuizTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuizDto,
  ): Promise<Quiz> {
    return this.quizzesService.updateQuizTitle(id, dto);
  }

  @Delete(':id')
  async deleteQuiz(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    return this.quizzesService.deleteQuiz(id);
  }
}
