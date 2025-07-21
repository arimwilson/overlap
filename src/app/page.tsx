
'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { createBoard, joinBoard } from '@/app/actions';
import { Logo } from '@/components/icons/Logo';

export default function Home() {
  const [timezone, setTimezone] = useState('UTC');
  const formCreateRef = useRef<HTMLFormElement>(null);
  const formJoinRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center gap-2 text-center mb-8">
        <Logo className="w-20 h-20 text-primary" />
        <h1 className="text-5xl font-bold font-headline tracking-tighter">
          Overlap
        </h1>
        <p className="text-muted-foreground max-w-sm">
          Visualize your team's weekly availability and find the perfect time to connect, no matter the timezone.
        </p>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Create a New Board</CardTitle>
          <CardDescription>
            Start a new board and invite your team.
          </CardDescription>
        </CardHeader>
        <form action={createBoard} ref={formCreateRef}>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="create-name">Your Name</Label>
              <Input
                id="create-name"
                name="name"
                placeholder="Ada Lovelace"
                required
              />
              <input type="hidden" name="timezone" value={timezone} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Create Board
            </Button>
          </CardFooter>
        </form>

        <Separator className="my-4" />

        <CardHeader>
          <CardTitle className="font-headline">Join a Board</CardTitle>
          <CardDescription>
            Enter a code to join an existing board.
          </CardDescription>
        </CardHeader>
        <form action={joinBoard} ref={formJoinRef}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="join-code">Access Code</Label>
              <Input
                id="join-code"
                name="boardId"
                className="font-code"
                placeholder="A7QK3"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="join-name">Your Name</Label>
              <Input
                id="join-name"
                name="name"
                placeholder="Alan Turing"
                required
              />
               <input type="hidden" name="timezone" value={timezone} />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full" type="submit">
              Join Board
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
