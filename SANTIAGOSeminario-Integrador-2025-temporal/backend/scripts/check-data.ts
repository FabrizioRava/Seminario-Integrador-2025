import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  try {
    const inscripciones = await dataSource.query('SELECT id, "estudianteId", "materiaId", "comisionId" FROM "inscripcion" LIMIT 5');
    console.log('Inscripciones:', inscripciones);
    const horarios = await dataSource.query('SELECT id, dia, "materiaId", "comisionId" FROM "horario" LIMIT 5');
    console.log('Horarios:', horarios);
  } finally {
    await app.close();
  }
}

run().catch((err) => {
  console.error(err);
});
