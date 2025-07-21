import type { Board } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Logo } from '../icons/Logo';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Props = {
  board: Board;
  currentUserId: string;
  onTimezoneChange: (tz: string) => void;
};
export default function UserRoster({ board, currentUserId, onTimezoneChange }: Props) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(board.id);
    // You could add a toast notification here for feedback
  };

  const timezones = typeof Intl.supportedValuesOf === 'function'
    ? Intl.supportedValuesOf('timeZone')
    : ['UTC'];

  return (
    <aside className="lg:w-80 lg:h-screen lg:border-r border-b lg:border-b-0">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
            <div className="flex items-center gap-3">
                <Logo className="w-12 h-12"/>
                <div>
                    <h2 className="text-xl font-bold font-headline">Overlap</h2>
                    <p className="text-sm text-muted-foreground">Board Access Code</p>
                </div>
            </div>

            <Card
                className="text-center bg-primary/10 border-primary/20 border-dashed cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={copyToClipboard}
                title="Click to copy"
            >
                <CardContent className="p-4">
                <p className="font-code text-3xl font-bold tracking-widest text-primary">
                    {board.id}
                </p>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-5 h-5" />
                    <h3 className="font-semibold text-lg">Team ({board.users.length}/10)</h3>
                </div>
                <div className="space-y-3">
                {board.users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-card shadow-sm border">
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {user.id === currentUserId ? (
                              <Select value={user.timezone} onValueChange={onTimezoneChange}>
                                <SelectTrigger className="w-[160px] h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="max-h-64">
                                  {timezones.map((tz) => (
                                    <SelectItem key={tz} value={tz}>
                                      {tz}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <span>{user.timezone}</span>
                            )}
                        </p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
