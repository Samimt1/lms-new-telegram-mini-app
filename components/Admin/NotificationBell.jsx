'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotificationBell() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  const fetchCount = async () => {
    const res = await fetch('/api/notifications');
    const data = await res.json();
    setCount(data.filter(n => !n.read).length);
  };

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    window.addEventListener('notifications-updated', fetchCount);
    return () => {
      clearInterval(interval);
      window.removeEventListener('notifications-updated', fetchCount);
    };
  }, []);

  return (
    <Button className="relative flex items-center justify-center p-2 rounded-full transition">
      <Bell className="w-6 h-6 text-gray-700" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </Button>
  );
}