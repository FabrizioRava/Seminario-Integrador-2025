
'use client';

import { useEffect, useState } from 'react';
import { Comision, Materia, Carrera } from '@/types';
import { getComisiones, inscribir } from '@/services/enrollment.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EnrollmentPage = () => {
    const [comisiones, setComisiones] = useState<Comision[]>([]);
    const [filteredComisiones, setFilteredComisiones] = useState<Comision[]>([]);
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [carreras, setCarreras] = useState<Carrera[]>([]);
    const [selectedMateria, setSelectedMateria] = useState<string>('');
    const [selectedCarrera, setSelectedCarrera] = useState<string>('');

    useEffect(() => {
        const fetchComisiones = async () => {
            try {
                const data = await getComisiones();
                setComisiones(data);
                setFilteredComisiones(data);

                const uniqueMaterias = data.reduce((acc: Materia[], comision) => {
                    if (!acc.some(materia => materia.id === comision.materia.id)) {
                        acc.push(comision.materia);
                    }
                    return acc;
                }, []);
                setMaterias(uniqueMaterias);

                const uniqueCarreras = data.reduce((acc: Carrera[], comision) => {
                    if (!acc.some(carrera => carrera.id === comision.materia.carrera.id)) {
                        acc.push(comision.materia.carrera);
                    }
                    return acc;
                }, []);
                setCarreras(uniqueCarreras);
            } catch (error) {
                console.error('Error fetching comisiones:', error);
            }
        };

        fetchComisiones();
    }, []);

    useEffect(() => {
        let filtered = comisiones;
        if (selectedCarrera) {
            filtered = filtered.filter(comision => comision.materia.carrera.id === parseInt(selectedCarrera));
        }
        if (selectedMateria) {
            filtered = filtered.filter(comision => comision.materia.id === parseInt(selectedMateria));
        }
        setFilteredComisiones(filtered);
    }, [selectedCarrera, selectedMateria, comisiones]);

    const handleEnroll = async (comisionId: number) => {
        try {
            await inscribir(comisionId);
            // Maybe show a success message
        } catch (error) {
            console.error('Error enrolling:', error);
            // Maybe show an error message
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Inscripción a Materias</h1>

            <div className="flex space-x-4 mb-4">
                <Select onValueChange={setSelectedCarrera} value={selectedCarrera}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por carrera" />
                    </SelectTrigger>
                    <SelectContent>
                        {carreras.map(carrera => (
                            <SelectItem key={carrera.id} value={carrera.id.toString()}>{carrera.nombre}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={setSelectedMateria} value={selectedMateria}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por materia" />
                    </SelectTrigger>
                    <SelectContent>
                        {materias.map(materia => (
                            <SelectItem key={materia.id} value={materia.id.toString()}>{materia.nombre}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredComisiones.map(comision => (
                    <Card key={comision.id}>
                        <CardHeader>
                            <CardTitle>{comision.materia.nombre} - {comision.nombre}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Profesor: {comision.profesor.nombre} {comision.profesor.apellido}</p>
                            <p>Cupo: {comision.inscriptos}/{comision.cupo}</p>
                            <Button onClick={() => handleEnroll(comision.id)} disabled={comision.inscriptos >= comision.cupo}>Inscribirse</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default EnrollmentPage;
