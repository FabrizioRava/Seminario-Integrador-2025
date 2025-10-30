
'use client';

import { useEffect, useState } from 'react';
import { Horario } from '@/types';
import { getMiHorario } from '@/services/horario.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MySchedulePage = () => {
    const [horarios, setHorarios] = useState<Horario[]>([]);
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const horas = Array.from({ length: 16 }, (_, i) => `${i + 8}:00`); 

    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const data = await getMiHorario();
                setHorarios(data);
            } catch (error) {
                console.error('Error fetching horarios:', error);
            }
        };

        fetchHorarios();
    }, []);

    const getHorarioParaCelda = (dia: string, hora: string) => {
        const horario = horarios.find(h => h.dia === dia && h.hora_inicio <= hora && h.hora_fin > hora);
        return horario;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Mi Horario</h1>

            <div className="grid grid-cols-7 gap-1 text-center bg-gray-100 p-2 rounded-lg">
                <div className="font-bold">Hora</div>
                {diasSemana.map(dia => (
                    <div key={dia} className="font-bold">{dia}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
                {horas.map(hora => (
                    <>
                        <div className="font-bold p-2 border-r">{hora}</div>
                        {diasSemana.map(dia => {
                            const horario = getHorarioParaCelda(dia, hora);
                            return (
                                <div key={`${dia}-${hora}`} className="border p-2 h-16">
                                    {horario && (
                                        <div className="bg-blue-200 rounded-lg p-1 text-sm">
                                            <p className="font-bold">{horario.materia.nombre}</p>
                                            <p>{horario.aula.numero}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </>
                ))}
            </div>
        </div>
    );
};

export default MySchedulePage;
