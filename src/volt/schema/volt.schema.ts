import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type voltDocument = HydratedDocument<Volt>;

@Schema({ timestamps: true })
export class Volt {
  @Prop()
  id: string;
  
  @Prop()
  time: string;
  
  @Prop()
  seqNumber: string;
  
  @Prop()
  data: string;
}

export const voltSchema = SchemaFactory.createForClass(Volt);
