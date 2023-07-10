import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true })
export class Client {
  @Prop()
  name?: string;

  @Prop({ type: { user: String, pass: String } })
  sigfox_auth?: {
    user?: string;
    pass?: string;
  };

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Users' }] })
  users?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Devices' }] })
  devices?: Types.ObjectId[];
}

export const clientSchema = SchemaFactory.createForClass(Client);