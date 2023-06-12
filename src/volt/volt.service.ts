import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { voltDocument, Volt } from './schema/volt.schema';

@Injectable()
export class VoltService {
    constructor( @InjectModel(Volt.name) private messageModel:Model<voltDocument>){}

    async create( payload: any ) {   
        console.log( payload );
        return await this.messageModel.create(payload);
    }
    
}
