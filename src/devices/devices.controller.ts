import { Controller, Get, Query,Param, Put } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('/api/devices')
export class DevicesController {
    constructor( private devicesService: DevicesService ){}
    
    // @Get()
    // async getAllDevicesFromSigFox(){
    //     const devices = await this.devicesService.getDevicesSigFox();
    //     return devices.data;
    // }

    @Get()
    async getAllDevices(){
        return await this.devicesService.getDevices();
    }
    @Put('update')
    async updateDevicesFromSigFox(){
        const devices = await this.devicesService.updateListDevices();
        return devices;
    }
    @Get(':id')
    async getDeviceId(@Param('id') id:string){
        const device = await this.devicesService.getDeviceById(id);
        return device;
    }
    @Get(':id/message')
    async getMessageByDevice(@Param('id') id:string){
        const message = await this.devicesService.messageById(id);
        return message.data;
    }
}