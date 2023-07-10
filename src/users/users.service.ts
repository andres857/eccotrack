import { Injectable,ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { UserDocument, User } from './schema/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async findUserByName(name: string){
        const userFound = await this.userModel.findOne({ name }).exec();
        return userFound;
    }
    async findByEmail(email: string){
        const userFound = await this.userModel.findOne({ email }).exec();
        return userFound;
    }

    async create(payload:any){
        payload.name = payload.name.toLowerCase()
        const user = await this.findUserByName(payload.name)
        if (!user){
            payload.password = await bcrypt.hash(payload.password,10);
            const newUser = await this.userModel.create(payload);
            const { password, ...rta } = newUser.toJSON();
            return rta;
        }
        throw new ConflictException(`El cliente ${payload} ya existe`)
    }

    async findAll(){
        const users = await this.userModel.find({});
        return users;
    }
}