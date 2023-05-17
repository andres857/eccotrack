import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Client } from './entity/client.entity';
import { clientSchema, Client } from './schema/client.schema';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Client]),
    MongooseModule.forFeature([
      {
        name: Client.name,
        schema: clientSchema,
      },
    ])
  ],
  providers: [ ClientsService ],
  controllers: [ ClientsController ],
  exports: [ ClientsService ]
})
export class ClientsModule {}