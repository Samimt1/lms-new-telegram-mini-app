import { cn } from '@/lib/utils';

export function NotificationCard({ title, message, type, priority, read, createdAt }) {
  return (
    <div className={cn(
      'p-4 rounded-lg border shadow-sm space-y-1',
      read ? 'bg-white' : 'bg-gray-50',
      priority === 'HIGH' && 'border-red-500',
      priority === 'MEDIUM' && 'border-yellow-400',
      priority === 'LOW' && 'border-gray-300'
    )}>
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-muted-foreground">{message}</div>
      <div className="text-xs text-gray-400">{new Date(createdAt).toLocaleString()}</div>
    </div>
  );
}