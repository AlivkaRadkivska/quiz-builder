'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Question = {
  id: number;
  question: string;
  type: string;
  answer: string[];
  answerOptions?: string[];
};

type Quiz = {
  id: number;
  title: string;
  questions: Question[];
};

export default function QuizDetailPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    // Mock fetch
    const timeout = setTimeout(() => {
      setQuiz({
        id: Number(id),
        title: 'Test Quiz Title',
        questions: [
          {
            id: 1,
            question: 'TypeScript is a superset of JavaScript?',
            type: 'Boolean',
            answer: ['true'],
          },
          {
            id: 2,
            question: 'What keyword defines a type?',
            type: 'Input',
            answer: ['type'],
          },
          {
            id: 3,
            question: 'Which types are primitive?',
            type: 'Input',
            answer: ['string', 'number', 'boolean'],
            answerOptions: [
              'string',
              'array',
              'number',
              'boolean',
              'record',
              'object',
              'function',
            ],
          },
        ],
      });
    }, 1500);

    return () => clearTimeout(timeout);
  }, [id]);

  if (!quiz)
    return <div className="max-w-3xl mx-auto p-4 space-y-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">{quiz.title}</h1>
      {quiz.questions.map((q) => (
        <div key={q.id} className="border p-4 rounded space-y-2">
          <div>
            <strong>Q:</strong> {q.question}
          </div>
          <div>
            <strong>Type:</strong> {q.type}
          </div>
          {q.answerOptions && (
            <div>
              <strong>Answer options:</strong>{' '}
              {q.answerOptions?.join(', ') || 'None'}
            </div>
          )}
          <div>
            <strong>Answer:</strong> {q.answer.join(', ')}
          </div>
        </div>
      ))}
    </div>
  );
}
