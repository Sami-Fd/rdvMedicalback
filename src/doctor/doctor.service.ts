import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import  mongoose, { Model, Types } from 'mongoose';
import * as fs from 'fs';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { doctor,doctorDocument } from './schemas/doctor.schema';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';
import { doctor_schedule, doctor_scheduleDocument } from './doctor-schedule/schema/schedule.schema';
import mongodb = require('mongodb');

@Injectable()
export class DoctorService {
  constructor(@InjectModel(doctor.name) private doctorModel: Model<doctorDocument>,
  @InjectModel(doctor_schedule.name) private doctorScheduleModel: Model<doctor_scheduleDocument>,
  private userservice:UsersService) {}

  async create(file, createDoctorDto: CreateDoctorDto) {
    const hashedPassword = await argon2.hash(createDoctorDto.password);
    const user = await this.userservice.createAndGetId({email:createDoctorDto.email,password:hashedPassword,role:createDoctorDto.role})
    const doctor = new this.doctorModel(createDoctorDto);
    doctor.user =  user;
    if (file) {
      doctor.image = file.filename;
    }
    const createdItem = await doctor.save();
    //console.log(await this.doctorModel.findById(createdItem._id).populate('user').exec())
    return {doctor:createdItem, message: `${doctor.name} created successfully`};
  }

  findAll() {
    return this.doctorModel.find().exec();
  }
  
  async findAllSchedules() {
    // get only doctor with schedules legnth > 0 and havve time slot is not booked
    await this.doctorModel.find({'schedules':{$exists:true,$not:{$size:0}}}).select({dateOfBirth:0,user:0}).then((res:any)=>{
      console.log(res[0].schedules.timeSlot) 
    })
    //return this.doctorModel.find({schedules:{$exists:true,$not:{$size:0}}}).select({dateOfBirth:0,user:0}).exec();
  }
  
  find(criteria: any) {
    return this.doctorModel.find(criteria).exec();
  }

  async findOne(id: string ) {
    const doctor = await this.doctorModel.findById({ _id: id }).exec();
    if (!doctor) {
      throw new NotFoundException(`Doctor #${id} not found`);
     }
     return doctor;
  }

  async update(file,id: string, doctor: doctor) {    
    if (file) {
      doctor.image = file.filename;
    }
    const updatedDoctor = await this.doctorModel.findByIdAndUpdate(id, doctor, { new: true }).populate('user', '-password').exec();
    if (!updatedDoctor) {
      throw new NotFoundException(`doctor #${id} not found`);
    }
    return {doctor:updatedDoctor, message: `${doctor.name} updated successfully`};
  }

  async remove(id: string) {
    const doctor = await this.doctorModel.findByIdAndDelete(id);
    if (!doctor) {
     throw new NotFoundException(`doctor #${id} not found`);
    }
    fs.unlinkSync(doctor.image);
    return {doctor:doctor, message: `${doctor.name} deleted successfully`};
  }
  
 /* async updateSchedule(req:any, id:string ,schedule: doctor_schedule) {
    const updateSchedule = await this.doctorModel.findOneAndUpdate(
      {"schedules._id":  new mongoose.Types.ObjectId(id)},
      {
        $set: {
              "schedules.$.doctor_schedule_date": schedule.doctor_schedule_date,
              "schedules.$.doctor_schedule_start_time": schedule.doctor_schedule_start_time,
              "schedules.$.doctor_schedule_end_time": schedule.doctor_schedule_end_time,
              "schedules.$.average_consulting_time": schedule.average_consulting_time,
              "schedules.$.timeSlot": schedule.timeSlot,
              "schedules.$.doctor_schedule_status": schedule.doctor_schedule_status
            }
      }, 
      {new: true}).exec();
    return {schedule: updateSchedule, message: `schedule updated successfully`};
  }
  */
}
