require('dotenv').config();
import { Get, Controller, Post, Query, Param, Body} from '@nestjs/common';
import axios from 'axios';

@Controller('sigfox')
export class SigfoxController {
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
  handleSigfoxCallback( @Body() data: any): string {
    console.log('Datos recibidos de Sigfox:', data);
    // Procesa los datos recibidos aquí y guarda en tu base de datos si es necesario.
    // Devuelve una respuesta de éxito.
    return 'OK';
  }
}