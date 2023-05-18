import { Injectable } from '@nestjs/common';
import { MessagesService } from '../messages/messages.service'
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SigfoxService {
    constructor( private messageService: MessagesService ){}

    async saveDataFromCallBack(payload: any) {
        const data = await this.messageService.create(payload);
        return data;
    }
}
