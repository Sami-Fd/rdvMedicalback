import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type patientDocument = patient & Document;

@Schema()
export class patient {
    @Prop({ required: true , unique: true})
    email: string;

    @Prop({ required: true, select: false})
    password: string;

    @Prop({ required: true })
    first_name: string;
    
    @Prop({ required: true })
    last_name: string;

    @Prop({ required: true })
    phone: string;
    
    @Prop({ required: true })
    gender: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    dateOfBirth: Date;
    
    @Prop()
    image: string;

    @Prop({required: true, type: Types.ObjectId, ref: 'user'})
    user: string;
  
}

export const patientSchema = SchemaFactory.createForClass(patient);