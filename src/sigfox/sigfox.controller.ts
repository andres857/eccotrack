require('dotenv').config();
import { Controller, Post, Query, Body} from '@nestjs/common';
import { SigfoxService } from './sigfox.service'

@Controller('sigfox')
export class SigfoxController {
  constructor( private sigFoxService: SigfoxService){}

  @Post('callback')
  async handleSigfoxCallback( @Body() payload: any, @Query('time') time: any, @Query('seqNumber') seqNumber: any) {
    const payloadMessage = {
      time: Number(time),
      seqNumber: Number(seqNumber),
      ...payload,
    };
    const newMessage = await this.sigFoxService.saveDataFromCallBack(payloadMessage);
    return newMessage;
  }
}