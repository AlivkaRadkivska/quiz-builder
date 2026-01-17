'use client';

import { ServerError } from '@/components/layout/server-error';
import { Button } from '@/components/ui/button';
import { deleteQuiz, getQuizzes } from '@/server/quizzes-service';
import { Quiz } from '@/server/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import NotFound from '../layout/not-found';
import QuizLoader from '../layout/quiz-loader';

export default function QuizList() {
  const queryClient = useQueryClient();
  const {
    data: quizzes,
    isLoading,
    isError,
    error,
  } = useQuery<Quiz[], AxiosError>({
    queryKey: ['quizzes'],
    queryFn: getQuizzes,
  });

  const { mutate: removeQuiz } = useMutation({
    mutationFn: deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });

  if (isLoading) return <QuizLoader />;

  if (isError) {
    if (error?.response?.status === 404)
      return <NotFound title="Quizzes not found" />;

    return <ServerError />;
  }

  if (!quizzes || quizzes.length === 0)
    return <NotFound title="Quizzes not found" />;

  return (
    <>
      <h1 className="text-2xl font-bold">All Quizzes</h1>
      {quizzes.map((quiz: Quiz) => (
        <div
          key={quiz.id}
          className="flex justify-between items-center border p-4 rounded"
        >
          <Link
            href={`/quizzes/${quiz.id}`}
            className="hover:underline transition-all"
          >
            {quiz.title} ({quiz.questionCount} questions)
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeQuiz(quiz.id)}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
}
