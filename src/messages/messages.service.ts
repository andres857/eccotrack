import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose'
import {messageDocument, Message} from './schema/message.schema'

@Injectable()
export class MessagesService {
    constructor(@InjectModel(Message.name) private messageModel:Model<messageDocument>){}

    async create(payload: any) {
        const data = await this.messageModel.create(payload);
        console.log(data);
        return data;
    }
}
