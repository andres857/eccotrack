import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SigfoxController } from './sigfox/sigfox.controller';
import { SigfoxModule } from './sigfox/sigfox.module';
import { DevicesController } from './devices/devices.controller';
import { DevicesService } from './devices/devices.service';
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

@Module({
  imports: [SigfoxModule, DevicesModule, UsersModule, LocationsModule, MessagesModule, EventsModule, ClientsModule],
  controllers: [AppController, SigfoxController, DevicesController, LocationsController, EventsController],
  providers: [AppService, DevicesService, LocationsService, EventsService],
})
export class AppModule {}
