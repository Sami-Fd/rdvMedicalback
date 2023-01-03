import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { doctor } from 'src/doctor/schemas/doctor.schema';

export type doctor_scheduleDocument = doctor_schedule & Document;

@Schema()
export class doctor_schedule {
    @Prop({ required: true , type: Types.ObjectId, ref: 'doctor'})
    doctor_id: string;

    @Prop({ required: true })
    doctor_schedule_date: Date;

    @Prop({ required: true })
    doctor_schedule_start_time: Date;

    @Prop({ required: true })
    doctor_schedule_end_time: Date;

    @Prop({ required: true })
    average_consulting_time: number;

    @Prop({ required: true })
    doctor_schedule_status: boolean;
    
    @Prop()
    timeSlot: Array<object>;
  
}

export const doctor_scheduleSchema = SchemaFactory.createForClass(doctor_schedule);