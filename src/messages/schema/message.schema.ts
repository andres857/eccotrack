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
  data: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  computedLocation: ComputedLocation;
}

export const messageSchema = SchemaFactory.createForClass(Message);