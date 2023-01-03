import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { doctor, doctorSchema } from './schemas/doctor.schema';
import { user, userSchema } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { doctor_schedule, doctor_scheduleSchema } from './doctor-schedule/schema/schedule.schema';
import { DoctorScheduleModule } from './doctor-schedule/doctor-schedule.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: doctor.name, schema: doctorSchema },{ name: doctor_schedule.name, schema: doctor_scheduleSchema },{name:user.name,schema:userSchema}]), DoctorScheduleModule],
  controllers: [DoctorController],
  providers: [DoctorService,UsersService],
  exports: [DoctorService]
})
export class DoctorModule {}
