import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type locationDocument = HydratedDocument<Location>;

@Schema({ timestamps: true })
export class Location {
  @Prop()
  time: number;
  
  @Prop()
  valid: boolean;
  
  @Prop()
  lat: number;

  @Prop()
  lng: number;
  
  @Prop()
  radius: number;

  @Prop()
  source: number;
}

export const locationSchema = SchemaFactory.createForClass(Location);