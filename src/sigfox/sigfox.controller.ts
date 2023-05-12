require('dotenv').config();
import { Get, Controller, Post, Query} from '@nestjs/common';
import axios from 'axios';

@Controller('sigfox')
export class SigfoxController {
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
    handleSigfoxCallback( @Query() query: any): string {
      console.log('Datos recibidos de Sigfox:', query);
      // Procesa los datos recibidos aquí y guarda en tu base de datos si es necesario.
      // Devuelve una respuesta de éxito.
      return 'OK';
    }
}
// curl --get --data lat=43.52 --data lng=1.55 --data radius=200 --user 645ba2a7e4b2bf156786a34b:b1b9aea692062762dccd71dd8e758bc3 https://api.sigfox.com/v2/coverages/global/predictions