import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type messageDocument = HydratedDocument<Message>;

interface ComputedLocation {
  lat: number;
  lng: number;
  radius: number;
  source: number;
  status: number;
}

@Schema({ timestamps: true })
export class Message {
  @Prop()
  device: string;
  
  @Prop()
  time: number;
  
  @Prop()
  seqNumber: number;

  @Prop()
  lqi: string;
  
  @Prop()
  linkQuality: string;

  @Prop()
  operatorName: string;

  @Prop()
  countryCode: string;

  @Prop()
  deviceTypeId: string;

  @Prop()
  data: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  computedLocation: ComputedLocation;
}

// Schema para los dispositivos tipo Volt
@Schema({ timestamps: true })
export class VoltMessage {
  @Prop()
  id: string;
  
  @Prop()
  time: string;
  
  @Prop()
  seqNumber: string;

  @Prop()
  data: string;

  @Prop()
  status: string;
}


export const messageSchema = SchemaFactory.createForClass(Message);
export const payloadSchema = SchemaFactory.createForClass(VoltMessage);
