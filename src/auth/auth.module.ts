import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from 'src/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { DoctorService } from 'src/doctor/doctor.service';
import { PatientService } from 'src/patient/patient.service';
import { doctor, doctorSchema } from 'src/doctor/schemas/doctor.schema';
import { patient, patientSchema } from 'src/patient/schemas/patient.schema';
import { UsersService } from 'src/users/users.service';
import { doctor_schedule, doctor_scheduleSchema } from 'src/doctor/doctor-schedule/schema/schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: user.name, schema: userSchema },
      { name: doctor.name, schema: doctorSchema },
      { name: patient.name, schema: patientSchema },
      { name: doctor_schedule.name, schema: doctor_scheduleSchema },
    ]),
    UsersModule,
    PassportModule,
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService,PatientService, DoctorService, UsersService,JwtStrategy],
})
export class AuthModule {}
