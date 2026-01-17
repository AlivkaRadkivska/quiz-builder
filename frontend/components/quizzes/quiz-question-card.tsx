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
import { QuizForm } from '@/lib/zod-schemas';
import { useEffect } from 'react';
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
  useWatch,
} from 'react-hook-form';

interface QuizQuestionCardProps {
  questionErrors?: FieldErrorsImpl<QuizForm['questions'][number]>;
  register: UseFormRegister<QuizForm>;
  control: Control<QuizForm>;
  remove: UseFieldArrayRemove;
  index: number;
  setValue: UseFormSetValue<QuizForm>;
}

export function QuizQuestionCard({
  questionErrors,
  index,
  register,
  control,
  remove,
  setValue,
}: QuizQuestionCardProps) {
  const type = useWatch<QuizForm, `questions.${number}.type`>({
    control,
    name: `questions.${index}.type`,
  });

  const watchedOptions = useWatch({
    control,
    name: `questions.${index}.answerOptions`,
  });

  const watchedAnswer = useWatch({
    control,
    name: `questions.${index}.answer`,
  });

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray<QuizForm, `questions.${number}.answerOptions`>({
    control,
    name: `questions.${index}.answerOptions`,
  });

  useEffect(() => {
    setValue(`questions.${index}.answerOptions`, []);

    switch (type) {
      case 'Checkbox':
      case 'Boolean':
        setValue(`questions.${index}.answer`, []);
        break;
      case 'Input':
        setValue(`questions.${index}.answer.0`, '');
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleRemoveOption = (optIndex: number) => {
    const optionValue = watchedOptions?.[optIndex]?.value;

    removeOption(optIndex);

    // Also remove from answers if it was selected
    if (optionValue) {
      const filteredAnswers = watchedAnswer?.filter(
        (ans) => ans !== optionValue,
      );

      setValue(`questions.${index}.answer`, filteredAnswers ?? []);
    }
  };

  console.log('errors', questionErrors);

  return (
    <div className="border p-6 rounded space-y-4 relative">
      <Button
        type="button"
        variant="destructive"
        size="icon-sm"
        onClick={() => remove(index)}
        className="absolute top-1 right-1"
      >
        ✕
      </Button>

      <div>
        <Label>Question {index + 1}</Label>

        <Input
          {...register(`questions.${index}.question`)}
          placeholder="Enter question"
        />

        {questionErrors?.question?.message && (
          <div className="text-sm text-destructive space-y-0">
            {questionErrors.question.message}
          </div>
        )}
      </div>

      {/* QUESTION TYPE */}
      <Label>Type</Label>
      <Controller
        name={`questions.${index}.type`}
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Boolean">Boolean</SelectItem>
              <SelectItem value="Input">Input</SelectItem>
              <SelectItem value="Checkbox">Checkbox</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      {/* ANSWERS */}
      {type === 'Boolean' && (
        <div className="space-y-2">
          <Label>Correct answer</Label>
          <Controller
            name={`questions.${index}.answer.0`}
            control={control}
            render={({ field }) => (
              <div className="flex gap-4">
                {['true', 'false'].map((value) => (
                  <label key={value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={value}
                      checked={field.value === value}
                      onChange={() => field.onChange(value)}
                    />
                    {value}
                  </label>
                ))}
              </div>
            )}
          />

          {questionErrors?.answer?.[0]?.message && (
            <div className="text-sm text-destructive space-y-0">
              {questionErrors.answer[0].message}
            </div>
          )}
        </div>
      )}

      {type === 'Input' && (
        <div className="space-y-2">
          <Label>Correct answer</Label>
          <Input
            {...register(`questions.${index}.answer.0`)}
            placeholder="Correct answer"
          />

          {questionErrors?.answer?.[0]?.message && (
            <div className="text-sm text-destructive space-y-0">
              {questionErrors.answer[0].message}
            </div>
          )}
        </div>
      )}

      {type === 'Checkbox' && (
        <div className="space-y-3">
          <Label>Answer options</Label>

          {questionErrors?.answer?.message && (
            <div className="text-sm text-destructive space-y-0">
              {questionErrors.answer.message}
            </div>
          )}

          {optionFields.map((option, optIndex) => {
            const optionValue = watchedOptions?.[optIndex]?.value;
            return (
              <div key={option.id} className="flex items-start gap-3">
                <div className="flex-1">
                  <Input
                    {...register(
                      `questions.${index}.answerOptions.${optIndex}.value`,
                    )}
                    placeholder="Option"
                  />

                  {questionErrors?.answerOptions?.[optIndex]?.value
                    ?.message && (
                    <div className="text-sm text-destructive space-y-0">
                      {questionErrors.answerOptions[optIndex].value.message}
                    </div>
                  )}
                </div>

                <Controller
                  control={control}
                  name={`questions.${index}.answer`}
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

          {questionErrors?.answer?.[0]?.message && (
            <div className="text-sm text-destructive space-y-0">
              {questionErrors.answer[0].message}
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
    </div>
  );
}
