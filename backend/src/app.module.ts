// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getDatabaseConfig } from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MateriaModule } from './materia/materia.module';
import { ExamenFinalModule } from './examen-final/examen-final.module';
import { ExamenModule } from './examen/examen.module';
import { CarreraModule } from './carrera/carrera.module';
import { PlanEstudioModule } from './plan-estudio/plan-estudio.module';
import { CursadaModule } from './cursada/cursada.module';
import { HorarioModule } from './horario/horario.module';
import { ClaseModule } from './clase/clase.module';
import { ComisionModule } from './comision/comision.module';
import { InscripcionExamenModule } from './inscripcion-examen/inscripcion-examen.module';
import { InscripcionModule } from './inscripcion/inscripcion.module';
import { EstadisticasModule } from './estadisticas/estadisticas.module';
import { AsistenciaModule } from './asistencia/asistencia.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    UserModule,
    AuthModule,
    MateriaModule,
    InscripcionModule,
    CursadaModule,
    ExamenFinalModule,
    ExamenModule,
    CarreraModule,
    PlanEstudioModule,
    HorarioModule,
    EstadisticasModule,
    AsistenciaModule,
    ClaseModule,
    ComisionModule,
    InscripcionExamenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
