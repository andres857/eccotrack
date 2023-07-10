require('dotenv').config();
import axios from 'axios';
import { Catch, Injectable } from '@nestjs/common';
import { MessagesService } from '../messages/messages.service';
import { SharedService } from 'src/shared-module/shared-module.service';
import { VoltService } from 'src/volt/volt.service';

@Injectable()
export class SigfoxService {
    private userSigFoxACCIONA: string;
    private passSigfoxACCIONA: string;
    private userSigFoxVOLT: string;
    private passSigfoxVOLT: string;
    private userSigFoxEQUAL: string;
    private passSigfoxEQUAL: string;
    private userSigFoxAIRNEX: string;
    private passSigfoxAIRNEX: string;
    private userSigFoxCFL: string;
    private passSigfoxCFL: string;
    private urlEalloraDEV: string;
    private urlEalloraPROD: string;

    constructor( 
        private messageService: MessagesService,
        private sharedService: SharedService,
        private voltService: VoltService,
    ){
        // route api eallora
        this.urlEalloraDEV = process.env.URL_EALLORA_DEV;
        this.urlEalloraPROD = process.env.URL_EALLORA_PROD;

        this.userSigFoxACCIONA = process.env.USERNAMEACCIONA;
        this.passSigfoxACCIONA = process.env.PASSWORDACCIONA;
        this.userSigFoxVOLT = process.env.USERNAMEVOLT;
        this.passSigfoxVOLT = process.env.PASSWORDVOLT;
        this.userSigFoxEQUAL = process.env.USERNAMEEQUAL;
        this.passSigfoxEQUAL = process.env.PASSWORDEQUAL;
        this.userSigFoxAIRNEX = process.env.USERNAMEAIRNEX;
        this.passSigfoxAIRNEX = process.env.PASSWORDAIRNEX;
        this.userSigFoxCFL = process.env.USERNAMECFL;
        this.passSigfoxCFL = process.env.PASSWORDCFL;
    }
    // DEVICES TYPE - VOLT equal
    async getDevicesEqual(){
        try {
            const { data } = await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFoxEQUAL,
                    password: this.passSigfoxEQUAL,
                }
            });            
            const devices = data.data.map( item =>{
                return {
                    id: item.id,
                    name: item.name,
                    comState: item.comState,
                    lqi: item.lqi,
                }
            })
            return devices;
        } catch (error) {
            console.error(error);
        }
    }
    async getMessageEqual(id){
        try {
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
                auth:{
                    username: this.userSigFoxEQUAL,
                    password: this.passSigfoxEQUAL,
                }
            });
        } catch (error) {            
            console.log(error.message);
            return error;
        }
    }
    // DEVICES TYPE - VOLT shop-online
    async getDevicesShopOnline(){
        try {
            return await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFoxAIRNEX,
                    password: this.passSigfoxAIRNEX,
                }
            });
        } catch (error) {
            console.log('hola mundo');
            console.error(error);
        }
    }
    async getMessageShopOnline(id){
        try {
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
                auth:{
                    username: this.userSigFoxVOLT,
                    password: this.passSigfoxVOLT,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    // DEVICES TYPE - VOLT AIRNEX
    async getDevicesAIRNEX(){
        try {
            return await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFoxAIRNEX,
                    password: this.passSigfoxAIRNEX,
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
    async getMessageAIRNEX(id){
        try {
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
                auth:{
                    username: this.userSigFoxAIRNEX,
                    password: this.passSigfoxAIRNEX,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    // DEVICES TYPE - VOLT CFL
    async getDevicesCFL(){
        try {
            const {data} = await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFoxCFL,
                    password: this.passSigfoxCFL,
                }
            });
            const devices = data.data.map( item =>{
                return {
                    id: item.id,
                    name: item.name,
                    comState: item.comState,
                    lqi: item.lqi,
                }
            })            
            return devices;
        } catch (error) {
            console.error(error);
        }
    }
    async getMessageCFL(id){
        try {
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
                auth:{
                    username: this.userSigFoxCFL,
                    password: this.passSigfoxCFL,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    // async getDeviceTypes(){
    //     try {
    //         return await axios.get(`https://api.sigfox.com/v2/device-types`, {
    //             auth:{
    //                 username: this.userSigFoxVOLT,
    //                 password: this.passSigfoxVOLT,
    //             }
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    //get all devices Eccotrack
    async getAccionaDevices(){
        try {
            return await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFoxACCIONA,
                    password: this.passSigfoxACCIONA,
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    async getLocationByIdDevice(id){
        try {
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/locations`, {
                auth: {
                  username: this.userSigFoxACCIONA,
                  password: this.userSigFoxACCIONA
                },
              });
        } catch (error) {
            console.log(error);      
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
        console.log(newMessage);

        console.log('data-update');
        console.log(dataUpdate);
        console.log('data-update/');
            
        return newMessage;
    }

    async saveDataFromCallBackVolt(payload: any) {
        return await this.voltService.create(payload);
    }
    
    // funciones temporales para publicar en equal
    async decodedMessageDeviceTypeVolt(dataRaw: any, id: any, time: any){
        let eventDeviceOn;
        const eventDevices = [
            {
                name: 'keepAlive',
                typeAlert: "keepAlive",
                pattern: 'c5c90',
            },
            {
                name: 'powerOn',
                typeAlert: "up",
                pattern: 'c5c98',
            },
            {
                name: 'powerOff',
                pattern: 'c5c99',
                typeAlert: "down",
            }
        ];
        // calcula el porcentaje de batería
        const batteryCoded = dataRaw.slice(-2);
        const battery = ((parseInt(batteryCoded, 16) * 0.05) + 1.45).toFixed(2);
        const batteryNumeric = parseFloat(battery); // Convertir a número
        const batteryPorcentaje = ( batteryNumeric / 3) * 100;
        
        // calcula la temperatura
        const temperatureCoded = dataRaw.slice(-6, -2);
        const temperatureDecimal = parseInt(temperatureCoded, 16);
        const temperature = (temperatureDecimal / 10) -5;

        const dataEventOn = dataRaw.slice( 5, -7 );
        
        if ( dataEventOn === '00000000') {
            eventDeviceOn = {
                name: 'deviceOn',
                pattern: 'c5c9900000000',
                typeAlert: "on",
            }
        }else {
            eventDeviceOn = null;
        }
        const data = dataRaw.slice( 0, 5 );
        const statusDevice = eventDevices.find( status => status.pattern === data) || { name: 'unknown', typeAlert: "unknown" }; 
    
        const decodedMessage = {
            id: id,
            typeAlert: eventDeviceOn === null ? statusDevice.typeAlert : eventDeviceOn.typeAlert,
            time: time,
            battery: parseFloat(batteryPorcentaje.toFixed(0)),
            temperature: parseFloat(temperature.toFixed(2)),
            iskeepAlive: statusDevice.name === 'keepAlive' ? 1 : 0,
            status: 1
        }
        return decodedMessage;
    }

    async decodedMessageDeviceTypeVoltForEallora(dataRaw: any, id: any, time: any, seqNumber: any){
        let statusDeviceEallora = null;
        let eventDeviceOn;
        const eventDevices = [
            {
                name: 'keepAlive',
                typeAlert: "keepAlive",
                pattern: 'c5c90',
            },
            {
                name: 'powerOn',
                typeAlert: "up",
                pattern: 'c5c98',
            },
            {
                name: 'powerOff',
                pattern: 'c5c99',
                typeAlert: "down",
            }
        ];
        // calcula el porcentaje de batería
        const batteryCoded = dataRaw.slice(-2);
        const battery = ((parseInt(batteryCoded, 16) * 0.05) + 1.45).toFixed(2);
        const batteryNumeric = parseFloat(battery); // Convertir a número
        const batteryPorcentaje = ( batteryNumeric / 3) * 100;
        
        // calcula la temperatura
        const temperatureCoded = dataRaw.slice(-6, -2);
        const temperatureDecimal = parseInt(temperatureCoded, 16);
        const temperature = (temperatureDecimal / 10) -5;

        const dataEventOn = dataRaw.slice( 5, -7 );
        
        if ( dataEventOn === '00000000') {
            eventDeviceOn = {
                name: 'deviceOn',
                pattern: 'c5c9900000000',
                typeAlert: "on",
            }
        }else {
            eventDeviceOn = null;
        }
        const data = dataRaw.slice( 0, 5 );
        const statusDevice = eventDevices.find( status => status.pattern === data) || { name: 'unknown', typeAlert: "unknown" }; 
        
        if (statusDevice.name === 'powerOn') {
            statusDeviceEallora = 0;
        } else if (statusDevice.name === 'powerOff') {
            statusDeviceEallora = 1;
        }
        const decodedMessage = {
            key: `00${id}`,
            updated: time * 1000,
            battery: parseInt(batteryPorcentaje.toFixed(0)),
            sequence: parseInt(seqNumber),
            status: parseInt(statusDeviceEallora),
        }        
        return decodedMessage;
    }

    async publishDataEqualVolt(payload: any){
        let message = '';
        console.log('publishDataEqualVolt');
        const url = 'https://monitoring-api.equal.fr/api/send';
        console.log('payload', payload);
        const { id, time, data } = payload;
        console.log('id', id, 'time', time, 'data', data);
        const decodedMessage = await this.decodedMessageDeviceTypeVolt( data, id, time );
        console.log('decodedMessage', decodedMessage);
        try {
            const response = await axios.post(url, decodedMessage);
            message = 'success'
            console.log('Respuesta del servidor de destino: ', response.data);
        }catch (error) {
            message = 'error'
            console.error('Error al enviar a equal: ', error);
        }
        return message;
    }

    async getLastEventEalloraDevices(){
        // obtener el ultimo evento conocido del dispositivo
    }
    async publishDataEallora(payload){
        let message = '';
        console.log('payload', payload);
        const { id, time, seqNumber, data } = payload;
        const decodedMessage = await this.decodedMessageDeviceTypeVoltForEallora( data, id, time, seqNumber );
        console.log('decodedMessage', JSON.stringify(decodedMessage));
        console.log('status message -----', decodedMessage.status);
        if (decodedMessage.status === 0 || decodedMessage.status === 1) {
            try {
                const response = await axios.post(this.urlEalloraPROD, decodedMessage);
                message = 'success'
                console.log('Respuesta del servidor de destino: ', response.data);
            }catch (error) {
                message = 'error'
                console.error('Error al enviar a equal: ', error.message);
            }
        }else{
            message = 'el evento no se envia a eallora';
        }
        return message;
    }
    
}