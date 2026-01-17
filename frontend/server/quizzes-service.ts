import { QuizForm } from '@/lib/zod-schemas';
import { api } from './api';

export const createQuiz = async (data: QuizForm) => {
  const serializedData = {
    ...data,
    questions: data.questions.map((q) => ({
      ...q,
      answerOptions: q.answerOptions?.map((opt) => opt.value) || [],
    })),
  };

  const res = await api.post('/quizzes', serializedData);
  return res.data;
};

export const getQuizzes = async () => {
  const res = await api.get('/quizzes');
  return res.data;
};

export const getQuizById = async (id: string | number) => {
  const res = await api.get(`/quizzes/${id}`);
  return res.data;
};

export const deleteQuiz = async (id: number) => {
  await api.delete(`/quizzes/${id}`);
};
