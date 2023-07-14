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

// Maneja el payload de Sigfox
@Schema({ timestamps: true })
export class PayloadVoltEallora {
  @Prop()
  id: string;
  
  @Prop()
  time: string;
  
  @Prop()
  seqNumber: string;

  @Prop()
  data: string;
}

export const messageSchema = SchemaFactory.createForClass(Message);
export const payloadSchema = SchemaFactory.createForClass(PayloadVoltEallora);
