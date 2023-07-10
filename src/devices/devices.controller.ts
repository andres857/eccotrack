import { Controller, Get, Query,Param, Put, UseGuards, Req } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { AuthGuard } from '@nestjs/passport';
import { Request} from 'express';

@UseGuards(AuthGuard('local'))
@Controller('devices')
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
        console.log('getequalDevices ------- request --------');
        return await this.devicesService.getEqualDevices(); 
    }
    @Get('equal/messages/:id')
    async getEqualMessages(@Param('id') id:string){
        const messages = await this.devicesService.getEqualMessages(id);
        return messages;
    }
    @Get('airnex')
    async getAirnexDevices(){
        console.log('getAirnexDevices ------- request --------');
        
        const { data } = await this.devicesService.getAirnexDevices(); 
        return data;
    }
    @Get('airnex/messages/:id')
    async getAirnexMessages(@Param('id') id:string){
        const messages = await this.devicesService.getAirnexMessages(id);
        return messages;
    }

    @Get('cfl')
    async getCFLDevices(){
        console.log('getCFLDevices ------- request --------');
        return await this.devicesService.getCFLDevices(); 
    }
    @Get('cfl/messages/:id')
    async getCFLMessages(@Param('id') id:string){
        const messages = await this.devicesService.getCFLMessages(id);
        return messages;
    }

    @Get('acciona')
    async getAccionaDevicesdb(@Req() request: Request){
        console.log('getAcciona Devices ------- request --------');
        const { username, password } = request.body;
        console.log('Username:', username);
        console.log('Password:', password);
        const data  = await this.devicesService.getDevicesdb(); 
        return data;
    }

    @Put('acciona/update')
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