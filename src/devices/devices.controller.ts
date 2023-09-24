import { Controller, Get, Query,Param, Put, UseGuards, Req } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('local'))
@Controller('devices')
export class DevicesController {
    constructor( private devicesService: DevicesService ){}
}