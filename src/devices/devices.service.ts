import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceDocument, Device } from './schema/device.schema';
import { SigfoxService } from '../sigfox/sigfox.service';

@Injectable()
export class DevicesService {
    constructor( @InjectModel(Device.name) private deviceModel:Model<DeviceDocument>,
    private sigFoxService:SigfoxService ){}
    
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
