import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { QuestionSchema, QuizQuestionForm } from '@/lib/zod-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';

interface SingleQuestionFormProps {
  onSubmit: (question: QuizQuestionForm) => void;
}

export function SingleQuestionForm({ onSubmit }: SingleQuestionFormProps) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<QuizQuestionForm>({
    resolver: zodResolver(QuestionSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      question: '',
      type: 'Boolean',
      answer: [],
      answerOptions: [],
    },
  });

  const type = useWatch({ control, name: 'type' });

  const watchedOptions = useWatch({
    control,
    name: `answerOptions`,
  });

  const watchedAnswer = useWatch({
    control,
    name: `answer`,
  });

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: 'answerOptions',
  });

  useEffect(() => {
    setValue('answer', []);
    setValue('answerOptions', []);

    if (type === 'Input') {
      setValue('answer.0', '');
    }
  }, [type, setValue]);

  const handleRemoveOption = (optIndex: number) => {
    const optionValue = watchedOptions?.[optIndex]?.value;

    removeOption(optIndex);

    // Also remove from answers if it was selected
    if (optionValue) {
      const filteredAnswers = watchedAnswer?.filter(
        (ans) => ans !== optionValue,
      );

      setValue('answer', filteredAnswers ?? []);
    }
  };

  const onSubmitHandler = (data: QuizQuestionForm) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="space-y-4 border p-6 rounded"
    >
      {/* QUESTION */}
      <div>
        <Label>New Question</Label>
        <Input {...register('question')} />

        {errors?.question?.message && (
          <div className="text-sm text-destructive space-y-0">
            {errors.question.message}
          </div>
        )}
      </div>

      {/* TYPE */}
      <Label>Type</Label>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Boolean">Boolean</SelectItem>
              <SelectItem value="Input">Input</SelectItem>
              <SelectItem value="Checkbox">Checkbox</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      {/* ANSWER */}
      {type === 'Boolean' && (
        <div className="space-y-2">
          <Label>Correct answer</Label>
          <Controller
            name="answer.0"
            control={control}
            render={({ field }) => (
              <div className="flex gap-4">
                {['true', 'false'].map((v) => (
                  <label key={v} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={field.value === v}
                      onChange={() => field.onChange(v)}
                    />
                    {v}
                  </label>
                ))}
              </div>
            )}
          />

          {errors?.answer?.[0]?.message && (
            <div className="text-sm text-destructive space-y-0">
              {errors.answer[0].message}
            </div>
          )}
        </div>
      )}

      {type === 'Input' && (
        <div className="space-y-2">
          <Label>Correct answer</Label>
          <Input placeholder="Correct answer" {...register('answer.0')} />

          {errors?.answer?.[0]?.message && (
            <div className="text-sm text-destructive space-y-0">
              {errors.answer[0].message}
            </div>
          )}
        </div>
      )}

      {type === 'Checkbox' && (
        <div className="space-y-3">
          <Label>Answer options</Label>

          {errors?.answer?.message && (
            <div className="text-sm text-destructive space-y-0">
              {errors.answer.message}
            </div>
          )}

          {optionFields.map((option, optIndex) => {
            const optionValue = watchedOptions?.[optIndex]?.value;
            return (
              <div key={option.id} className="flex items-start gap-3">
                <div className="flex-1">
                  <Input
                    {...register(`answerOptions.${optIndex}.value`)}
                    placeholder="Option"
                  />

                  {errors?.answerOptions?.[optIndex]?.value?.message && (
                    <div className="text-sm text-destructive space-y-0">
                      {errors.answerOptions[optIndex].value.message}
                    </div>
                  )}
                </div>

                <Controller
                  control={control}
                  name={`answer`}
                  render={({ field }) => (
                    <Checkbox
                      className="mt-3"
                      checked={field.value?.includes(optionValue)}
                      onCheckedChange={(checked) => {
                        if (!optionValue) return;

                        if (checked) {
                          field.onChange([...(field.value ?? []), optionValue]);
                        } else {
                          field.onChange(
                            field.value?.filter((v) => v !== optionValue),
                          );
                        }
                      }}
                    />
                  )}
                />

                <Button
                  type="button"
                  variant="ghost"
                  className="mt-1"
                  onClick={() => handleRemoveOption(optIndex)}
                >
                  ✕
                </Button>
              </div>
            );
          })}

          {errors?.answer?.[0]?.message && (
            <div className="text-sm text-destructive space-y-0">
              {errors.answer[0].message}
            </div>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={() => appendOption({ value: '' })}
          >
            Add option
          </Button>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={!isValid}>
          Add question
        </Button>
      </div>
    </form>
  );
}
