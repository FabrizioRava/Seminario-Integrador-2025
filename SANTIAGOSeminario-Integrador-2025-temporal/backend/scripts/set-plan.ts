import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  try {
    const result = await dataSource.query(`
      UPDATE "user"
      SET "planEstudioId" = (
        SELECT id FROM "plan_estudio" ORDER BY id LIMIT 1
      )
      WHERE email = 'estudiante@universidad.edu'
      RETURNING id;
    `);
    console.log('Plan asignado:', result);
  } finally {
    await app.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
