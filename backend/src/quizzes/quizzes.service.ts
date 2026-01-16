import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Quiz, QuizQuestion, Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async getQuizzes(): Promise<
    { id: number; title: string; createdAt: Date; questionCount: number }[]
  > {
    try {
      const quizzes = await this.prisma.quiz.findMany({
        select: {
          id: true,
          title: true,
          createdAt: true,
          questions: { select: { id: true } },
        },
      });

      return quizzes.map((q) => ({
        id: q.id,
        title: q.title,
        createdAt: q.createdAt,
        questionCount: q.questions.length,
      }));
    } catch (error: unknown) {
      console.error(error);
      throw new BadRequestException('Failed to fetch quizzes');
    }
  }

  async getQuizById(id: number): Promise<Quiz & { questions: QuizQuestion[] }> {
    try {
      const quiz = await this.prisma.quiz.findUnique({
        where: { id },
        include: { questions: true },
      });
      if (!quiz) {
        throw new NotFoundException(`Quiz with id ${id} not found`);
      }
      return quiz;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Failed to fetch quiz');
    }
  }

  async createQuiz(
    dto: CreateQuizDto,
  ): Promise<Quiz & { questions: QuizQuestion[] }> {
    try {
      return await this.prisma.quiz.create({
        data: {
          title: dto.title,
          questions: dto.questions
            ? {
                create: dto.questions.map((q) => ({
                  question: q.question,
                  type: q.type,
                  answer: q.answer,
                  answerOptions: q.answerOptions,
                })),
              }
            : undefined,
        },
        include: { questions: true },
      });
    } catch (error: unknown) {
      console.error(error);
      throw new BadRequestException('Failed to create quiz');
    }
  }

  async updateQuizTitle(id: number, dto: UpdateQuizDto): Promise<Quiz> {
    try {
      const updatedQuiz = await this.prisma.quiz.update({
        where: { id },
        data: { title: dto.title },
      });
      return updatedQuiz;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        // P2025 = record not found
        throw new NotFoundException(`Quiz with id ${id} not found`);
      }
      throw new BadRequestException('Failed to update quiz');
    }
  }

  async deleteQuiz(id: number): Promise<Quiz> {
    try {
      return await this.prisma.quiz.delete({
        where: { id },
        include: { questions: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Quiz with id ${id} not found`);
      }
      throw new BadRequestException('Failed to delete quiz');
    }
  }
}
