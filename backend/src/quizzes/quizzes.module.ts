import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';

@Module({
  controllers: [QuizzesController],
  providers: [PrismaService, QuizzesService],
})
export class QuizzesModule {}
