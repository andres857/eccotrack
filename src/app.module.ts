require('dotenv').config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SigfoxModule } from './sigfox/sigfox.module';
import { DevicesModule } from './devices/devices.module';
import { UsersModule } from './users/users.module';
import { LocationsController } from './locations/locations.controller';
import { LocationsService } from './locations/locations.service';
import { LocationsModule } from './locations/locations.module';
import { MessagesModule } from './messages/messages.module';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { EventsModule } from './events/events.module';
import { ClientsModule } from './clients/clients.module';
import { SharedModule } from './shared-module/shared-module.module';
import { VoltModule } from './volt/volt.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3126,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      synchronize: true,
    }),
    // mongodb 
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('DATABASE_URI'),
        };
      },
      inject: [ConfigService],
    }),
    SigfoxModule, 
    DevicesModule, 
    UsersModule, 
    LocationsModule, 
    MessagesModule, 
    EventsModule, 
    ClientsModule, 
    SharedModule, 
    VoltModule, 
    AuthModule
  ],
  controllers: [
    AppController, 
    LocationsController, 
    EventsController
  ],
  providers: [
    AppService, 
    LocationsService, 
    EventsService
  ],
})
export class AppModule {}