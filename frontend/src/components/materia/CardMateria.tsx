import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Materia } from '@/types';

interface CardMateriaProps {
  materia: Materia;
  onActionClick: (materia: Materia) => void;
  actionLabel: string;
  isActionDisabled?: boolean;
}

const CardMateria: React.FC<CardMateriaProps> = ({
  materia,
  onActionClick,
  actionLabel,
  isActionDisabled = false,
}) => {
  const getProfessors = () => {
    if (materia.profesores && materia.profesores.length > 0) {
      return materia.profesores
        .map((profesor) => `${profesor.nombre} ${profesor.apellido}`)
        .join(', ');
    }
    return 'No asignado';
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{materia.nombre}</CardTitle>
        <CardDescription>Profesores: {getProfessors()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          Información adicional sobre la materia.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => onActionClick(materia)} disabled={isActionDisabled}>
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardMateria;
