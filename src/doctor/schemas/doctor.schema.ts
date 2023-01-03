import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { doctor_schedule } from '../doctor-schedule/schema/schedule.schema';

export type doctorDocument = doctor & Document;

@Schema()
export class doctor {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    dateOfBirth: Date;

    @Prop({ required: true })
    degree: string;

    @Prop({ required: true })
    speciality: string;

    @Prop({ required: true })
    status: boolean;
    
    @Prop()
    image: string;

    @Prop({required: true, type: Types.ObjectId, ref: 'user'})
    user: string;
  
}

export const doctorSchema = SchemaFactory.createForClass(doctor);