import { SingleQuiz } from '@/components/quizzes/single-quiz';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function QuizDetailPage({ params }: PageProps) {
  const id = decodeURIComponent((await params).id);

  if (Number.isNaN(id)) notFound();

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <SingleQuiz id={+id} />
    </div>
  );
}
