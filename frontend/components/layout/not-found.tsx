'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface NotFoundProps {
  title?: string;
  description?: string;
  withCreateNewQuizButton?: boolean;
  withBackToQuizzesButton?: boolean;
}

export default function NotFound({
  title = 'Not Found',
  description = 'The info you are looking for does not exist or may have been removed.',
  withCreateNewQuizButton = true,
  withBackToQuizzesButton = true,
}: NotFoundProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 px-4">
      <h1 className="text-3xl font-bold">{title}</h1>

      <p className="text-muted-foreground max-w-md">{description}</p>

      <div className="flex gap-3">
        {withBackToQuizzesButton && (
          <Button asChild>
            <Link href="/quizzes">Back to quizzes</Link>
          </Button>
        )}

        {withCreateNewQuizButton && (
          <Button variant="outline" asChild>
            <Link href="/create">Create new quiz</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
