import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoctorService } from 'src/doctor/doctor.service';
import { PatientService } from 'src/patient/patient.service';
import { CreateAppointementDto } from './dto/create-appointement.dto';
import { appointement, appointementDocument } from './schema/appointement.schema';
import { DoctorScheduleService } from 'src/doctor/doctor-schedule/doctor-schedule.service';

@Injectable()
export class AppointementService {
  constructor(@InjectModel(appointement.name) private readonly appointementModel: Model<appointementDocument>, private patientService:PatientService, private doctorService:DoctorService
  ,private doctorScheduleService:DoctorScheduleService
  ) {}

  async create(createAppointementDto: CreateAppointementDto, req: any) {
    const patient = await this.patientService.find({user: req.user._id})
    //console.log("createAppointementDto",createAppointementDto.doctor_schedule_id);
    //createAppointementDto.appointment_number = 1;
    console.log("createAppointementDto",createAppointementDto);
    const timeSlot:any = {timeSlot: createAppointementDto.doctor_schedule_id.timeSlot};
    console.log("appointment",createAppointementDto);
    try {
      const appointement = await this.appointementModel.create({...createAppointementDto, patient_id: patient[0]._id});
      if (appointement) {
        const scheduleUpdate = await this.doctorScheduleService.update(createAppointementDto.doctor_schedule_id._id, timeSlot);
        console.log("from scheduleupdate",scheduleUpdate);
      }
      return {appointement: appointement, message: 'appointement created successfully'};
    } catch (error) {
      return {message: error.message};
    }
  }

  async findAll(req: any) {
    const user = req.user.role;
    if (user === 1) {
      const patient = await this.patientService.find({user: req.user._id})
      const appointement = await this.appointementModel.find({patient_id: patient[0]._id}).populate("doctor_id").exec();
      //console.log(appointement);
      return {appointment: appointement, message: 'appointement found successfully'};
    }else if (user === 0) {
      const doctor = await this.doctorService.find({user: req.user._id})
      //console.log(doctor[0]._id);
      const appointement = await this.appointementModel.find({doctor_id: doctor[0]._id.toString()}).populate("patient_id").exec();
      //console.log(appointement);
      return {appointment: appointement, message: 'appointement found successfully'};
    }else if (user === 2) {
      const appointement = await this.appointementModel.find().populate("patient_id").populate("doctor_id").exec();
      return {appointment: appointement, message: 'appointement found successfully'};
    }
  }

  async findOne(id: string) {
    const appointement = await this.appointementModel.findById(id).exec();
    const message = appointement ? 'appointement found successfully' : 'appointement not found';
    return {appointement: appointement, message: message};
  }

  async update(id: string, updateAppointementDto: CreateAppointementDto) {
    const appointement = await this.appointementModel.findByIdAndUpdate(id, updateAppointementDto, {new: true}).exec();
    return {appointement: appointement, message: 'appointement updated successfully'};
  }

  async remove(id: string) {
    const appointement = await this.appointementModel.findByIdAndDelete(id).exec();
    const message = appointement ? 'appointement deleted successfully' : 'appointement not found';
    return {appointement: appointement, message: message};
  }
}
