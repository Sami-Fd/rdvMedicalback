import { Module } from '@nestjs/common';
import { AppointementService } from './appointement.service';
import { AppointementController } from './appointement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { appointement, appointementSchema } from './schema/appointement.schema';
import { PatientModule } from 'src/patient/patient.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { DoctorScheduleModule } from 'src/doctor/doctor-schedule/doctor-schedule.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: appointement.name, schema: appointementSchema }]),PatientModule,DoctorModule,DoctorScheduleModule],
  controllers: [AppointementController],
  providers: [AppointementService]
})
export class AppointementModule {}
