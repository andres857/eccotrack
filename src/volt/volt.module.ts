import { Module } from '@nestjs/common';
import { VoltService } from './volt.service';
import { VoltController } from './volt.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { voltSchema, Volt } from './schema/volt.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Volt.name,
        schema: voltSchema,
      },
    ])
  ],
  providers: [ VoltService ],
  controllers: [ VoltController ],
  exports: [ VoltService ]
})
export class VoltModule {}
