export enum UserRole {
  ADMIN = 'admin',
  ESTUDIANTE = 'estudiante',
  PROFESOR = 'profesor',
  SECRETARIA_ACADEMICA = 'secretaria_academica',
}

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  legajo: string;
  dni: string;
  rol: UserRole;
  createdAt: Date;
  inscripciones: Inscripcion[];
  materiasDictadas: Materia[];
  evaluacionesRecibidas: Evaluacion[];
  examenes: ExamenFinal[];
  examenesFinales: ExamenFinalNuevo[];
  horariosDictados: Horario[];
  asistencias: Asistencia[];
  clasesDictadas: Clase[];
  planEstudio?: PlanEstudio;
}

export interface Inscripcion {
  id: number;
  estudiante: User;
  comision: Comision;
  fechaInscripcion: Date;
}

export interface Materia {
  id: number;
  nombre: string;
  profesores: User[];
}

export interface Evaluacion {
  id: number;
  estudiante: User;
  tipo: string;
  calificacion: number;
  fecha: Date;
}

export interface ExamenFinal {
  id: number;
  estudiante: User;
  materia: Materia;
  nota: number;
  fecha: Date;
}

export interface ExamenFinalNuevo {
  id: number;
  docente: User;
}

export enum DiaSemana {
  LUNES = "LUNES",
  MARTES = "MARTES",
  MIERCOLES = "MIERCOLES",
  JUEVES = "JUEVES",
  VIERNES = "VIERNES",
  SABADO = "SABADO",
}

export interface Horario {
  id: number;
  docente: User;
  comision: Comision;
  diaSemana: DiaSemana;
  horaInicio: string;
  horaFin: string;
  aula: string;
}

export interface Asistencia {
  id: number;
  estudiante: User;
  clase: Clase;
  presente: boolean;
}

export interface Clase {
  id: number;
  docente: User;
}

export interface PlanEstudio {
  id: number;
  nombre: string;
  estudiantes: User[];
}

export interface Comision {
  id: number;
  nombre: string;
  materia: Materia;
  inscripciones: Inscripcion[];
}
