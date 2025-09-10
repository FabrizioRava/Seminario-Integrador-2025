// src/materia/materia.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaService } from './materia.service';
import { MateriaController } from './materia.controller';
import { Materia } from './entities/materia.entity';
import { PlanEstudio } from '../plan-estudio/entities/plan-estudio.entity';
import { User } from '../user/entities/user.entity';
import { Inscripcion } from '../inscripcion/entities/inscripcion.entity';
import { Comision } from '../comision/entities/comision.entity';
import { Evaluacion } from '../evaluacion/entities/evaluacion.entity';
import { Horario } from '../horario/entities/horario.entity';
import { Clase } from '../clase/entities/clase.entity';
import { ExamenFinal } from '../examen/entities/examen.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Materia,
      PlanEstudio,
      User,
      Inscripcion,
      Comision,
      Evaluacion,
      Horario,
      Clase,
      ExamenFinal
    ]),
  ],
  providers: [MateriaService],
  controllers: [MateriaController],
  exports: [MateriaService], // ✅ Exportar para que otros módulos puedan usarlo
})
export class MateriaModule {}