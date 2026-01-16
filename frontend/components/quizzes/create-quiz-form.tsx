'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QuizForm, QuizSchema } from '@/lib/zod-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { QuizQuestionCard } from './quiz-question-card';

export function CreateQuizForm() {
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

  const onSubmit = (data: QuizForm) => {
    console.log('Submitting quiz:', data);
    // POST /quizzes here
  };

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
