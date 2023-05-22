import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { deviceSchema, Device } from './schema/device.schema'
import { DevicesService } from './devices.service' 
import { DevicesController } from './devices.controller';
import { SigfoxModule } from '../sigfox/sigfox.module';

@Module({
    imports:[
        SigfoxModule,
        MongooseModule.forFeature([
            {
                name: Device.name,
                schema: deviceSchema,
            }
        ])
    ],
    providers: [ DevicesService ],
    controllers: [ DevicesController],
    exports: [ DevicesService ]
})
export class DevicesModule {}
