import { IsNotEmpty } from "class-validator";

export class CreateDoctorScheduleDto {
    //@IsNotEmpty()
    doctor_schedule_date: Date;

    //@IsNotEmpty()
    doctor_schedule_start_time: Date;

    //@IsNotEmpty()
    doctor_schedule_end_time: Date;

    //@IsNotEmpty()
    average_consulting_time: number;

    //@IsNotEmpty()
    doctor_schedule_status: boolean;

    doctor_id: string;

    timeSlot: Array<object>;
}
