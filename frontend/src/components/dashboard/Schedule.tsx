'use client';

import { useEffect, useState } from 'react';
import { Horario } from '@/types';
import { scheduleService } from '@/services/scheduleService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Schedule = () => {
  const [schedule, setSchedule] = useState<Horario[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await scheduleService.getMySchedule();
        const today = new Date().toLocaleDateString('es-ES', { weekday: 'long' }).toUpperCase();
        const todaySchedule = data.filter((item: Horario) => item.dia.toUpperCase() === today);
        setSchedule(todaySchedule);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horario de Hoy</CardTitle>
      </CardHeader>
      <CardContent>
        {schedule.length > 0 ? (
          <ul>
            {schedule.map(item => (
              <li key={item.id}>
                <strong>{item.materia.nombre}</strong>: {item.hora_inicio} - {item.hora_fin} (Aula: {item.aula.numero})
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay clases hoy.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Schedule;
