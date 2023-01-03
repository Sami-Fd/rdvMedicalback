import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { UsersService } from '../users/users.service';
import { PatientController } from './patient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { patient, patientSchema } from './schemas/patient.schema';
import { user,userSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: patient.name, schema: patientSchema },{name:user.name,schema:userSchema}])],
  controllers: [PatientController],
  providers: [PatientService,UsersService],
  exports: [PatientService]
})
export class PatientModule {}
