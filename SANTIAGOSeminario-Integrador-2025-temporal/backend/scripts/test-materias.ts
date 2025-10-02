import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { MateriaService } from '../src/materia/materia.service';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const service = app.get(MateriaService);
    console.log('Invocando servicio...');
    const result = await service.findMateriasDisponibles(3);
    console.log('Cantidad:', result.length);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await app.close();
  }
}

run().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
