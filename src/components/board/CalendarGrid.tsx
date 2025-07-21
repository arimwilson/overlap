import type { Availability, User } from '@/lib/types';
import TimeSlotCell from './TimeSlotCell';

type CalendarGridProps = {
  availability: Record<string, Availability>;
  users: User[];
  currentUserId: string;
  onToggle: (timeSlot: string, isAvailable: boolean) => void;
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SLOTS_PER_DAY = 48;

export default function CalendarGrid({
  availability,
  users,
  currentUserId,
  onToggle,
}: CalendarGridProps) {
  const timeLabels = Array.from({ length: SLOTS_PER_DAY }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    const ampm = hour < 12 ? 'AM' : 'PM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute} ${ampm}`;
  });

  // Get the current viewer's UTC offset in minutes
  const viewerOffsetMinutes = new Date().getTimezoneOffset();

  return (
    <div className="relative overflow-auto shadow-lg rounded-lg bg-card border">
        <div className="grid grid-cols-[auto_repeat(7,minmax(100px,1fr))]">
        {/* Header Corner */}
        <div className="sticky top-0 left-0 z-20 p-2 bg-muted border-b border-r"></div>
        {/* Day Headers */}
        {DAYS.map((day) => (
          <div
            key={day}
            className="sticky top-0 z-10 p-2 text-center font-semibold bg-muted border-b"
          >
            {day}
          </div>
        ))}

        {/* Time Labels and Grid Cells */}
        {timeLabels.map((time, timeIndex) => (
          <>
            {/* Time Label */}
            <div
              key={`time-${timeIndex}`}
              className="sticky left-0 z-10 p-2 text-right text-xs font-mono bg-muted border-r whitespace-nowrap"
            >
              {time}
            </div>

            {/* Cells for the row */}
            {DAYS.map((_, dayIndex) => {
              // Calculate UTC time slot based on viewer's local time
              const localMinutes = dayIndex * 1440 + timeIndex * 30;
              const utcMinutes = localMinutes + viewerOffsetMinutes;
              
              const utcDayIndex = Math.floor(utcMinutes / 1440 + 7) % 7;
              const utcTimeIndex = Math.floor((utcMinutes % 1440) / 30 + SLOTS_PER_DAY) % SLOTS_PER_DAY;
              
              const timeSlotId = `${utcDayIndex}-${utcTimeIndex}`;

              const availableUsers = users.filter(user => 
                availability[user.id]?.[timeSlotId]
              );
              
              const isCurrentUserAvailable = !!availability[currentUserId]?.[timeSlotId];

              return (
                <TimeSlotCell
                  key={`${dayIndex}-${timeIndex}`}
                  timeSlotId={timeSlotId}
                  availableUsers={availableUsers}
                  totalUsers={users.length}
                  isCurrentUserAvailable={isCurrentUserAvailable}
                  onToggle={onToggle}
                />
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}
