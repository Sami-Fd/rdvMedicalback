import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { doctor, doctorDocument } from '../schemas/doctor.schema';
import { CreateDoctorScheduleDto } from './dto/create-doctor-schedule.dto';
import { doctor_schedule, doctor_scheduleDocument } from './schema/schedule.schema';

@Injectable()
export class DoctorScheduleService {

  constructor(@InjectModel(doctor_schedule.name) private doctorScheduleModel: Model<doctor_scheduleDocument>,
              @InjectModel(doctor.name) private doctorModel:Model<doctorDocument>) {}

  async create(req:any, createDoctorScheduleDto: CreateDoctorScheduleDto) {
    const doctor = await this.doctorModel.findOne({user: req.user._id});
    createDoctorScheduleDto.doctor_id = doctor._id;
    let startTime = new Date(createDoctorScheduleDto.doctor_schedule_start_time);
    let endTime = new Date(createDoctorScheduleDto.doctor_schedule_end_time);
    let range = createDoctorScheduleDto.average_consulting_time;
    let timeSlot = [];
    while(startTime < endTime) {
        let endTime = new Date(startTime.getTime() + range * 60000);
        timeSlot.push({time:startTime, isBooked:false});
        startTime = endTime;
    }
    createDoctorScheduleDto.timeSlot = timeSlot;
    const newSchedule = await this.doctorScheduleModel.create(createDoctorScheduleDto);
    return { message: 'Doctor Schedule Created Successfully', data: newSchedule };
  }

  async findAll() {
    const schedules = await this.doctorScheduleModel.aggregate([
      {
        "$match": {
          "timeSlot.isBooked": false,
          "doctor_schedule_status": true,
          "doctor_schedule_date" : { '$gte' : new Date(new Date().setUTCHours(2,0,0,0))}
        }
      },
      {
         $project: {
            doctor_id: 1,
            doctor_schedule_date: 1,
            doctor_schedule_start_time: 1,
            doctor_schedule_end_time: 1,
            average_consulting_time: 1,
            doctor_schedule_status: 1,
            timeSlot: {
               $filter: {
                  input: "$timeSlot",
                  as: "time",
                  cond: { $eq: [ "$$time.isBooked", false ] }
               }
            }
         }
      },
      {
        "$lookup": {
          "from": "doctors",
          "localField": "doctor_id",
          "foreignField": "_id",
          "as": "doctor"
        }
      },
    ]);  
    return {data:schedules, message:'Doctor Schedules found successfully'};
  }

  async findOne(id: string) {
    console.log("from schedule",new Types.ObjectId(id));
    try {
      const schedule = await this.doctorScheduleModel.find({doctor_id:new Types.ObjectId(id)});
      return {data:schedule, message:'Doctor Schedule found successfully'}; 
    } catch (error) {
      return {message:'Doctor Schedule not found'};
    }
  }

  async update(id: string, updateDoctorScheduleDto: any) {
    try {
      console.log("from schedule",id,updateDoctorScheduleDto);
      //create time slot array
      if(updateDoctorScheduleDto.doctor_schedule_date){
        updateDoctorScheduleDto.timeSlot = await this.timeSlotGenerator(updateDoctorScheduleDto.doctor_schedule_start_time, updateDoctorScheduleDto.doctor_schedule_end_time, updateDoctorScheduleDto.average_consulting_time);
      }
      console.log("from after timeslot",updateDoctorScheduleDto);
      const schedule = await this.doctorScheduleModel.findByIdAndUpdate(id, updateDoctorScheduleDto, {new:true});
      console.log("from after update",schedule);
      return {data:schedule, message:'Doctor Schedule updated successfully'};
    } catch (error) {
      return {message:'Doctor Schedule not found'};
    }
  }

  async remove(id: string) {
    try {
      const schedule = await this.doctorScheduleModel.findByIdAndDelete(id);
      return {data:schedule, message:'Doctor Schedule deleted successfully'};
    }
    catch (error) {
      return {message:'Doctor Schedule not found'};
    }
  }

  timeSlotGenerator(startTime, endTime, range) {
    console.log("timeslot",startTime, endTime, range);
    startTime = new Date(startTime);
    endTime = new Date(endTime);
    let timeSlot = [];
    while(startTime < endTime) {
        let endTime = new Date(startTime.getTime() + range * 60000);
        timeSlot.push({time:startTime, isBooked:false});
        startTime = endTime;
    }
    console.log("timeslot",timeSlot);
    return timeSlot;
  }

}
