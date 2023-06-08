require('dotenv').config();
import { Controller,Post, Query, Body, Get, Param} from '@nestjs/common';
import { SigfoxService } from './sigfox.service'

@Controller('sigfox')
export class SigfoxController {
  constructor( private sigFoxService: SigfoxService){}

  @Get('/device/:id')
  async locations(@Param('id') id:string){
    const location = await this.sigFoxService.getLocationByIdDevice(id);
    return location;
  }

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
  @Post('volt/callback')
  async handleSigfoxVoltCallback( 
      @Query('id') id: any, 
      @Query('time') time: any,
      @Query('data') data: any,
      @Query('seqNumber') seqNumber: any,
    ) {
      console.log('++++++++++++++++++++');
      console.log(id,time,data, seqNumber);
      console.log('++++++++++++++++++++++++');
      
    const payloadMessage = {
      id: id,
      time: time,
      seqNumber: seqNumber,
      data: data
    };
    console.log('-----------');
    console.log(payloadMessage);
    console.log('-----------');

    const newMessage = await this.sigFoxService.saveDataFromCallBackVolt(payloadMessage);
    return newMessage;
  }
}