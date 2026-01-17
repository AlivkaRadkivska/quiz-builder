import { z } from 'zod';

export const QuestionSchema = z.object({
  question: z.string().min(2, 'Question is required'),
  type: z.enum(
    ['Boolean', 'Input', 'Checkbox'],
    'Select a valid question type',
  ),
  answer: z
    .array(z.string().min(1, 'Answer is required'))
    .min(1, 'At least one answer is required'),
  answerOptions: z.array(
    z.object({
      value: z.string().min(1, 'Answer option cannot be empty'),
    }),
  ),
});

export const QuizSchema = z.object({
  title: z.string().min(2, 'Quiz title is required'),
  questions: z
    .array(QuestionSchema)
    .min(1, 'At least one question is required'),
});

export type QuizForm = z.infer<typeof QuizSchema>;
export type QuizQuestionForm = z.infer<typeof QuestionSchema>;
