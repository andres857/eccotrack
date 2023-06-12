import { Controller, Get, Query,Param, Put } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('/api/devices')
export class DevicesController {
    constructor( private devicesService: DevicesService ){}
    
    @Get('shop-online')
    async getShopOnlineDevices(){
        const { data } = await this.devicesService.getShopOnlineDevices();
        return data;
    }
    @Get('shop-online/messages/:id')
    async getShopOnlineMessages(@Param('id') id:string){
        const messages = await this.devicesService.getShopOnlineMessages(id);
        return messages;
    }
    @Get('equal')
    async getEqualDevices(){
        const { data } = await this.devicesService.getEqualDevices(); 
        return data;
    }
    @Get('equal/messages/:id')
    async getEqualMessages(@Param('id') id:string){
        const messages = await this.devicesService.getEqualMessages(id);
        return messages;
    }


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