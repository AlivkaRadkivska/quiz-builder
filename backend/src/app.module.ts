import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuizQuestionsModule } from './quiz-questions/quiz-questions.module';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [
    QuizzesModule,
    QuizQuestionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
