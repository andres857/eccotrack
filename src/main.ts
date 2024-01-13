require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync('/usr/src/app/ssl-certs/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/usr/src/app/ssl-certs/cert.pem', 'utf8'),
    ca: fs.readFileSync('/usr/src/app/ssl-certs/chain.pem', 'utf8'),
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
