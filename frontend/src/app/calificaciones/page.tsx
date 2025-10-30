
'use client';

import { useEffect, useState } from 'react';
import { EstadoAcademico, MateriaCursada } from '@/types';
import { getEstadoAcademico } from '@/services/academic-status.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const MyGradesPage = () => {
    const [estadoAcademico, setEstadoAcademico] = useState<EstadoAcademico | null>(null);

    useEffect(() => {
        const fetchEstadoAcademico = async () => {
            try {
                const data = await getEstadoAcademico();
                setEstadoAcademico(data);
            } catch (error) {
                console.error('Error fetching academic status:', error);
            }
        };

        fetchEstadoAcademico();
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Mis Calificaciones</h1>

            {estadoAcademico ? (
                <Accordion type="single" collapsible className="w-full">
                    {estadoAcademico.materias.map(materia => (
                        <AccordionItem key={materia.materia.id} value={`materia-${materia.materia.id}`}>
                            <AccordionTrigger>
                                <div className="flex justify-between w-full pr-4">
                                    <span>{materia.materia.nombre}</span>
                                    <span className={`font-bold ${materia.condicion === 'promocionado' ? 'text-green-500' : materia.condicion === 'regular' ? 'text-yellow-500' : 'text-red-500'}`}>
                                        {materia.condicion}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Detalles</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>Nota Final: {materia.notaFinal || '-'}</p>
                                        <h4 className="font-bold mt-4">Evaluaciones</h4>
                                        <ul>
                                            {materia.evaluaciones.map(evaluacion => (
                                                <li key={evaluacion.id} className="flex justify-between">
                                                    <span>{evaluacion.nombre} ({evaluacion.tipo})</span>
                                                    <span>{evaluacion.calificacion?.nota || '-'}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                <p>Cargando calificaciones...</p>
            )}
        </div>
    );
};

export default MyGradesPage;
