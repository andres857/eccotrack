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
    async updateDevice(device){        
        const exist = await this.deviceExist(device.id);
        if (!exist){
            return await this.deviceModel.create(device);
        }
    }
    async updateDevices(){
        const { data } = await this.getDevicesSigFox();
        let devicesAdd = [];
        await Promise.all( data.map(async device =>{
             const deviceAdd = await this.updateDevice( device );
             devicesAdd.push(deviceAdd);
        }))
        return devicesAdd;
    }
    async messageById(id){
        return await this.sigFoxService.getMessageByIdDevice(id);
    }
}
