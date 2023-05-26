require('dotenv').config();
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { MessagesService } from '../messages/messages.service';
import { SharedService } from 'src/shared-module/shared-module.service';
import { VoltService } from 'src/volt/volt.service';

@Injectable()
export class SigfoxService {
    private userSigFox: string;
    private passSigfox: string;

    constructor( 
        private messageService: MessagesService,
        private sharedService: SharedService,
        private voltService: VoltService,
    ){
        this.userSigFox = process.env.USERNAME;
        this.passSigfox = process.env.PASSWORD;
    }
    //get all devices 
    async getAll(){
        const devices = await axios.get('https://api.sigfox.com/v2/devices', {
            auth:{
                username: this.userSigFox,
                password: this.passSigfox,
            }
        })
        return devices.data;
    }
    async getLocationByIdDevice(id){
        const location = await axios.get(`https://api.sigfox.com/v2/devices/${id}/locations`, {
            auth: {
              username: this.userSigFox,
              password: this.passSigfox
            },
          });
        return location.data;
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
        const dataUpdate = await this.sharedService.updateLastSeenOnDevices(payload);
        console.log(newMessage);

        console.log('data-update');
        console.log(dataUpdate);
        console.log('data-update/');
        
        return newMessage;
    }

    async saveDataFromCallBackVolt(payload: any) {
        return await this.voltService.create(payload);
    }
}
