import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true })
export class Client {
  
  @Prop({ required: true, unique: true })
  name: string;

  @Prop([{ // Agregar un arreglo de contactos
    name: String,
    lastname: String,
    position: String,
    area: String,
    email: String,
    phone: String,
  }])
  contact: Contact[];
}

interface Contact {
  name: string;
  lastname: string;
  position: string;
  area: string;
  email: string;
  phone: string;
}

export const clientSchema = SchemaFactory.createForClass(Client);