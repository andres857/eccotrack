import { Controller,Post, Body } from '@nestjs/common';
import {MessagesService} from './messages.service'

@Controller('messages')
export class MessagesController {
    constructor( private messageService: MessagesService ){}
    
    @Post()
    create(@Body() payload: any){
        const newClient = this.messageService.create(payload)
        return newClient
    }
}
