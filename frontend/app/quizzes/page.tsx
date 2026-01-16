'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Quiz = {
  id: number;
  title: string;
  questions: { id: number }[];
};

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    // Mock fetch

    const timeout = setTimeout(() => {
      setQuizzes([
        { id: 1, title: 'Test Quiz', questions: [{ id: 1 }, { id: 2 }] },
        { id: 2, title: 'Another Quiz', questions: [{ id: 3 }] },
      ]);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const handleDelete = (id: number) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
    // DELETE /quizzes/:id here
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">All Quizzes</h1>
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="flex justify-between items-center border p-4 rounded"
        >
          <Link
            href={`/quizzes/${quiz.id}`}
            className="hover:underline transition-all"
          >
            {quiz.title} ({quiz.questions.length} questions)
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(quiz.id)}
          >
            Delete
          </Button>
        </div>
      ))}

      {quizzes.length === 0 && (
        <div className="flex justify-between items-center border p-4 rounded">
          No quizzes found...
          <Link href="/create" className="font-semibold">
            <Button>Create a New One</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
