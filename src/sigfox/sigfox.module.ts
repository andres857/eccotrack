import { Module } from '@nestjs/common';
import { SigfoxService } from './sigfox.service';
import { SigfoxController } from './sigfox.controller';
import { MessagesModule } from '../messages/messages.module'

@Module({
  imports:[
    MessagesModule
  ],
  controllers: [ SigfoxController ],
  providers: [ SigfoxService ],
  exports: [ SigfoxService ]
})
export class SigfoxModule {}
