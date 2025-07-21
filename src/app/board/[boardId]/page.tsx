import { getBoard } from '@/lib/db';
import { notFound } from 'next/navigation';
import { getUserCookie } from '@/lib/auth';
import BoardClient from '@/components/board/BoardClient';
import JoinBoard from '@/components/board/JoinBoard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

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
