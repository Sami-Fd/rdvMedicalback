import { Module } from '@nestjs/common';
import { DoctorScheduleService } from './doctor-schedule.service';
import { DoctorScheduleController } from './doctor-schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { doctor, doctorSchema } from '../schemas/doctor.schema';
import { doctor_schedule, doctor_scheduleSchema } from './schema/schedule.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: doctor.name, schema: doctorSchema },{ name: doctor_schedule.name, schema: doctor_scheduleSchema }]), DoctorScheduleModule],
  controllers: [DoctorScheduleController],
  providers: [DoctorScheduleService],
  exports: [DoctorScheduleService]
})
export class DoctorScheduleModule {}
