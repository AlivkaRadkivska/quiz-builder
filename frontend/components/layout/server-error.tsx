'use client';

interface ServerErrorProps {
  title?: string;
  description?: string;
}

export function ServerError({
  title = 'Something went wrong :(',
  description = 'A server error occurred. Please try again later.',
}: ServerErrorProps) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center text-center gap-4 px-4">
      <h2 className="text-2xl font-semibold">{title}</h2>

      <p className="text-muted-foreground max-w-md">{description}</p>
    </div>
  );
}
