import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceDocument, Device } from './schema/device.schema';
import { SigfoxService } from '../sigfox/sigfox.service';
import { log } from 'console';

@Injectable()
export class DevicesService {
    constructor( @InjectModel(Device.name) private deviceModel:Model<DeviceDocument>,
    private sigFoxService:SigfoxService ){}

    async decodeDeviceTypeVoltMessages(messages){
        let statusDevices = [
            {
                name: 'keepAlive',
                pattern: 'c5c90',
            },
            {
                name: 'keepAlive',
                pattern: 'c5c99010',
            },
            {
                name: 'powerOn',
                pattern: 'c5c98',
            },
            {
                name: 'powerOff',  
                pattern: 'c5c99',
            },
            {
                name: 'deviceOn',
                pattern: 'c5c99000',
            },
            {
                name: 'deviceOn',
                pattern: 'c5c98000',
            }
        ];
        const decodedMessages = messages.map( message => {
            const data = ( message.data[7] !== '0' ) ? message.data.slice(0, 5) : message.data.slice(0, 8);
            if ( data.length === 8 ) {
                const status = statusDevices.find( status => status.pattern === data ); 
                return {
                    id: message.id,
                    time: message.time,
                    data: message.data,
                    seqNumber: message.seqNumber,
                    lqi: message.lqi,
                    status: status.name
                }
            }else{
                const status = statusDevices.find( status => status.pattern === data ); 
                return {
                    id: message.id,
                    time: message.time,
                    data: message.data,
                    seqNumber: message.seqNumber,
                    lqi: message.lqi,
                    status: status.name
                }
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
            const decodedmessages = await this.decodeDeviceTypeVoltMessages(messages);
            return decodedmessages;
        } catch (error) {
            console.log(error);
        }
        
        // return decodedmessages;
    }
    // volt equal devices
    async getEqualDevices(){
        return await this.sigFoxService.getDevicesEqual();
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
        const decodedmessages = await this.decodeDeviceTypeVoltMessages(messages);
        return decodedmessages;
    }

    // eccotrack devices
    async getDevicesSigFox(){
        return await this.sigFoxService.getAll();
    }
    async getDevices(){
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
        const { data } = await this.getDevicesSigFox();
        const devices = await this.getDevices();

        if (data.length !== devices.length){
            await Promise.all( data.map(async device =>{
                await this.updateDevice( device );
            }))
            return await this.getDevices();
        }else{
            return ''
        }
    }
    async messageById(id){
        return await this.sigFoxService.getMessageByIdDevice(id);
    }
}
