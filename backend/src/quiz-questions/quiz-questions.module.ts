import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { QuizQuestionsController } from './quiz-questions.controller';
import { QuizQuestionsService } from './quiz-questions.service';

@Module({
  providers: [PrismaService, QuizQuestionsService],
  controllers: [QuizQuestionsController],
})
export class QuizQuestionsModule {}
