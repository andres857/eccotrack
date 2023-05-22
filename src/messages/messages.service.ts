import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { messageDocument, Message } from './schema/message.schema'

@Injectable()
export class MessagesService {
    constructor(@InjectModel(Message.name) private messageModel:Model<messageDocument>){}

    async create(payload: any) {        
        const data = await this.messageModel.create(payload);
        return data;
    }

    async getMessagesByIdDevice(idDevice){
        const messages = await this.messageModel
        .find({ device: idDevice })
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();
        return messages;
    }
}
