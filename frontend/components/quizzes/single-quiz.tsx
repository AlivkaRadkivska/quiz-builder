'use client';

import { getQuizById } from '@/server/quizzes-service';
import { Quiz, QuizQuestion } from '@/server/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import NotFound from '../layout/not-found';
import QuizLoader from '../layout/quiz-loader';
import { ServerError } from '../layout/server-error';

interface SingleQuizProps {
  id: number;
}

export function SingleQuiz({ id }: SingleQuizProps) {
  const {
    data: quiz,
    isLoading,
    isError,
    error,
  } = useQuery<Quiz, AxiosError>({
    queryKey: ['quiz', id],
    queryFn: () => getQuizById(id),
  });

  if (isLoading) {
    return <QuizLoader />;
  }

  if (isError || !quiz) {
    if (error?.response?.status === 404)
      return <NotFound title="Quiz not found" />;

    return <ServerError />;
  }

  return (
    <>
      <h1 className="text-2xl font-bold">{quiz.title}</h1>

      {quiz.questions?.map((q: QuizQuestion) => (
        <div key={q.id} className="border p-4 rounded space-y-2">
          <div>
            <strong>Q:</strong> {q.question}
          </div>

          <div>
            <strong>Type:</strong> {q.type}
          </div>

          {q.answerOptions && q.answerOptions?.length > 0 && (
            <div>
              <strong>Answer options:</strong> {q.answerOptions.join(', ')}
            </div>
          )}

          <div>
            <strong>Answer:</strong> {q.answer.join(', ')}
          </div>
        </div>
      ))}
    </>
  );
}
