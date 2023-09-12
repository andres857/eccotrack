require('dotenv').config();
import { Controller,Post, Query, Body, Get, Param, Req} from '@nestjs/common';
import { SigfoxService } from './sigfox.service'

@Controller('sigfox')
export class SigfoxController {
  constructor( private sigFoxService: SigfoxService){}

  @Get('/devices')
  async locations(){
    const devices = await this.sigFoxService.getAccionaDevices();
    return devices;
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

  // ligabue volts
  @Get('/devices/ligabue')
  async getligabue(){
    const { data } = await this.sigFoxService.getDevicesLigabue();
    return data;
  }

  // francois volts
  @Get('/devices/francois')
  async getfrancois(){
    const { data } = await this.sigFoxService.getDevicesFrancois();
    return data;
  }

  // stefano volts
  @Get('/devices/stefano')
  async getstefano(){
    const { data } = await this.sigFoxService.getDevicesStefano();
    return data;
  }

  // jose volts
  @Get('/devices/jose')
  async getjose(){
    const { data } = await this.sigFoxService.getDevicesJose();
    return data;
  }
  
  // Telenext volts
  @Get('/devices/telenext')
  async gettelenext(){
    const { data } = await this.sigFoxService.getDevicesTelenext();
    return data;
  }

  // Fernando Agrasar volts
  @Get('/devices/fernando')
  async getfernando(){
    const { data } = await this.sigFoxService.getDevicesFernando();
    return data;
  }

  // Paolo Borghetti volts
  @Get('/devices/paolo')
  async getpaolo(){
    const { data } = await this.sigFoxService.getDevicesPaolo();
    return data;
  }

// acciona devices
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


  // eallora devices
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
      const rta = await this.sigFoxService.publishDataToEalloraPlatform(payloadMessage);
      return rta;
  }

  @Post('voltequal2/callback')
  async handleSigfoxVoltCallback2( 
      @Body() payload: any,
    ) {
      const {seqNumber, data, device, time, deviceTypeId} = payload;
      console.log('+++++++equal2+++++++++++++');
      console.log( seqNumber, data, device, time, deviceTypeId);
      console.log('++++++++equal2++++++++++');
    const payloadMessage = {
      id: device,
      time: time,
      seqNumber: seqNumber,
      data: data
    };
    const rta = await this.sigFoxService.publishDataToEqualPlatform(payloadMessage);
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

  @Post('volt_francois/callback')
  async handleSigfoxVoltCallbackFrancois(@Body() payload: any) {
      const {seqNumber, data, device, time, deviceTypeId} = payload;
      console.log('+++++++francois+++++++++++++');
      console.log( seqNumber, data, device, time, deviceTypeId);
      console.log('++++++++francois++++++++++');
    const payloadMessage = {
      id: device,
      time: time,
      seqNumber: seqNumber,
      data: data
    };
    const rta = await this.sigFoxService.publishDataToEalloraPlatform(payloadMessage);
    return rta;
  }

  @Post('volts_stefano/callback')
  async handleSigfoxVoltCallbackStefano(@Body() payload: any) {
    const { seqNumber, data, device, time, deviceTypeId } = payload;
    console.log('+++++++stefano+++++++++++++');
    console.log(seqNumber, data, device, time, deviceTypeId);
    console.log('++++++++stefano++++++++++');
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

  
  @Post('volt_fernando_agrasar/callback')
  async handleSigfoxVoltCallbackFernando(@Body() payload: any) {
    const { seqNumber, data, device, time, deviceTypeId } = payload;
    console.log('+++++++fernando+++++++++++++');
    console.log(seqNumber, data, device, time, deviceTypeId);
    console.log('++++++++fernando++++++++++');
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

  @Post('volt_paolo_borghetti/callback')
  async handleSigfoxVoltCallbackPaolo(@Body() payload: any) {
    const { seqNumber, data, device, time, deviceTypeId } = payload;
    console.log('+++++++paolo+++++++++++++');
    console.log(seqNumber, data, device, time, deviceTypeId);
    console.log('++++++++paolo++++++++++');
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

  @Post('natallia_yatsuta/callback')
  async handleSigfoxVoltCallbacknatallia_yatsuta(@Body() payload: any) {
    const { seqNumber, data, device, time, deviceTypeId } = payload;
    console.log('+++++++natallia_yatsuta+++++++++++++');
    console.log(seqNumber, data, device, time, deviceTypeId);
    console.log('++++++++natallia_yatsuta++++++++++');
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

  @Post('volt_josé_marey/callback')
  async handleSigfoxVoltCallbackJose(@Body() payload: any) {
    const { seqNumber, data, device, time, deviceTypeId } = payload;
    console.log('+++++++jose+++++++++++++');
    console.log(seqNumber, data, device, time, deviceTypeId);
    console.log('++++++++jose++++++++++');
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

  @Post('voltequal3/callback')
  async handleSigfoxVoltCallback3( 
      @Body() payload: any,
    ) {
      console.log('++++++++equal3++++++++++++');
      const {seqNumber, data, device, time, deviceTypeId} = payload;
      console.log(seqNumber, data, device, time, deviceTypeId);
      console.log('+++++++++equal3+++++++++++++++');
    const payloadMessage = {
      id: device,
      time: time,
      seqNumber: seqNumber,
      data: data
    };
    const rta = await this.sigFoxService.publishDataToEqualPlatform(payloadMessage);
    return rta;
  }
  
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
