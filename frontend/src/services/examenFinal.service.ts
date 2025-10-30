
import api from './api';
import { AxiosRequestConfig } from 'axios';

export interface HorarioExamen {
  horaInicio: string;
  horaFin: string;
  aula: string;
}

export interface ExamenFinalResponse {
  id: number;
  fecha: string;
  horaInicioTeorico: string;
  horaFinTeorico: string;
  aulaTeorico: string;
  horaInicioPractico?: string;
  horaFinPractico?: string;
  aulaPractico?: string;
  materia: {
    id: number;
    nombre: string;
  };
  docente: {
    id: number;
    nombre: string;
    apellido: string;
  };
  cupo: number;
  inscriptos: number;
  disponibles: number;
  createdAt: string;
  updatedAt: string;
}

export type ExamenFinal = ExamenFinalResponse & {
  teorico: HorarioExamen;
  practico?: HorarioExamen;
};

export interface InscripcionExamenFinalResponse {
  id: number;
  estudianteId?: number;
  examenFinal: ExamenFinalResponse;
  fechaInscripcion: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada' | 'ausente' | 'libre';
  nota?: number;
  observaciones?: string;
  fechaActualizacion?: string;
}

export type InscripcionExamenFinal = InscripcionExamenFinalResponse & {
  examenFinal: ExamenFinal;
};

export interface CreateExamenFinalPayload {
  materiaId: number;
  docenteId: number;
  fecha: string;
  horaInicioTeorico: string;
  horaFinTeorico: string;
  aulaTeorico: string;
  horaInicioPractico?: string;
  horaFinPractico?: string;
  aulaPractico?: string;
  cupo?: number;
}

export type UpdateExamenFinalPayload = Partial<CreateExamenFinalPayload>;

const mapExamen = (examen: ExamenFinalResponse): ExamenFinal => ({
  ...examen,
  teorico: {
    horaInicio: examen.horaInicioTeorico,
    horaFin: examen.horaFinTeorico,
    aula: examen.aulaTeorico,
  },
  practico:
    examen.horaInicioPractico && examen.horaFinPractico && examen.aulaPractico
      ? {
          horaInicio: examen.horaInicioPractico,
          horaFin: examen.horaFinPractico,
          aula: examen.aulaPractico,
        }
      : undefined,
});

const mapInscripcion = (
  inscripcion: InscripcionExamenFinalResponse,
): InscripcionExamenFinal => ({
  ...inscripcion,
  examenFinal: mapExamen(inscripcion.examenFinal),
});

export const ExamenFinalService = {
  async getExamenesDisponibles(): Promise<ExamenFinal[]> {
    const response = await api.get<ExamenFinalResponse[]>('/examenes-finales');
    return response.data.map(mapExamen);
  },

  async getExamenById(id: number): Promise<ExamenFinal> {
    const response = await api.get<ExamenFinalResponse>(`/examenes-finales/${id}`);
    return mapExamen(response.data);
  },

  async crearExamenFinal(payload: CreateExamenFinalPayload): Promise<ExamenFinal> {
    const response = await api.post<ExamenFinalResponse>('/examenes-finales', payload);
    return mapExamen(response.data);
  },

  async actualizarExamenFinal(
    id: number,
    payload: UpdateExamenFinalPayload,
  ): Promise<ExamenFinal> {
    const response = await api.patch<ExamenFinalResponse>(
      `/examenes-finales/${id}`,
      payload,
    );
    return mapExamen(response.data);
  },

  async eliminarExamenFinal(id: number): Promise<void> {
    await api.delete(`/examenes-finales/${id}`);
  },

  async inscribirAExamen(
    examenFinalId: number,
  ): Promise<InscripcionExamenFinal> {
    const response = await api.post<InscripcionExamenFinalResponse>(
      '/inscripcion-examen',
      { examenId: examenFinalId },
    );
    return mapInscripcion(response.data);
  },

  async getInscripcionesEstudiante(estudianteId: number): Promise<InscripcionExamenFinal[]> {
    const response = await api.get<InscripcionExamenFinalResponse[]>(
      `/inscripcion-examen/estudiante/${estudianteId}`,
    );
    return response.data.map(mapInscripcion);
  },

  async cancelarInscripcion(inscripcionId: number): Promise<void> {
    await api.delete(`/inscripcion-examen/mine/${inscripcionId}`);
  }
};
