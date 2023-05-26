import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { deviceSchema, Device } from '../devices/schema/device.schema'
import { SharedService } from './shared-module.service';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: Device.name,
                schema: deviceSchema,
            }
        ])
    ],
    providers: [
        SharedService
    ],
    exports: [
        SharedService
    ]
})
export class SharedModule {}