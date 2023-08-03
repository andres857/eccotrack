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
    private userSigFoxLigabue: string;
    private passSigfoxLigabue: string;
    private userSigFoxFRANCOIS: string;
    private passSigfoxFRANCOIS: string;
    private userSigFoxSTEFANO: string;
    private passSigfoxSTEFANO: string;
    private userSigfoxTELENEXT: string;
    private passSigfoxTELENEXT: string;
    private usserSigfoxJOSE: string;
    private passSigfoxJOSE: string;
    private userSigFoxFERNANDO: string;
    private passSigfoxFERNANDO: string;
    private userSigFoxPAOLO: string;
    private passSigfoxPAOLO: string;
    

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
        this.userSigFoxLigabue = process.env.USERNAMELIGABUE;
        this.passSigfoxLigabue = process.env.PASSWORDLIGABUE;
        this.userSigFoxFRANCOIS = process.env.USERNAMEFRANCOIS;
        this.passSigfoxFRANCOIS = process.env.PASSWORDFRANCOIS;
        this.userSigFoxSTEFANO = process.env.USERNAMESTEFANO;
        this.passSigfoxSTEFANO = process.env.PASSWORDSTEFANO;
        this.userSigfoxTELENEXT = process.env.USERNAMETELENEXT;
        this.passSigfoxTELENEXT = process.env.PASSWORDTELENEXT;
        this.usserSigfoxJOSE = process.env.USERNAMEJOSE;
        this.passSigfoxJOSE = process.env.PASSWORDJOSE;
        this.userSigFoxFERNANDO = process.env.USERNAMEFERNANDO;
        this.passSigfoxFERNANDO = process.env.PASSWORDFERNANDO;
        this.userSigFoxPAOLO = process.env.USERNAMEPAOLO;
        this.passSigfoxPAOLO = process.env.PASSWORDPAOLO;
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

    // DEVICES TYPE - VOLT Fernando Agrasar
    async getDevicesFernando(){
        try {
            const { data } = await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFoxFERNANDO,
                    password: this.passSigfoxFERNANDO,
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

    async getMessageFernando(id){
        try {
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
                auth:{
                    username: this.userSigFoxFERNANDO,
                    password: this.passSigfoxFERNANDO,
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
    
    // Devices type - VOLT José Marey
    async getDevicesJose(){
        try {
            const { data } = await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.usserSigfoxJOSE,
                    password: this.passSigfoxJOSE,
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
    
    async getMessageJose(id){
        try {
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
                auth:{
                    username: this.usserSigfoxJOSE,
                    password: this.passSigfoxJOSE,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }


    //  DEVICES TYPE - VOLT Sig. Ligabue
    async getDevicesLigabue(){
        try {
            const { data } = await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFoxLigabue,
                    password: this.passSigfoxLigabue,
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

    async getMessageLigabue(id){
        try {
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
                auth:{
                    username: this.userSigFoxLigabue,
                    password: this.passSigfoxLigabue,
                }
            });
        } catch (error) {            
            console.log(error.message);
            return error;
        }
    }

    // DEVICES TYPE - VOLT Sig. Paolo Borghetti
    async getDevicesPaolo(){
        try {
            const { data } = await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFoxPAOLO,
                    password: this.passSigfoxPAOLO,
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

    async getMessagePaolo(id){
        try {
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
                auth:{
                    username: this.userSigFoxPAOLO,
                    password: this.passSigfoxPAOLO,
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    // DEVICES TYPE - VOLT Sig. Francois
    async getDevicesFrancois(){
        try {
            const { data } = await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFoxFRANCOIS,
                    password: this.passSigfoxFRANCOIS,
                }
            });
            const devices = data.data.map( item =>{
                return {
                    id: item.id,
                    name: item.name,
                    comState: item.comState,
                    lqi: item.lqi,
                }
            });
            return devices;
        } catch (error) {
            console.error(error);
        }
    }

    async getMessageFrancois(id){
        try {
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
                auth:{
                    username: this.userSigFoxFRANCOIS,
                    password: this.passSigfoxFRANCOIS,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    // DEVICES TYPE - VOLT Sig. Stefano
    async getDevicesStefano(){
        try {
            const { data } = await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFoxSTEFANO,
                    password: this.passSigfoxSTEFANO,
                }
            });
            const devices = data.data.map( item =>{
                return {
                    id: item.id,
                    name: item.name,
                    comState: item.comState,
                    lqi: item.lqi,
                }
            });
            return devices;
        } catch (error) {
            console.error(error);
        }
    }

    async getMessageStefano(id){
        try {
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
                auth:{
                    username: this.userSigFoxSTEFANO,
                    password: this.passSigfoxSTEFANO,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    // DEVICES TYPE - VOLT Sig. Telenext
    async getDevicesTelenext(){
        try{
            const { data } = await axios.get('https://api.sigfox.com/v2/devices', {
                auth: {
                    username: this.userSigfoxTELENEXT,
                    password: this.passSigfoxTELENEXT,
                }
            });
            const devices = data.data.map( item =>{
                return {
                    id: item.id,
                    name: item.name,
                    comState: item.comState,
                    lqi: item.lqi,
                }
            });
            return devices;
        }
        catch(error){
            console.error(error);
        }
    }

    async getMessageTelenext(id){
        try{
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
                auth: {
                    username: this.userSigfoxTELENEXT,
                    password: this.passSigfoxTELENEXT,
                }
            });
        }
        catch(error){
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
        // console.log(newMessage);
        console.log('data-update');
        // console.log(dataUpdate);
        console.log('data-update/');
        // return newMessage;
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
        
        // const battery = ((parseInt(batteryCoded, 16) * 0.05) + 1.45).toFixed(2);
        
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