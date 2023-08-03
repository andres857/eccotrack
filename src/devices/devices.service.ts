import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceDocument, Device } from './schema/device.schema';
import { SigfoxService } from '../sigfox/sigfox.service';

@Injectable()
export class DevicesService {
    constructor( @InjectModel(Device.name) private deviceModel:Model<DeviceDocument>,
    private sigFoxService:SigfoxService ){}

    async decodedMessagesDeviceTypeVolt(messages){
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
        
        const decodedMessages = messages.map( message => {
            let eventDeviceOn;
            // calcula el porcentaje de batería
            const batteryCoded = message.data.slice(-2);
            const battery = ((parseInt(batteryCoded, 16) * 0.05) + 1.45).toFixed(2);
            const batteryNumeric = parseFloat(battery); // Convertir a número
            const batteryPorcentaje = ( batteryNumeric / 3) * 100;
            
            // calcula la temperatura
            const temperatureCoded = message.data.slice(-6, -2);
            const temperatureDecimal = parseInt(temperatureCoded, 16);
            const temperature = (temperatureDecimal / 10) -5;

            const dataEventOn = message.data.slice( 5, -7 );
            
            if ( dataEventOn === '00000000') {                
                eventDeviceOn = {
                    name: 'deviceOn',
                    pattern: 'c5c9900000000',
                    typeAlert: "on",
                }
            }else {
                eventDeviceOn = null;
            }
            const data = message.data.slice( 0, 5 );
            const statusDevice = eventDevices.find( status => status.pattern === data) || { name: 'unknown', typeAlert: "unknown" }; 
            return {
                id: message.id,
                typeAlert: eventDeviceOn === null ? statusDevice.typeAlert : eventDeviceOn.typeAlert,
                time: message.time,
                battery: parseFloat(batteryPorcentaje.toFixed(0)),
                temperature: parseFloat(temperature.toFixed(2)),
                iskeepAlive: statusDevice.name === 'keepAlive' ? 1 : 0,
                status: 1
            }
        });
        return decodedMessages;
    }

    // volt shop-online devices
    async getShopOnlineDevices(){
        return await this.sigFoxService.getDevicesShopOnline();
    }
    async getShopOnlineMessages(id){
        try {
            const { data } = await this.sigFoxService.getMessageShopOnline(id);        
            const messages = data.data.map( message => {
                return {
                    id: message.device.id,
                    time: message.time,
                    data: message.data,
                    seqNumber: message.seqNumber,
                    lqi: message.lqi
                }
            });
            const decodedmessages = await this.decodedMessagesDeviceTypeVolt(messages);
            return decodedmessages;
        } catch (error) {
            console.log(error);
        }
    }

    // VOLT Ligabue devices
    async getLigabueDevices(){
        return await this.sigFoxService.getDevicesLigabue();
    }
    
    async getLigabueMessages(id){
        const { data } = await this.sigFoxService.getMessageLigabue(id);
        const messages = data.data.map( message => {
            return {
                id: message.device.id,
                time: message.time,
                data: message.data,
                seqNumber: message.seqNumber,
                lqi: message.lqi
            }
        });
        const decodedmessages = await this.decodedMessagesDeviceTypeVolt(messages);
        return decodedmessages;
    }

    // Volt Francois devices
    async getFrancoisDevices(){
        return await this.sigFoxService.getDevicesFrancois();
    }

    async getFrancoisMessages(id){
        const { data } = await this.sigFoxService.getMessageFrancois(id);
        const messages = data.data.map( message => {
            return {
                id: message.device.id,
                time: message.time,
                data: message.data,
                seqNumber: message.seqNumber,
                lqi: message.lqi
            }
        });
        const decodedmessages = await this.decodedMessagesDeviceTypeVolt(messages);
        return decodedmessages;
    }

    //  Volt Fernando Agrasar devices
    async getFernandoDevices(){
        return await this.sigFoxService.getDevicesFernando();
    }

    async getFernandoMessages(id){
        const { data } = await this.sigFoxService.getMessageFernando(id);
        const messages = data.data.map( message => {
            return {
                id: message.device.id,
                time: message.time,
                data: message.data,
                seqNumber: message.seqNumber,
                lqi: message.lqi
            }
        });
        const decodedmessages = await this.decodedMessagesDeviceTypeVolt(messages);
        return decodedmessages;
    }
    
    // Volt Paolo Borghetti devices
    async getPaoloDevices(){
        return await this.sigFoxService.getDevicesPaolo();
    }

    async getPaoloMessages(id){
        const { data } = await this.sigFoxService.getMessagePaolo(id);
        const messages = data.data.map( message => {
            return {
                id: message.device.id,
                time: message.time,
                data: message.data,
                seqNumber: message.seqNumber,
                lqi: message.lqi
            }
        });
        const decodedmessages = await this.decodedMessagesDeviceTypeVolt(messages);
        return decodedmessages;
    }
    

    // Volt José Marey devices
    async getJoseDevices(){
        return await this.sigFoxService.getDevicesJose();
    }

    async getJoseMessages(id){
        const { data } = await this.sigFoxService.getMessageJose(id);
        const messages = data.data.map( message => {
            return {
                id: message.device.id,
                time: message.time,
                data: message.data,
                seqNumber: message.seqNumber,
                lqi: message.lqi
            }
        });
        const decodedmessages = await this.decodedMessagesDeviceTypeVolt(messages);
        return decodedmessages;
    }
    

    // Volt Stefano devices
    async getStefanoDevices(){
        return await this.sigFoxService.getDevicesStefano();
    }

    async getStefanoMessages(id){
        const { data } = await this.sigFoxService.getMessageStefano(id);
        const messages = data.data.map( message => {
            return {
                id: message.device.id,
                time: message.time,
                data: message.data,
                seqNumber: message.seqNumber,
                lqi: message.lqi
            }
        });
        const decodedmessages = await this.decodedMessagesDeviceTypeVolt(messages);
        return decodedmessages;
    }

    // Volt Telenext devices
    async getTelenextDevices(){
        return await this.sigFoxService.getDevicesTelenext();
    }

    async getTelenextMessages(id){
        const { data } = await this.sigFoxService.getMessageTelenext(id);
        const messages = data.data.map( message => {
            return {
                id: message.device.id,
                time: message.time,
                data: message.data,
                seqNumber: message.seqNumber,
                lqi: message.lqi
            }
        });
        const decodedmessages = await this.decodedMessagesDeviceTypeVolt(messages);
        return decodedmessages;
    }

    // volt equal devices
    async getEqualDevices(){
        const devices = await this.sigFoxService.getDevicesEqual();
        return devices;
    }
    async getEqualMessages(id){
        const { data } = await this.sigFoxService.getMessageEqual(id);                
        const messages = data.data.map( message => {
            return {
                id: message.device.id,
                time: message.time,
                data: message.data,
                seqNumber: message.seqNumber,
                lqi: message.lqi
            }
        });
        const decodedmessages = await this.decodedMessagesDeviceTypeVolt(messages);
        return decodedmessages;
    }

    // volt AIRNEX devices
    async getAirnexDevices(){
        return await this.sigFoxService.getDevicesAIRNEX();
    }
    async getAirnexMessages(id){
        const { data } = await this.sigFoxService.getMessageAIRNEX(id);        
        const messages = data.data.map( message => {
            return {
                id: message.device.id,
                time: message.time,
                data: message.data,
                seqNumber: message.seqNumber,
                lqi: message.lqi
            }
        });
        const decodedmessages = await this.decodedMessagesDeviceTypeVolt(messages);
        return decodedmessages;
    }

    // volt CFL devices
    async getCFLDevices(){
        const devices = await this.sigFoxService.getDevicesCFL();
        return devices;
    }
    async getCFLMessages(id){
        const { data } = await this.sigFoxService.getMessageCFL(id);        
        const messages = data.data.map( message => {
            return {
                id: message.device.id,
                time: message.time,
                data: message.data,
                seqNumber: message.seqNumber,
                lqi: message.lqi
            }
        });
        const decodedmessages = await this.decodedMessagesDeviceTypeVolt(messages);
        return decodedmessages;
    }

    // eccotrack ACCIONA devices
    async getAccionaDevices(){
        // request to sigfox API
        return await this.sigFoxService.getAccionaDevices();
    }
    async getDevicesdb(){
        // request db system
        return await this.deviceModel.find({});
    }
    async getDeviceById(idDevice){
        return await this.deviceModel.find({ id: idDevice });
    }
    async deviceExist(idDevice) {
        const existingDevice = await this.deviceModel.findOne({ id: idDevice }).exec();
        return !!existingDevice;
    }
    async updateLastSeenOnDevices(payload){
        const exist = await this.deviceExist(payload.device);
        if (exist){
            await this.deviceModel.updateOne({
                id: payload.device
            },{
                $set:{
                    lastComputedLocation: payload.computedLocation
                }
            })
        }
    }
    async updateDevice(device){        
        const exist = await this.deviceExist(device.id);
        if (!exist){
            return await this.deviceModel.create(device);
        }
    }
    async updateListDevices(){
        const { data } = await this.getAccionaDevices();
        const devices = await this.getDevicesdb();

        if (data.length !== devices.length){
            await Promise.all( data.map(async device =>{
                await this.updateDevice( device );
            }))
            return await this.getDevicesdb();
        }else{
            return ''
        }
    }
    async messageById(id){
        return await this.sigFoxService.getMessageByIdDevice(id);
    }
}