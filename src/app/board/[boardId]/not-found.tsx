import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Terminal } from 'lucide-react';

export default function BoardNotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
      <Alert variant="destructive" className="max-w-md">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Board not found</AlertTitle>
        <AlertDescription>
          We couldn&apos;t find a board with that code. Please check the URL or start a new board.
        </AlertDescription>
      </Alert>
      <Button asChild className="mt-4">
        <Link href="/">Go to Home</Link>
      </Button>
    </main>
  );
}
