'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { joinBoardFromPage } from '@/app/actions';
import type { User } from '@/lib/types';
import { Avatar, AvatarFallback } from '../ui/avatar';

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

export default function JoinBoard({ boardId, boardUsers }: { boardId: string, boardUsers: User[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [timezone, setTimezone] = useState('UTC');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsOpen(true);
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const formAction = async (formData: FormData) => {
    formData.append('timezone', timezone);
    const result = await joinBoardFromPage(boardId, formData);
    if (result.error) {
      setError(result.error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className='font-headline'>Join Board "{boardId}"</DialogTitle>
          <DialogDescription>
            You're invited! Enter your name to join this board and start sharing your availability.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
            {boardUsers.map(user => (
                 <Avatar key={user.id}>
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
            ))}
            {boardUsers.length < 10 && <Avatar><AvatarFallback>+</AvatarFallback></Avatar>}
        </div>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Grace Hopper"
                className="col-span-3"
                required
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Your timezone is detected as {timezone}.
            </p>
            {error && <p className="text-sm font-medium text-destructive text-center">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">Join and View Board</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
