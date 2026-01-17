'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QuizForm, QuizSchema } from '@/lib/zod-schemas';
import { createQuiz } from '@/server/quizzes-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/dist/client/link';
import { useFieldArray, useForm } from 'react-hook-form';
import { DefaultLoader } from '../layout/default-loader';
import { QuizQuestionCard } from './quiz-question-card';

export function CreateQuizForm() {
  const queryClient = useQueryClient();
  const { control, register, handleSubmit, formState, setValue } =
    useForm<QuizForm>({
      resolver: zodResolver(QuizSchema),
      mode: 'all',
      reValidateMode: 'onChange',
      defaultValues: {
        title: '',
        questions: [
          { question: '', type: 'Boolean', answer: [], answerOptions: [] },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray<QuizForm, 'questions'>({
    control,
    name: 'questions',
  });

  const {
    mutate: createNewQuiz,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });

  const onSubmit = (data: QuizForm) => {
    createNewQuiz(data);
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto p-4 space-y-8 flex flex-col items-center py-8">
        <h2>Quiz created successfully!</h2>

        <div className="flex w-full justify-center items-center gap-2">
          <Link href="/quizzes">
            <Button variant="outline">Go to Quizzes</Button>
          </Link>
          <Link href="/create">
            <Button variant="secondary">Create one more Quiz</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isPending) return <DefaultLoader />;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Create your own quiz</h1>

          <Button variant="default" type="submit" disabled={!formState.isValid}>
            Submit
          </Button>
        </div>
        <div>
          <Label>Quiz Title</Label>
          <Input {...register('title')} />

          {formState.errors.title?.message && (
            <div className="text-sm text-destructive space-y-0">
              {formState.errors.title?.message}
            </div>
          )}
          {formState.errors.questions?.message && (
            <div className="text-sm text-destructive space-y-0">
              {formState.errors.questions?.message}
            </div>
          )}
        </div>

        {fields.map((field, index) => (
          <QuizQuestionCard
            key={field.id}
            index={index}
            register={register}
            control={control}
            remove={remove}
            setValue={setValue}
            questionErrors={formState.errors.questions?.[index]}
          />
        ))}

        <div className="w-full flex justify-center">
          <Button
            type="button"
            onClick={() =>
              append({
                question: '',
                type: 'Boolean',
                answer: [],
                answerOptions: [],
              })
            }
          >
            Add Question
          </Button>
        </div>
      </form>
    </div>
  );
}
