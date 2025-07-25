import type { Availability, User } from '@/lib/types';
import TimeSlotCell from './TimeSlotCell';
import React from 'react';

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
  const boardTimezone = users[0]?.timezone || 'UTC';

  const getOffset = (tz: string) => {
    const now = new Date();
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: tz }));
    return (tzDate.getTime() - now.getTime()) / 60000;
  };

  const uniqueTimezones = Array.from(new Set(users.map((u) => u.timezone)));
  const timezones = [
    boardTimezone,
    ...uniqueTimezones.filter((tz) => tz !== boardTimezone),
  ];

  const timezoneAbbr = (tz: string) => {
    return (
      new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        timeZoneName: 'short',
      })
        .formatToParts(new Date())
        .find((p) => p.type === 'timeZoneName')?.value || tz
    );
  };

  const offsets = timezones.map(getOffset);
  const boardOffset = offsets[0];

  const timeLabelsByTz = timezones.map((tz, idx) => {
    const offset = offsets[idx];
    return Array.from({ length: SLOTS_PER_DAY }, (_, i) => {
      const boardMinutes = i * 30;
      const utcMinutes = boardMinutes - boardOffset;
      const tzMinutes = (utcMinutes + offset + 1440) % 1440;
      const hour = Math.floor(tzMinutes / 60);
      const minute = tzMinutes % 60 === 0 ? '00' : '30';
      const ampm = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return `${displayHour}:${minute} ${ampm}`;
    });
  });

  const TIME_COL_WIDTH = 80; // width in px for sticky time columns
  const columnStyle = {
    gridTemplateColumns: `${timezones
      .map(() => `${TIME_COL_WIDTH}px`)
      .join(' ')} repeat(7,minmax(100px,1fr))`,
  } as React.CSSProperties;

  return (
    <div className="relative overflow-auto shadow-lg rounded-lg bg-card border">
        <div className="grid" style={columnStyle}>
        {/* Header for Timezone Abbreviations */}
        {timezones.map((tz, idx) => (
          <div
            key={tz}
            className="sticky top-0 z-20 p-2 text-center font-semibold bg-muted border-b border-r"
            style={{ left: idx * TIME_COL_WIDTH }}
          >
            {timezoneAbbr(tz)}
          </div>
        ))}
        {/* Day Headers */}
        {DAYS.map((day) => (
          <div
            key={day}
            className="sticky top-0 z-10 p-2 text-center font-semibold bg-muted border-b border-r"
          >
            {day}
          </div>
        ))}

        {/* Time Labels and Grid Cells */}
        {timeLabelsByTz[0].map((_, timeIndex) => (
          <React.Fragment key={`time-row-${timeIndex}`}>
            {/* Time Labels for each timezone */}
            {timezones.map((_, tzIdx) => (
              <div
                key={`${tzIdx}-${timeIndex}`}
                className="p-2 text-right text-xs font-mono bg-muted border-r whitespace-nowrap sticky z-10"
                style={{ left: tzIdx * TIME_COL_WIDTH }}
              >
                {timeLabelsByTz[tzIdx][timeIndex]}
              </div>
            ))}

            {/* Cells for the row */}
            {DAYS.map((_, dayIndex) => {
              // Calculate UTC time slot based on board timezone
              const boardLocalMinutes = dayIndex * 1440 + timeIndex * 30;
              const utcMinutes = boardLocalMinutes - boardOffset;
              
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
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
