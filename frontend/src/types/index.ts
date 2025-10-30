export interface Horario {
    id: number;
    dia: string;
    hora_inicio: string;
    hora_fin: string;
    materia: {
        id: number;
        nombre: string;
    };
    aula: {
        id: number;
        numero: string;
    };
}

export interface Notificacion {
    id: number;
    mensaje: string;
    fecha: string;
}

export interface User {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    legajo: string;
    rol: 'alumno' | 'profesor' | 'admin';
}

export interface Carrera {
    id: number;
    nombre: string;
}

export interface Materia {
    id: number;
    nombre: string;
    carrera: Carrera;
}

export interface Comision {
    id: number;
    nombre: string;
    materia: Materia;
    profesor: User;
    horarios: Horario[];
    cupo: number;
    inscriptos: number;
}

export interface Calificacion {
    id: number;
    nota: number;
    fecha: string;
}

export interface Evaluacion {
    id: number;
    nombre: string;
    tipo: 'parcial' | 'final';
    calificacion: Calificacion | null;
}

export interface MateriaCursada {
    materia: Materia;
    evaluaciones: Evaluacion[];
    notaFinal: number | null;
    condicion: 'regular' | 'promocionado' | 'libre';
}

export interface EstadoAcademico {
    materias: MateriaCursada[];
}