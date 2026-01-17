// components/default-loader.tsx
export function DefaultLoader() {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <span className="h-3 w-3 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
        <span className="h-3 w-3 rounded-full bg-primary animate-bounce" />
      </div>

      <p className="text-sm text-muted-foreground">Loading…</p>
    </div>
  );
}
