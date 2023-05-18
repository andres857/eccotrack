require('dotenv').config();
import axios from 'axios';
import { Get, Controller, Post, Query, Param, Body} from '@nestjs/common';
import { SigfoxService } from './sigfox.service'

@Controller('sigfox')
export class SigfoxController {
  constructor( private sigFoxService: SigfoxService){}

  @Get('devices')
  async getDevices() {
    const userApi = process.env.USERNAME;
    const passApi = process.env.PASSWORD;

    const response = await axios.get('https://api.sigfox.com/v2/devices', {
      auth: {
        username: userApi,
        password: passApi
      },
    });
    return response.data;
  }

  @Get('devices/:deviceId/messages')
  async getDeviceMessages(@Param('deviceId') deviceId: string) {
    const userApi = process.env.USERNAME;
    const passApi = process.env.PASSWORD;

    const response = await axios.get(`https://api.sigfox.com/v2/devices/${deviceId}/messages`, {
      auth: {
        username: userApi,
        password: passApi
      },
    });

    return response.data;
  }

  @Get('devices/:deviceId/locations')
  async getDeviceLocations(@Param('deviceId') deviceId: string) {
    const userApi = process.env.USERNAME;
    const passApi = process.env.PASSWORD;

    const response = await axios.get(`https://api.sigfox.com/v2/devices/${deviceId}/locations`, {
      auth: {
        username: userApi,
        password: passApi
      },
    });
    console.log(response.data);
    
    const dateFormatted = new Date(response.data.time);
    console.log(dateFormatted);
    
    return response.data;
  }

  @Get('devices/:deviceId/undeliveredcallbacks')
  async getUndeliveredCallBacks(@Param('deviceId') deviceId: string) {
    const userApi = process.env.USERNAME;
    const passApi = process.env.PASSWORD;

    const response = await axios.get(`https://api.sigfox.com/v2/devices/${deviceId}/callbacks-not-delivered`, {
      auth: {
        username: userApi,
        password: passApi
      },
    });

    return response.data;
  }

  @Get('coverage')
  async getCoverage() {
    const userApi = process.env.USERNAME;
    const passApi = process.env.PASSWORD;
    
    const response = await axios.get('https://api.sigfox.com/v2/coverages/global/predictions', {
      params: {
        lat: 43.52,
        lng: 1.55,
        radius: 200,
      },
      auth: {
        username: userApi,
        password: passApi
      },
    });

    return response.data;
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
}