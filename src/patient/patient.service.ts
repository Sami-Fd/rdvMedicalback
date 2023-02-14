import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import { CreatePatientDto } from './dto/create-patient.dto';
import { patient, patientDocument } from './schemas/patient.schema';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PatientService {
  constructor(@InjectModel(patient.name) private patientModel: Model<patientDocument>,
  private userservice:UsersService
  ) {}


  async create(file, createpatientDto: CreatePatientDto) {
    const hashedPassword = await argon2.hash(createpatientDto.password);
    const user = await this.userservice.createAndGetId({email:createpatientDto.email,password:hashedPassword,role:createpatientDto.role})
    const patient = new this.patientModel(createpatientDto);
    patient.user =  user;
    patient.password = hashedPassword;
    if (file) {
      patient.image = file.filename;
    }
    console.log(file.path)
    
    try {
      const patientsaved:any = await (await this.patientModel.create(patient)).populate("user","-password");
      if (patientsaved) {
      const { password, ...responseUser } = patientsaved._doc;
      return { user: responseUser, message:`${responseUser.first_name} ${responseUser.last_name} created successfully` };
      }
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.patientModel.find().exec();
  }

  find(criteria: any) {
    return this.patientModel.find(criteria).exec();
  }

  async findOne(id: string ) {
    const patient = await this.patientModel.findById({ _id: id }).exec();
    if (!patient) {
      throw new NotFoundException(`patient #${id} not found`);
     }
     return patient;
  }

  async update(file,id: string, patient: patient) {    
    if (file) {
      console.log(file)
      patient.image = file.filename;
    }
    const updatedpatient = await (await this.patientModel.findByIdAndUpdate(id, patient, { new: true })).populate("user","-password");
    if (!updatedpatient) {
      throw new NotFoundException(`patient #${id} not found`);
    }
    return {patient:updatedpatient, message: `${patient.first_name} ${patient.last_name} updated successfully`};
  }

  async remove(id: string) {
    const patient = await this.patientModel.findByIdAndDelete(id);
    if (!patient) {
     throw new NotFoundException(`patient #${id} not found`);
    }
    //delete image from server 
    fs.unlinkSync(patient.image);
    return {patient:patient, message: `${patient.first_name} ${patient.last_name} deleted successfully`};
  }
}
