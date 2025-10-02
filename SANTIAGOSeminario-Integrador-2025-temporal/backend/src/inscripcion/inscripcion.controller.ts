// src/inscripcion/inscripcion.controller.ts
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/entities/user.entity';
import { InscripcionService } from './inscripcion.service';

@Controller('inscripcion')
export class InscripcionController {
  constructor(private inscripcionService: InscripcionService) {}

  // 🔒 Estudiante: ver historial académico
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ESTUDIANTE)
  @Get('historial')
  async historialAcademico(@Request() req) {
    return this.inscripcionService.historialAcademico(req.user.userId);
  }

  // 🔒 Estudiante: ver materias que cursa
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ESTUDIANTE)
  @Get('cursando')
  async materiasDelEstudiante(@Request() req) {
    return this.inscripcionService.materiasDelEstudiante(req.user.userId);
  }

  // 🔒 Estudiante: inscribirse a materia
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ESTUDIANTE)
  @Post('materia/:materiaId')
  async inscribirse(
    @Request() req,
    @Param('materiaId') materiaId: string,
    @Body('comisionId') comisionId?: number,
  ) {
    return this.inscripcionService.inscribirse(
      req.user.userId,
      +materiaId,
      typeof comisionId === 'number' ? comisionId : undefined,
    );
  }

  // 🔒 Profesor: cargar faltas
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROFESOR)
  @Post(':id/faltas')
  async cargarFaltas(@Param('id') id: string, @Body('faltas') faltas: number) {
    return this.inscripcionService.cargarFaltas(+id, faltas);
  }

  // 🔒 Profesor: cargar nota final y STC
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROFESOR)
  @Post(':id/nota')
  async cargarNota(
    @Param('id') id: string,
    @Body('notaFinal') notaFinal: number,
    @Body('stc') stc: string,
  ) {
    return this.inscripcionService.cargarNota(+id, notaFinal, stc);
  }

  // 🔒 Estudiante: ver detalle de una inscripción
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ESTUDIANTE)
  @Get(':id')
  async detalleMateria(@Param('id') id: string, @Request() req) {
    return this.inscripcionService.detalleMateria(+id, req.user.userId);
  }

  // 🔒 Estudiante: cancelar una inscripción propia
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ESTUDIANTE)
  @Delete(':id')
  async cancelarInscripcion(@Param('id') id: string, @Request() req) {
    await this.inscripcionService.cancelarInscripcion(+id, req.user.userId);
    return { message: 'Inscripción cancelada correctamente' };
  }
}
