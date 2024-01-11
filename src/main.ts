require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync('/usr/src/app/certs-eccotrack/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/usr/src/app/certs-eccotrack/cert.pem', 'utf8'),
    ca: fs.readFileSync('/usr/src/app/certs-eccotrack/chain.pem', 'utf8'),
  }

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.enableCors({
    origin: 'http://147.182.191.38:5173',
  });
  await app.listen(3000);
}
bootstrap();
