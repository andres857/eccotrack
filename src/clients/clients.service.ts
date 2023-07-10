import { Injectable,ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose'
import { ClientDocument, Client } from './schema/client.schema'
import { CreateClientDto, UpdateClientDto } from './dto/create.client.dto'

@Injectable()
export class ClientsService {
    constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>){}

    async isClientValid(idClient: string): Promise<boolean> {
        return Types.ObjectId.isValid(idClient) ? true : false;
    }

    async exists(clientId: string): Promise<boolean> {
        const client = await this.clientModel.findById(clientId).exec();
        return !!client;
    }

    async create( payload:CreateClientDto ){
        payload.name = payload.name.toLowerCase()
        const client = await this.findClientByName(payload.name)
        if (!client){            
            const newClient = await this.clientModel.create(payload)
            console.log(newClient);
            return newClient
        }
        throw new ConflictException(`El cliente ${payload} ya existe`)
    }

    async findAll(){
        const clients = await this.clientModel.find({})
        return clients
    }

    async findClientByName(name: string){
        const clientFound = await this.clientModel.findOne({ name })
        return clientFound
    }

    async update(payload: UpdateClientDto){
        payload.name = payload.name.toLowerCase()
        const client = await this.findClientByName(payload.name)
        if (!client){            
            throw new Error('Client not found');
        }
        const rta = await this.clientModel.updateOne({"_id": client._id}, {$set: payload})
        const updatedClient = await this.clientModel.findOne({"_id": client._id})
        console.log(updatedClient);
        return {rta, updatedClient}
    }
    async addUserToClient(clientId: string, userId: string): Promise<Client> {
        const convertedClientID = new Types.ObjectId(clientId);
        const convertedUserID = new Types.ObjectId(userId);
        const userExistsOnClient = await this.clientModel.find({users: convertedUserID}).exec();
        
        if ( userExistsOnClient.length === 0 ){
            console.log('User does not exist on client, creating new user on client');
            const updatedClient = await this.clientModel.findByIdAndUpdate(
                convertedClientID,
                { $push: { users: convertedUserID } },
                { new: true }
              ).exec();
            return updatedClient;
        }else{
            throw new Error('User already exists on client');
        }
    }
    async delete(payload){
        payload.name = payload.name.toLowerCase()
        const client = await this.findClientByName(payload.name)
        if (!client){            
            throw new Error('Client not found');
        }
        const deleteClient = await this.clientModel.deleteOne({"_id": client._id})
        console.log(deleteClient);
        return deleteClient
    }
}