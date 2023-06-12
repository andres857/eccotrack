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
    private userSigFoxVOLT: string;
    private passSigfoxVOLT: string;
    private userSigFoxEQUAL: string;
    private passSigfoxEQUAL: string;

    constructor( 
        private messageService: MessagesService,
        private sharedService: SharedService,
        private voltService: VoltService,
    ){
        this.userSigFox = process.env.USERNAME;
        this.passSigfox = process.env.PASSWORD;
        this.userSigFoxVOLT = process.env.USERNAMEVOLT;
        this.passSigfoxVOLT = process.env.PASSWORDVOLT;
        this.userSigFoxEQUAL = process.env.USERNAMEEQUAL;
        this.passSigfoxEQUAL = process.env.PASSWORDEQUAL;
    }
    // DEVICES TYPE - VOLT equal
    async getDevicesEqual(){
        try {
            return await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFoxEQUAL,
                    password: this.passSigfoxEQUAL,
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
    async getMessageEqual(id){
        try {
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
                auth:{
                    username: this.userSigFoxEQUAL,
                    password: this.passSigfoxEQUAL,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    // DEVICES TYPE - VOLT shop-online
    async getDevicesShopOnline(){
        try {
            return await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFoxVOLT,
                    password: this.passSigfoxVOLT,
                }
            });
        } catch (error) {
            console.log('hola mundo');
            console.error(error);
        }
    }
    async getMessageShopOnline(id){
        try {
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/messages`, {
                auth:{
                    username: this.userSigFoxVOLT,
                    password: this.passSigfoxVOLT,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    // async getDeviceTypes(){
    //     try {
    //         return await axios.get(`https://api.sigfox.com/v2/device-types`, {
    //             auth:{
    //                 username: this.userSigFoxVOLT,
    //                 password: this.passSigfoxVOLT,
    //             }
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    //get all devices Eccotrack
    async getAll(){
        try {
            return await axios.get('https://api.sigfox.com/v2/devices', {
                auth:{
                    username: this.userSigFox,
                    password: this.passSigfox,
                }
            });
        } catch (error) {
            console.log('hola mundo');
            console.error(error);
        }
    }

    async getLocationByIdDevice(id){
        try {
            return await axios.get(`https://api.sigfox.com/v2/devices/${id}/locations`, {
                auth: {
                  username: this.userSigFox,
                  password: this.passSigfox
                },
              });
        } catch (error) {
            console.log('hoal das');
            console.log(error);      
        }

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
