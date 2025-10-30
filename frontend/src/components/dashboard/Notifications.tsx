'use client';

import { useEffect, useState } from 'react';
import { Notificacion } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notificacion[]>([]);

  useEffect(() => {
    // TODO: Fetch notifications from the API
    const mockNotifications: Notificacion[] = [
      { id: 1, mensaje: 'Recordatorio: Examen de Matemáticas mañana a las 10:00 AM.', fecha: '2024-05-20' },
      { id: 2, mensaje: 'La clase de Historia ha sido cancelada.', fecha: '2024-05-19' },
    ];
    setNotifications(mockNotifications);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificaciones</CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map(item => (
              <li key={item.id}>
                <p>{item.mensaje}</p>
                <p className="text-xs text-gray-500">{new Date(item.fecha).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay notificaciones nuevas.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Notifications;
