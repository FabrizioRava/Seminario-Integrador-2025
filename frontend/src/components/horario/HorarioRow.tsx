import React from 'react';
import { Horario } from '@/types';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface HorarioRowProps {
  horario: Horario;
}

const HorarioRow: React.FC<HorarioRowProps> = ({ horario }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{horario.comision.materia.nombre}</TableCell>
      <TableCell>{horario.comision.nombre}</TableCell>
      <TableCell>{horario.aula}</TableCell>
      <TableCell>{horario.diaSemana}</TableCell>
      <TableCell>{`${horario.horaInicio} - ${horario.horaFin}`}</TableCell>
      <TableCell>
        <Badge variant="outline">{`${horario.docente.nombre} ${horario.docente.apellido}`}</Badge>
      </TableCell>
    </TableRow>
  );
};

export default HorarioRow;
