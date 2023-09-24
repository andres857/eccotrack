import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceDocument, Device } from './schema/device.schema';
import { SigfoxService } from '../sigfox/sigfox.service';

@Injectable()
export class DevicesService {
    constructor( @InjectModel(Device.name) private deviceModel:Model<DeviceDocument>,
    private sigFoxService:SigfoxService ){}
    // async decodedMessagesDeviceTypeVolt(messages){
    //     const eventDevices = [
    //         {
    //             name: 'keepAlive',
    //             typeAlert: "keepAlive",
    //             pattern: 'c5c90',
    //         },
    //         {
    //             name: 'powerOn',
    //             typeAlert: "up",
    //             pattern: 'c5c98',
    //         },
    //         {
    //             name: 'powerOff',
    //             pattern: 'c5c99',
    //             typeAlert: "down",
    //         }
    //     ];
        
    //     const decodedMessages = messages.map( message => {
    //         let eventDeviceOn;
    //         // calcula el porcentaje de batería
    //         const batteryCoded = message.data.slice(-2);
    //         const battery = ((parseInt(batteryCoded, 16) * 0.05) + 1.45).toFixed(2);
    //         const batteryNumeric = parseFloat(battery); // Convertir a número
    //         const batteryPorcentaje = ( batteryNumeric / 3) * 100;
            
    //         // calcula la temperatura
    //         const temperatureCoded = message.data.slice(-6, -2);
    //         const temperatureDecimal = parseInt(temperatureCoded, 16);
    //         const temperature = (temperatureDecimal / 10) -5;

    //         const dataEventOn = message.data.slice( 5, -7 );
            
    //         if ( dataEventOn === '00000000') {                
    //             eventDeviceOn = {
    //                 name: 'deviceOn',
    //                 pattern: 'c5c9900000000',
    //                 typeAlert: "on",
    //             }
    //         }else {
    //             eventDeviceOn = null;
    //         }
    //         const data = message.data.slice( 0, 5 );
    //         const statusDevice = eventDevices.find( status => status.pattern === data) || { name: 'unknown', typeAlert: "unknown" }; 
    //         return {
    //             id: message.id,
    //             typeAlert: eventDeviceOn === null ? statusDevice.typeAlert : eventDeviceOn.typeAlert,
    //             time: message.time,
    //             battery: parseFloat(batteryPorcentaje.toFixed(0)),
    //             temperature: parseFloat(temperature.toFixed(2)),
    //             iskeepAlive: statusDevice.name === 'keepAlive' ? 1 : 0,
    //             status: 1
    //         }
    //     });
    //     return decodedMessages;
    // }
    // async getDevicesdb(){
    //     // request db system
    //     return await this.deviceModel.find({});
    // }
    // async getDeviceById(idDevice){
    //     return await this.deviceModel.find({ id: idDevice });
    // }
    // async deviceExist(idDevice) {
    //     const existingDevice = await this.deviceModel.findOne({ id: idDevice }).exec();
    //     return !!existingDevice;
    // }
    // async updateLastSeenOnDevices(payload){
    //     const exist = await this.deviceExist(payload.device);
    //     if (exist){
    //         await this.deviceModel.updateOne({
    //             id: payload.device
    //         },{
    //             $set:{
    //                 lastComputedLocation: payload.computedLocation
    //             }
    //         })
    //     }
    // }
    // async updateDevice(device){        
    //     const exist = await this.deviceExist(device.id);
    //     if (!exist){
    //         return await this.deviceModel.create(device);
    //     }
    // }
    // async messageById(id){
    //     return await this.sigFoxService.getMessageByIdDevice(id);
    // }
}