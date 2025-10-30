import api from './api';

export const scheduleService = {
  getMySchedule: async () => {
    const response = await api.get('/horarios/mi-horario');
    return response.data;
  },
};