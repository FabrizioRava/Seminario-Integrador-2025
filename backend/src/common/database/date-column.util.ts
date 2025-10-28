import { ColumnType } from 'typeorm';

export const getDateColumnType = (): ColumnType => {
  const dbType = (process.env.DB_TYPE || '').toLowerCase();
  if (dbType.includes('sqlite')) {
    return 'datetime';
  }
  return 'timestamp';
};
