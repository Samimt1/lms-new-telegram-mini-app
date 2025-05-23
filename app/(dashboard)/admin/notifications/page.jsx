'use client';

import { useEffect, useState } from 'react';
import { NotificationCard } from '@/components/ui/NotificationCard';
import { Button } from '@/components/ui/button';

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);

  const fetchData = async () => {
    const res = await fetch('/api/notifications');
    const data = await res.json();
    setNotifications(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const markAllAsRead = async () => {
    await Promise.all(
      notifications.map(n =>
        fetch(`/api/notifications/${n.id}/read`, { method: 'PATCH' })
      )
    );
    fetchData();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button  onClick={markAllAsRead}>Mark all as read</Button>
      </div>
      {notifications.map(n => (
        <NotificationCard key={n.id} {...n} />
      ))}
    </div>
  );
}
