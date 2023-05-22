require('dotenv').config();
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { MessagesService } from '../messages/messages.service'
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SigfoxService {
    private userSigFox: string;
    private passSigfox: string;

    constructor( private messageService: MessagesService ){
        this.userSigFox = process.env.USERNAME;
        this.passSigfox = process.env.PASSWORD;
    }

    async getAll(){
        const devices = await axios.get('https://api.sigfox.com/v2/devices', {
            auth:{
                username: this.userSigFox,
                password: this.passSigfox,
            }
        })
        return devices.data;
    }

    async getMessageByIdDevice(id){
        const message = await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
            auth:{
                username: this.userSigFox,
                password: this.passSigfox,
            }
        });
        return message.data;
    }

    async saveDataFromCallBack(payload: any) {
        const newMessage = await this.messageService.create(payload);
        return newMessage;
    }
}
