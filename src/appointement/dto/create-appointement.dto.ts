import { IsNotEmpty } from "class-validator";
import { doctor_schedule } from "src/doctor/doctor-schedule/schema/schedule.schema";

export class CreateAppointementDto {
    
    @IsNotEmpty()
    doctor_id: string;

    @IsNotEmpty()
    doctor_schedule_id: any;

    @IsNotEmpty()
    appointment_number: number;

    @IsNotEmpty()
    reason_for_appointment: string;

    @IsNotEmpty()
    appointment_time: Date;

    @IsNotEmpty()
    status: string;
    
    @IsNotEmpty()
    patient_come_into_hospital: boolean;
    
    doctor_comment: string;
}
