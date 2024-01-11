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

  @Post('equalvf/callback')
  async handleSigfoxVoltCallbackVF( 
      @Body() payload: any,
    ) {
      console.log('++++++++EQUAL-VINFAST++++++++++++');
      const {seqNumber, data, device, time, deviceTypeId} = payload;
      console.log(seqNumber, data, device, time, deviceTypeId);
      console.log('+++++++++EQUAL-VINFAST+++++++++++++++');
    const payloadMessage = {
      id: device,
      time: time,
      seqNumber: seqNumber,
      data: data
    };
    const rta = await this.sigFoxService.publishDataToEqualPlatform(payloadMessage);
    return rta;
  }

    // SHOP ONLINE DEVICES
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
      console.log('+++++++volt_fernando_agrasar+++++++++++++');
      console.log(seqNumber, data, device, time, deviceTypeId);
      console.log('++++++++volt_fernando_agrasar++++++++++');
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
      console.log('+++++++volt_paolo_borghetti+++++++++++++');
      console.log(seqNumber, data, device, time, deviceTypeId);
      console.log('++++++++volt_paolo_borghetti++++++++++');
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
    // END SHOP ONLINE DEVICES

    // ----------- TECNOGYM DEVICES ---------------
    @Post('callback/uplink/tecnogym01')
    async handleSigfoxTecnoGym_001UplinkCallback(@Body() payload: any) {
        // console.log('+++++++++tecnogym01-Uplink+++++++++++');      
        // console.log(payload);
        // console.log('++++++++++tecnogym01-Uplink++++++++++++++');
    }
  
    @Post('callback/status/tecnogym01')
    async handleSigfoxTecnoGym_001StatusCallback(@Body() payload: any, @Req() request: Request) {
        // console.log('+++++++++tecnogym01-Status+++++++++++');      
        // console.log(payload);
        // console.log('++++++++++tecnogym01-Status++++++++++++++');
        // console.log(request);
        // console.log('++++++++++tecnogym01-Status++++++++++++++');
    }
  
    // tecnogym devices
    @Post('callback/repeater/tecnogym01')
    async handleSigfoxTecnoGym_001RepeaterCallback(@Body() payload: any) {
        // console.log('+++++++++tecnogym01-Repeater+++++++++++');      
        // console.log(payload);
        // console.log('++++++++++tecnogym01-Repeater++++++++++++++');
    }
  
    // tecnogym devices
    @Post('callback/da/tecnogym01')
    async handleSigfoxTecnoGym_001DataAdvanceCallback(@Body() payload: any) {
        // console.log('+++++++++tecnogym01-DataAdvance+++++++++++');      
        // console.log(payload);
        // console.log('++++++++++tecnogym01-DataAdvance++++++++++++++');
    }
  
    // tecnogym group 2 devices
    @Post('callback/uplink/tecnogym02')
    async handleSigfoxTecnoGym_002UplinkCallback(@Body() payload: any) {
        console.log('+++++++++tecnogym02-Uplink+++++++++++');      
        console.log(payload);
        console.log('++++++++++tecnogym02-Uplink++++++++++++++');
    }
    // ----------- END TECNOGYM DEVICES ---------------
    @Post('/tecnogym720/callback')
    async handleSigfoxTecnogym(@Body() payload: any) {
      const { seqNumber, data, device, time, deviceTypeId } = payload;
      console.log('+++++++tecnogym720d+++++++++++++');
      console.log(seqNumber, data, device, time, deviceTypeId);
      console.log(payload);
      console.log('++++++++tecnogym720d++++++++++');
      
      // const payloadMessage = {
      //   id: device,
      //   time: time,
      //   seqNumber: seqNumber,
      //   data: data,
      // };
      // const rta = await this.sigFoxService.publishDataToEalloraPlatform(
      //   payloadMessage,
      // );
      // return rta;
    }
}
