export interface QuizQuestion {
  id: number;
  question: string;
  type: 'Boolean' | 'Input' | 'Checkbox';
  answerOptions?: string[];
  answer: string[];
}

export interface Quiz {
  id: number;
  title: string;
  questions?: QuizQuestion[];
  questionCount?: number;
}
