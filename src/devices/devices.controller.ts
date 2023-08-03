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

    @Get('ligabue')
    async getLigabueDevices(){
        console.log('getLigabueDevices ------- request --------');
        return await this.devicesService.getLigabueDevices();
    }
    @Get('ligabue/messages/:id')
    async getLigabueMessages(@Param('id') id:string){
        const messages = await this.devicesService.getLigabueMessages(id);
        return messages;
    }

    @Get('francois')
    async getFrancoisDevices(){
        console.log('getFrancoisDevices ------- request --------');
        return await this.devicesService.getFrancoisDevices();
    }
    @Get('francois/messages/:id')
    async getFrancoisMessages(@Param('id') id:string){
        const messages = await this.devicesService.getFrancoisMessages(id);
        return messages;
    }

    @Get('Stefano')
    async getStefanoDevices(){
        console.log('getStefanoDevices ------- request --------');
        return await this.devicesService.getStefanoDevices();
    }
    @Get('Stefano/messages/:id')
    async getStefanoMessages(@Param('id') id:string){
        const messages = await this.devicesService.getStefanoMessages(id);
        return messages;
    }

    @Get('Fernando')
    async getFernandoDevices(){
        console.log('getFernandoDevices ------- request --------');
        return await this.devicesService.getFernandoDevices();
    }

    @Get('Fernando/messages/:id')
    async getFernandoMessages(@Param('id') id:string){
        const messages = await this.devicesService.getFernandoMessages(id);
        return messages;
    }

    @Get('Paolo')
    async getPaoloDevices(){
        console.log('getPaoloDevices ------- request --------');
        return await this.devicesService.getPaoloDevices();
    }

    @Get('Paolo/messages/:id')
    async getPaoloMessages(@Param('id') id:string){
        const messages = await this.devicesService.getPaoloMessages(id);
        return messages;
    }

    @Get('Jose')
    async getJoseDevices(){
        console.log('getJoseDevices ------- request --------');
        return await this.devicesService.getJoseDevices();
    }

    @Get('Jose/messages/:id')
    async getJoseMessages(@Param('id') id:string){
        const messages = await this.devicesService.getJoseMessages(id);
        return messages;
    }
    
    @Get('Telenext')
    async getTelenextDevices(){
        console.log('getTelenextDevices ------- request --------');
        return await this.devicesService.getTelenextDevices();
    }
    @Get('Telenext/messages/:id')
    async getTelenextMessages(@Param('id') id:string){
        const messages = await this.devicesService.getTelenextMessages(id);
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