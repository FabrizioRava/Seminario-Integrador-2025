
import api from './api';
import { Comision } from '@/types';

export const getComisiones = async (): Promise<Comision[]> => {
    const response = await api.get<Comision[]>('/comisiones');
    return response.data;
};

export const inscribir = async (comisionId: number): Promise<void> => {
    await api.post('/inscripciones', { comisionId });
};
