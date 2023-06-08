import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceDocument, Device } from '../devices/schema/device.schema';

@Injectable()
export class SharedService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async updateLastSeenOnDevices(payload){
    const existingDevice = await this.deviceModel.findOne({ id: payload.device }).exec();
    console.log('------updateTime---------');
    console.log(existingDevice);
    console.log('-------updateTime--------');
    if (existingDevice){
      const dataUpdated = await this.deviceModel.updateOne(
        { id: payload.device },
        { $set: { 
          lastComputedLocation: payload.computedLocation,
          lastCom: payload.time * 1000
          }
        },
      );
      console.log(dataUpdated);
      return dataUpdated;
    }
  }
}
