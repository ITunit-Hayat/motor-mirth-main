import { AlertTriangle, Loader2 } from "lucide-react";

export function CarGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
          <div className="aspect-[16/10] bg-muted animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
            <div className="h-5 w-1/3 bg-muted rounded animate-pulse" />
          </div>
        </div>
      ))}
    </>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
      <AlertTriangle className="h-8 w-8 mx-auto text-destructive" />
      <div className="mt-3 font-semibold">Couldn't load data</div>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-4 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90">
          Try again
        </button>
      )}
    </div>
  );
}

export function Spinner({ className = "" }: { className?: string }) {
  return <Loader2 className={`h-4 w-4 animate-spin ${className}`} />;
}
