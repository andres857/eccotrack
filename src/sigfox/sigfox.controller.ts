require('dotenv').config();
import { Controller,Post, Query, Body, Get, Param, Req} from '@nestjs/common';
import { SigfoxService } from './sigfox.service'

@Controller('sigfox')
export class SigfoxController {
  constructor( private sigFoxService: SigfoxService){}

@Get('/devices/acciona')
  async locations(){
    const devices = await this.sigFoxService.getAccionaDevicesTo();
    return devices;
  }

  @Get('/devices/tecnogym')
  async gettecnogym(){
    const data = await this.sigFoxService.getDevicesTecnoGYM();
    return data;
  }

  // Send info to platform Eallora APP
  @Post('volt/callback')
  async handleSigfoxVoltCallback( 
    @Body() payload: any,
    ) {
      console.log('+++++++++volt+++++++++++');      
      const {seqNumber, data, device, time} = payload;
      console.log('++++++++++volt++++++++++++++');
      const payloadMessage = {
        id: device,
        time: time,
        seqNumber: seqNumber,
        data: data
      };
      console.log(payloadMessage);
      const rta = await this.sigFoxService.publishDataToEalloraPlatform(payloadMessage);
      return rta;
  }

  @Post('voltsigligabue/callback')
  async handleSigfoxVoltCallbackSigligabue(@Body() payload: any) {
      const {seqNumber, data, device, time, deviceTypeId} = payload;
      console.log('+++++++sigligabue+++++++++++++');
      console.log( seqNumber, data, device, time, deviceTypeId);
      console.log('++++++++sigligabue++++++++++');
    const payloadMessage = {
      id: device,
      time: time,
      seqNumber: seqNumber,
      data: data
    };
    const rta = await this.sigFoxService.publishDataToEalloraPlatform(payloadMessage);
    return rta;
  }

  @Post('voltTelenext/callback')
  async handleSigfoxVoltCallbackTelenext(@Body() payload: any) {
    const { seqNumber, data, device, time, deviceTypeId } = payload;
    console.log('+++++++Telenext+++++++++++++');
    console.log(seqNumber, data, device, time, deviceTypeId);
    console.log('++++++++Telenext++++++++++');
    const payloadMessage = {
      id: device,
      time: time,
      seqNumber: seqNumber,
      data: data,
    };
    const rta = await this.sigFoxService.publishDataToEalloraPlatform(
      payloadMessage,
    );
    return rta;
  }

  // Send info to platform EQUAL
  @Post('equal/callback')
  async handleSigfoxVoltCallbackVF( 
      @Body() payload: any,
    ) {
      console.log('++++++++EQUAL++++++++++++');
      const {seqNumber, data, device, time, deviceTypeId} = payload;
      console.log(seqNumber, data, device, time, deviceTypeId);
      console.log('+++++++++EQUAL+++++++++++++++');
    const payloadMessage = {
      id: device,
      time: time,
      seqNumber: seqNumber,
      data: data
    };
    const rta = await this.sigFoxService.publishDataToEqualPlatform(payloadMessage);
    return rta;
  }

  // Tecnogym - Eccotrack devices
  @Post('/tecnogym/callback')
  async handleSigfoxTecnogym(@Body() payload: any) {
    // const { seqNumber, data, device, time, deviceTypeId } = payload;
    console.log('+++++++tecnogym+++++++++++++');
    // console.log(seqNumber, data, device, time, deviceTypeId);
    console.log(payload);
    console.log('++++++++tecnogym++++++++++');
  }
    // Makeitalia - Eccotrack devices
    @Post('/makeitalia/callback')
    async handleMakeItalia(@Body() payload: any, @Query('time') time: any, @Query('seqNumber') seqNumber: any ) {
      const payloadMessage = {
        time: Number(time),
        seqNumber: Number(seqNumber),
        ...payload,
      };
      console.log('+++++++MakeItalia+++++++++++++');
      console.log(payloadMessage);
      console.log('++++++++MakeItalia++++++++++');
    }

    // Acciona - Eccotrack devices
    @Post('/makeitalia/callback')
    async handleAcciona(@Body() payload: any, @Query('time') time: any, @Query('seqNumber') seqNumber: any ) {
      const payloadMessage = {
        time: Number(time),
        seqNumber: Number(seqNumber),
        ...payload,
      };
      console.log('+++++++Acciona+++++++++++++');
      console.log(payloadMessage);
      console.log('++++++++Acciona++++++++++');
    }
}
