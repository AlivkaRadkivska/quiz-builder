import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, QuizQuestion } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';

@Injectable()
export class QuizQuestionsService {
  constructor(private prisma: PrismaService) {}

  async getQuizQuestions(): Promise<QuizQuestion[]> {
    try {
      return await this.prisma.quizQuestion.findMany({});
    } catch (error: unknown) {
      console.error(error);
      throw new BadRequestException('Failed to fetch quiz questions');
    }
  }

  async getQuizQuestionById(id: number): Promise<QuizQuestion> {
    try {
      const question = await this.prisma.quizQuestion.findUnique({
        where: { id },
      });
      if (!question) {
        throw new NotFoundException(`Quiz question with id ${id} not found`);
      }
      return question;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Failed to fetch quiz question');
    }
  }

  async getQuizQuestionsByQuizId(quizId: number): Promise<QuizQuestion[]> {
    try {
      return await this.prisma.quizQuestion.findMany({
        where: { quizId },
      });
    } catch (error: unknown) {
      console.error(error);
      throw new BadRequestException(
        'Failed to fetch quiz questions for this quiz',
      );
    }
  }

  async createQuizQuestion(dto: CreateQuizQuestionDto): Promise<QuizQuestion> {
    try {
      return await this.prisma.quizQuestion.create({
        data: {
          question: dto.question,
          type: dto.type,
          answer: dto.answer,
          answerOptions: dto.answerOptions,
          quiz: { connect: { id: dto.quizId } },
        },
      });
    } catch (error: unknown) {
      console.error(error);
      throw new BadRequestException('Failed to create quiz question');
    }
  }

  async updateQuizQuestion(
    id: number,
    dto: UpdateQuizQuestionDto,
  ): Promise<QuizQuestion> {
    try {
      return await this.prisma.quizQuestion.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Quiz question with id ${id} not found`);
      }
      throw new BadRequestException('Failed to update quiz question');
    }
  }

  async deleteQuizQuestion(id: number): Promise<QuizQuestion> {
    try {
      return await this.prisma.quizQuestion.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Quiz question with id ${id} not found`);
      }
      throw new BadRequestException('Failed to delete quiz question');
    }
  }
}
