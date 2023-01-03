import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { doctor_schedule } from 'src/doctor/doctor-schedule/schema/schedule.schema';

export type appointementDocument = appointement & Document;

@Schema()
export class appointement {

    @Prop({required: true, type: Types.ObjectId, ref: 'doctor'})
    doctor_id: string;

    @Prop({required: true, type: Types.ObjectId, ref: 'patient'})
    patient_id: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'doctor_schedule'})
    doctor_schedule_id: doctor_schedule;

    @Prop({ required: true })
    appointment_number: number;

    @Prop({ required: true })
    reason_for_appointment: string;

    @Prop({ required: true })
    appointment_time: Date;

    @Prop({ required: true })
    status: string;
    
    @Prop()
    patient_come_into_hospital: boolean;
    
    @Prop()
    doctor_comment: string; 
  
}

export const appointementSchema = SchemaFactory.createForClass(appointement);