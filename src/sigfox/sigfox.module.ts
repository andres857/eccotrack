import { Module } from '@nestjs/common';
import { SigfoxService } from './sigfox.service';
import { SigfoxController } from './sigfox.controller';
import { MessagesModule } from '../messages/messages.module';
import { SharedModule } from '../shared-module/shared-module.module';
import { VoltModule } from 'src/volt/volt.module';

@Module({
  imports:[
    VoltModule,
    SharedModule,
    MessagesModule,
  ],
  controllers: [ SigfoxController ],
  providers: [ SigfoxService ],
  exports: [ SigfoxService ]
})
export class SigfoxModule {}
