import { getOverlapColor } from '@/lib/utils';
import type { User } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type TimeSlotCellProps = {
  timeSlotId: string;
  availableUsers: User[];
  totalUsers: number;
  isCurrentUserAvailable: boolean;
  onToggle: (timeSlotId: string, isAvailable: boolean) => void;
};

export default function TimeSlotCell({
  timeSlotId,
  availableUsers,
  totalUsers,
  isCurrentUserAvailable,
  onToggle,
}: TimeSlotCellProps) {
  const overlapPercentage = totalUsers > 0 ? availableUsers.length / totalUsers : 0;
  const backgroundColor = getOverlapColor(overlapPercentage);

  const handleClick = () => {
    onToggle(timeSlotId, !isCurrentUserAvailable);
  };

  const tooltipContent = availableUsers.length > 0
    ? availableUsers.map(u => u.name).join(', ')
    : 'No one available';

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={handleClick}
            className="h-10 border border-border/60 border-b border-r flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out relative hover:ring-2 hover:ring-primary hover:z-10"
            style={{ backgroundColor }}
          >
            {isCurrentUserAvailable && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary/70 shadow-md ring-2 ring-white/50"></div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-semibold">{tooltipContent}</p>
          <p className="text-sm text-muted-foreground">{`${availableUsers.length} of ${totalUsers} available`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
