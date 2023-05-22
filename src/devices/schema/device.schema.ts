import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type DeviceDocument = Document<Device>;

interface ComputedLocation {
  lat: number;
  lng: number;
  radius: number;
  sourceCode: number;
}

interface DeviceType {
  id: string;
}

interface Group {
  id: string;
}

interface Token {
  state: number;
  detailMessage: string;
  end: number;
}

interface Contract {
  id: string;
}

interface ModemCertificate {
  id: string;
}

@Schema({ timestamps: true })
export class Device {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  satelliteCapable: boolean;

  @Prop()
  repeater: boolean;

  @Prop()
  messageModulo: number;

  @Prop()
  sequenceNumber: number;

  @Prop()
  trashSequenceNumber: number;

  @Prop()
  lastCom: number;

  @Prop()
  state: number;

  @Prop()
  comState: number;

  @Prop()
  pac: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  lastComputedLocation: ComputedLocation;

  @Prop({ type: MongooseSchema.Types.Mixed })
  deviceType: DeviceType;

  @Prop({ type: MongooseSchema.Types.Mixed })
  group: Group;

  @Prop()
  lqi: number;

  @Prop()
  activationTime: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  token: Token;

  @Prop({ type: MongooseSchema.Types.Mixed })
  contract: Contract;

  @Prop()
  creationTime: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  modemCertificate: ModemCertificate;

  @Prop()
  prototype: boolean;

  @Prop()
  automaticRenewal: boolean;

  @Prop()
  automaticRenewalStatus: number;

  @Prop()
  createdBy: string;

  @Prop()
  lastEditionTime: number;

  @Prop()
  lastEditedBy: string;

  @Prop()
  activable: boolean;
}

export const deviceSchema = SchemaFactory.createForClass(Device);