import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {MessagesService} from './messages.service'

@Controller('/api/messages')
export class MessagesController {
    constructor( private messageService: MessagesService ){}
    
    @Get(':idDevice')
    async getMessagesByIdDevice( @Param('idDevice') idDevice: string){        
        const messages = await this.messageService.getMessagesByIdDevice(idDevice);
        return messages
    }
}