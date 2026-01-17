'use client';

import { QuizQuestionForm } from '@/lib/zod-schemas';
import {
  addQuizQuestion,
  deleteQuizQuestion,
  getQuizById,
} from '@/server/quizzes-service';
import { Quiz, QuizQuestion } from '@/server/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import NotFound from '../layout/not-found';
import QuizLoader from '../layout/quiz-loader';
import { ServerError } from '../layout/server-error';
import { Button } from '../ui/button';
import { SingleQuestionForm } from './single-question-form';

interface SingleQuizProps {
  id: number;
}

export function SingleQuiz({ id }: SingleQuizProps) {
  const queryClient = useQueryClient();

  const {
    data: quiz,
    isLoading,
    isError,
    error,
  } = useQuery<Quiz, AxiosError>({
    queryKey: ['quiz', id],
    queryFn: () => getQuizById(id),
  });

  const { mutate: removeQuestion } = useMutation({
    mutationFn: deleteQuizQuestion,
    onSuccess: (_, questionId) => {
      queryClient.setQueryData<Quiz>(['quiz', id], (old) => {
        if (!old) return old;

        return {
          ...old,
          questions: old?.questions?.filter((q) => q.id !== questionId),
        };
      });
    },
  });

  const { mutate: addQuestion } = useMutation({
    mutationFn: (data: QuizQuestionForm) => addQuizQuestion(id, data),
    onSuccess: (newQuestion: QuizQuestion) => {
      queryClient.setQueryData<Quiz>(['quiz', id], (old) => {
        if (!old) return old;

        return {
          ...old,
          questions: [...(old?.questions || []), newQuestion],
        };
      });
    },
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
        <div key={q.id} className="border p-4 rounded space-y-2 relative">
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            onClick={() => removeQuestion(q.id)}
            className="absolute top-1 right-1"
          >
            ✕
          </Button>

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

      <div className="w-full flex justify-center">
        <div className="border px-6 py-1 rounded text-xl">+</div>
      </div>

      <SingleQuestionForm onSubmit={addQuestion} />
    </>
  );
}
