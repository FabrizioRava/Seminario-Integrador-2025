
import api from './api';
import { EstadoAcademico } from '@/types';

export const getEstadoAcademico = async (): Promise<EstadoAcademico> => {
    const response = await api.get<EstadoAcademico>('/estado-academico');
    return response.data;
};
