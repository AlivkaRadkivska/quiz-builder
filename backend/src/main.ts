import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT ?? 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log('Application is running on url', `http://localhost:${port}`);
  })
  .catch((err) => {
    console.error('Error during application bootstrap:', err);
    process.exit(1);
  });
