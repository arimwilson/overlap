'use client';

import type { Board } from '@/lib/types';
import { useState, useTransition, useEffect } from 'react';
import UserRoster from './UserRoster';
import CalendarGrid from './CalendarGrid';
import { toggleAvailability as toggleAvailabilityAction, updateTimezone as updateTimezoneAction } from '@/app/actions';

export default function BoardClient({ board, currentUserId }: { board: Board; currentUserId: string }) {
  const [boardState, setBoardState] = useState(board);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setBoardState(board);
  }, [board]);

  const handleToggleAvailability = (timeSlot: string, isAvailable: boolean) => {
    // Optimistic update
    const newAvailability = { ...boardState.availability };
    if (!newAvailability[currentUserId]) {
        newAvailability[currentUserId] = {};
    }
    if (isAvailable) {
        newAvailability[currentUserId][timeSlot] = true;
    } else {
        delete newAvailability[currentUserId][timeSlot];
    }

    setBoardState({
      ...boardState,
      availability: newAvailability,
    });

    startTransition(async () => {
        await toggleAvailabilityAction(board.id, currentUserId, timeSlot, isAvailable);
        // In a real app with websockets/listeners, this re-fetch would be replaced
        // by the listener updating the state. For this example, we rely on the
        // page revalidating.
    });
  };

  const handleTimezoneChange = (tz: string) => {
    const newUsers = boardState.users.map((u) =>
      u.id === currentUserId ? { ...u, timezone: tz } : u
    );
    setBoardState({ ...boardState, users: newUsers });

    startTransition(async () => {
      await updateTimezoneAction(board.id, currentUserId, tz);
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <UserRoster board={boardState} currentUserId={currentUserId} onTimezoneChange={handleTimezoneChange} />
      <main className="flex-1 p-2 sm:p-4 md:p-6">
        <CalendarGrid
          availability={boardState.availability}
          users={boardState.users}
          currentUserId={currentUserId}
          onToggle={handleToggleAvailability}
        />
      </main>
    </div>
  );
}
