export default function QuizLoader() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6 animate-pulse">
      <div className="h-8 w-1/2 bg-muted rounded" />

      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded p-4 space-y-3">
          <div className="h-4 w-3/4 bg-muted rounded" />
          <div className="h-4 w-1/3 bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}
