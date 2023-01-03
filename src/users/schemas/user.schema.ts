import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type userDocument = user & Document;


@Schema()
export class user {
  @Prop({
    type: String,
    unique: true
  })
  email: any;

  @Prop({ required: true})
  password: string;
  
  @Prop()
  role: number;
  
}

export const userSchema = SchemaFactory.createForClass(user);