require('dotenv').config();
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { MessagesService } from '../messages/messages.service';
import { SharedService } from 'src/shared-module/shared-module.service';
import { VoltService } from 'src/volt/volt.service';
const https = require('https');


@Injectable()
export class SigfoxService {
    private userSigFoxACCIONA: string;
    private passSigfoxACCIONA: string;
    private urlEalloraPROD: string;
    private passSigfoxTECNOGYM: string;
    private userSigFoxTECNOGYM: string;

    constructor( 
        private messageService: MessagesService,
        private sharedService: SharedService,
    ){
        this.userSigFoxTECNOGYM = process.env.USERNAMETECNOGYM;
        this.passSigfoxTECNOGYM = process.env.PASSWORDTECNOGYM;
        this.userSigFoxACCIONA = process.env.USERNAMEACCIONA;
        this.passSigfoxACCIONA = process.env.PASSWORDACCIONA;
        // route api eallora
        this.urlEalloraPROD = process.env.URL_EALLORA_PROD;
    }
    //Get all devices Tecnogym
    async getDevicesTecnoGYM(){
        try {
            const { data } = await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFoxTECNOGYM,
                    password: this.passSigfoxTECNOGYM,
                }
            });
            console.log(data.data);
            
            const devicesCount = data.data.length;
            console.log(devicesCount);
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }
    //Get all devices Eccotrack
    async getAccionaDevicesTo(){
       try {
            const {data} = await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFoxACCIONA,
                    password: this.passSigfoxACCIONA,
                }
            });
            return data;
        } catch (error) {
            console.error(error.message);
        }
    }
    
    async getLocationByIdDevice(id){
        try {
            console.log('location service', id);
            console.log('credentials');
            console.log(this.userSigFoxACCIONA);
            console.log(this.passSigfoxACCIONA);
            
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/locations`, {
                auth: {
                  username: this.userSigFoxACCIONA,
                  password: this.userSigFoxACCIONA
                },
              });
        } catch (error) {
            console.log(error.message);      
        }
    }

    async getMessageByIdDevice(id){
        const message = await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
            auth:{
                username: this.userSigFoxACCIONA,
                password: this.userSigFoxACCIONA,
            }
        });
        return message.data;
    }
    
    async saveDataFromCallBack(payload: any) {
        const newMessage = await this.messageService.create(payload);
        const dataUpdate = await this.sharedService.updateLastSeenOnDevices(payload);
    }

    async saveDataFromCallBackVolt(payload: any) {
        const newMessage = await this.messageService.saveDataforEalloraPlatform(payload);
        return newMessage;
    }
    // retorna todo el objeto del evento del device
    async decodedEventVoltDevice(dataRaw: any){
        const eventDevices = [
            {
                name: 'keepAlive',
                typeAlert: "keepAlive",
                pattern: 'c5c90',
                status: null
            },
            {
                name: 'powerOn',
                typeAlert: "up",
                pattern: 'c5c98',
                status: 0
            },
            {
                name: 'powerOff',
                typeAlert: "down",
                pattern: 'c5c99',
                status: 1
            },
            {
                name: 'deviceOn',
                typeAlert: "on",
                pattern: 'c5c9900000000',
                status: 0
            }
        ];
        // determina si el estado del dispositivo es on
        if ( dataRaw.slice( 5, -7 ) === '00000000') {
          return eventDevices[3].name;
        }
        const data = dataRaw.slice( 0, 5 );
        const statusDevice = eventDevices.find( status => status.pattern === data) || { name: 'unknown', typeAlert: "unknown" }; 
        return statusDevice;
    }
    // funciones temporales para publicar en equal
    async decodedMessageDeviceTypeVoltForEqual(dataRaw: any, id: any){
        let statusDevice = null;
        let eventDevice = null;

        // calcula el porcentaje de batería
        const batteryCoded = dataRaw.slice(-2);
        const battery = (parseInt(batteryCoded, 16));
                
        // calcula la temperatura
        const temperatureCoded = dataRaw.slice(-6, -2);
        const temperatureDecimal = parseInt(temperatureCoded, 16);
        const temperature = (temperatureDecimal / 10) -5;

        eventDevice = await this.decodedEventVoltDevice(dataRaw);

        if (eventDevice.name === 'keepAlive') {
            console.log('********** event keepalive found *********');
            const lastmessage = await this.messageService.getLastMessageByIdDevice(id);
            console.log('lastMessage of device', lastmessage);

            if (!lastmessage) {
                console.log(`Device not found with id: ${id}`);
                statusDevice = 0; // Para el estado inicial se setea el status como 0
            }else{
                console.log('decodificando de nuevo el mensaje', lastmessage);
                // eventDevice = await this.decodedEventVoltDevice(lastmessage.data);
                const lastStatus = (lastmessage as any).status; // se omite la verificacion de typescript
                // si el evento anterior tambien es keepAlive se setea el estado a 0
                statusDevice = lastStatus;
            }   
        }else{
            statusDevice = eventDevice.status;
        }
        const decodedMessage = {
            type: 'data',
            object: id,
            i1: parseInt(statusDevice),
            i2: battery/10,
            i3: parseFloat(temperature.toFixed(2)),
            i4: eventDevice.name === 'keepAlive' ? 1 : 0,
        }
        return decodedMessage;
    }

    async decodedMessageDeviceTypeVoltForEallora(dataRaw: any, id: any, time: any, seqNumber: any){
        let statusDevice = null;
        let eventDevice = null;
        // calcula el porcentaje de batería
        const batteryCoded = dataRaw.slice(-2);
        const battery = ((parseInt(batteryCoded, 16) * 0.05) + 1.45).toFixed(2);
        const batteryNumeric = parseFloat(battery); // Convertir a número
        const batteryPorcentaje = ( batteryNumeric / 3) * 100;

        eventDevice = await this.decodedEventVoltDevice(dataRaw);
        
        if (eventDevice.name === 'keepAlive') {
            console.log('********** event keepalive found *********');
            const lastmessage = await this.messageService.getLastMessageByIdDevice(id);
            console.log('lastMessage of device', lastmessage);

            if (!lastmessage) {
                console.log(`Device not found with id: ${id}`);
                statusDevice = 0; // Para el estado inicial se setea el status como 0
            }else{
                console.log('decodificando de nuevo el mensaje', lastmessage);
                // eventDevice = await this.decodedEventVoltDevice(lastmessage.data);
                const lastStatus = (lastmessage as any).status; // se omite la verificacion de typescript
                // si el evento anterior tambien es keepAlive se setea el estado a 0
                statusDevice = lastStatus;
            }   
        }else{
            statusDevice = eventDevice.status;
        }

        const decodedMessage = {
            key: `00${id}`,
            updated: time * 1000,
            battery: parseInt(batteryPorcentaje.toFixed(0)),
            sequence: parseInt(seqNumber),
            status: parseInt(statusDevice),
        }        
        return decodedMessage;
    }

    async publishDataToEqualPlatform(payload: any){
        const agent = new https.Agent({  
            rejectUnauthorized: false
          });
        let message = '';
        const url = 'https://monitoring-api.e-qual.fr/api/send';
        console.log('payload', payload);
        const { id, time, data } = payload;
        console.log('id', id, 'time', time, 'data', data);
        const decodedMessage = await this.decodedMessageDeviceTypeVoltForEqual( data, id );
        console.log('decodedMessage', decodedMessage);

        payload.status = decodedMessage.i1;
        console.log('payload', payload);
        
        await this.saveDataFromCallBackVolt(payload); //save data in our database
        try {
            const response = await axios.post(url, decodedMessage,{
                headers: {
                    'x-api-key': '049f4f67-6e3b-4007-a700-9017e29d15b4',
                    'Content-Type': 'application/json'
                },
                httpsAgent: agent
            });
            console.log('Respuesta del servidor Equal: ', response.data);
            message = 'success'
        }catch (error) {
            console.error('Error al enviar a equal Platform: ', error);
            message = 'error'
        }
        return message;
    }

    async publishDataToEalloraPlatform(payload){
        let message = '';
        console.log('payload', payload);
        const { id, time, seqNumber, data } = payload;
        const decodedMessage = await this.decodedMessageDeviceTypeVoltForEallora( data, id, time, seqNumber );
        console.log('decodedMessage', JSON.stringify(decodedMessage));
        console.log('status message -----', decodedMessage.status);
        payload.status = decodedMessage.status;
        console.log('dataTosave', payload);
        
        const dataEallora = await this.saveDataFromCallBackVolt(payload); //save data in our database
        console.log('EALLORA', dataEallora);
        if (decodedMessage.status === 0 || decodedMessage.status === 1) {
            try {
                const response = await axios.post(this.urlEalloraPROD, decodedMessage);
                message = 'success'
                console.log('Respuesta del servidor de destino: ', response.data);
            }catch (error) {
                message = 'error'
                console.error('Error al enviar a eallora: ', error.message);
            }
        }else{
            message = 'el evento no se envia a eallora';
        }
        return message;
    }
}