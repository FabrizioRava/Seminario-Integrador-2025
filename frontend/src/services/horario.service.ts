
import api from './api';
import { Horario } from '@/types';

export const getMiHorario = async (): Promise<Horario[]> => {
    const response = await api.get<Horario[]>('/horarios/mi-horario');
    return response.data;
};
