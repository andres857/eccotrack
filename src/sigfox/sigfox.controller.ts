require('dotenv').config();
import { Controller,Post, Query, Body, Get, Param, Req} from '@nestjs/common';
import { Request } from 'express';
import { SigfoxService } from './sigfox.service'

@Controller('sigfox')
export class SigfoxController {
  constructor( private sigFoxService: SigfoxService){}

  @Get('/device/:id')
  async locations(@Param('id') id:string){
    const location = await this.sigFoxService.getLocationByIdDevice(id);
    return location;
  }

  // equal volts
  @Get('/devices/equal')
  async geteletecno(){
    const { data } = await this.sigFoxService.getDevicesEqual();
    return data;
  }
// shop-online volts
  @Get('/devices/shop-online')
  async getVolts(){
    const { data } = await this.sigFoxService.getDevicesShopOnline();
    return data;
  }

  // @Get('/type/volt/devicetype')
  // async getdeviceType(){
  //   const { data } = await this.sigFoxService.getDeviceTypes();
  //   return data;
  // }

// acciona devices
  // @Post('callback')
  // async handleSigfoxCallback( @Body() payload: any, @Query('time') time: any, @Query('seqNumber') seqNumber: any) {
  //   const payloadMessage = {
  //     time: Number(time),
  //     seqNumber: Number(seqNumber),
  //     ...payload,
  //   };
  //   const newMessage = await this.sigFoxService.saveDataFromCallBack(payloadMessage);
  //   return newMessage;
  // }

  @Post('volt/callback')
  async handleSigfoxVoltCallback( 
    @Body() payload: any,
    ) {
      console.log('+++++++++volt+++++++++++');      
      const {seqNumber, data, device, time, deviceTypeId} = payload;
      console.log('++++++++++volt++++++++++++++');
      const payloadMessage = {
        id: device,
        time: time,
        seqNumber: seqNumber,
        data: data
      };
      console.log(payloadMessage);
      const rta = await this.sigFoxService.publishDataEallora(payloadMessage);
      return rta;
  }

  // @Post('voltequal2/callback')
  // async handleSigfoxVoltCallback2( 
  //     @Body() payload: any,
  //   ) {
  //     const {seqNumber, data, device, time, deviceTypeId} = payload;
  //     console.log('+++++++equal2+++++++++++++');
  //     console.log( seqNumber, data, device, time, deviceTypeId);
  //     console.log('++++++++equal2++++++++++');
  //   const payloadMessage = {
  //     id: device,
  //     time: time,
  //     seqNumber: seqNumber,
  //     data: data
  //   };
  //   const rta = await this.sigFoxService.publishDataEqualVolt(payloadMessage);
  //   return rta;
  // }

  // @Post('voltequal3/callback')
  // async handleSigfoxVoltCallback3( 
  //     @Body() payload: any,
  //   ) {
  //     console.log('++++++++equal3++++++++++++');
  //     const {seqNumber, data, device, time, deviceTypeId} = payload;
  //     console.log(seqNumber, data, device, time, deviceTypeId);
  //     console.log('+++++++++equal3+++++++++++++++');
  //   const payloadMessage = {
  //     id: device,
  //     time: time,
  //     seqNumber: seqNumber,
  //     data: data
  //   };
  //   const rta = await this.sigFoxService.publishDataEqualVolt(payloadMessage);
  //   return rta;
  // }
  // @Post('voltcfl/callback')
  // async handleSigfoxVoltCFL( 
  //     @Body() payload: any,
  //   ) {
  //     console.log('++++++++cfl++++++++++++');
  //     const {seqNumber, data, device, time, deviceTypeId} = payload;
  //     console.log(seqNumber, data, device, time, deviceTypeId);
  //     console.log('+++++++++cfl+++++++++++++++');
  //   const payloadMessage = {
  //     id: device,
  //     time: time,
  //     seqNumber: seqNumber,
  //     data: data
  //   };
  //   return payloadMessage;
  // }
}
