import { getBoard } from '@/lib/db';
import { notFound } from 'next/navigation';
import { getUserCookie } from '@/lib/auth';
import BoardClient from '@/components/board/BoardClient';
import JoinBoard from '@/components/board/JoinBoard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type BoardPageProps = {
  params: { boardId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function BoardPage({ params, searchParams }: BoardPageProps) {
  const boardId = params.boardId.toUpperCase();
  const board = await getBoard(boardId);

  if (!board) {
    notFound();
  }

  const error = searchParams?.error;

  const userId = await getUserCookie(boardId);
  const currentUser = board.users.find((u) => u.id === userId);

  if (!currentUser) {
    return <JoinBoard boardId={board.id} boardUsers={board.users} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <Link href="/" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
        </Link>
      </div>
      {error && (
        <div className="container mx-auto pt-4">
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
      <BoardClient board={board} currentUserId={currentUser.id} />
    </div>
  );
}
