'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-center gap-6">
        <Link
          href="/quizzes"
          className={cn(
            'text-sm font-medium transition-colors',
            pathname === '/quizzes'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-primary',
          )}
        >
          All Quizzes
        </Link>

        <Link
          href="/create"
          className={cn(
            'text-sm font-medium transition-colors',
            pathname === '/create'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-primary',
          )}
        >
          Create Quiz
        </Link>
      </div>
    </header>
  );
}
