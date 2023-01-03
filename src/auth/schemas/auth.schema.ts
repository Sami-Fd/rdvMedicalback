import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type authDocument = auth & Document;

@Schema()
export class auth {
  @Prop()
  email: {
    type: String,
    unique: true 
  };

  @Prop()
  password: string;
  
}

export const authSchema = SchemaFactory.createForClass(auth);