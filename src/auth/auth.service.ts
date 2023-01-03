import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import * as argon2 from 'argon2';
import { user, userDocument } from 'src/users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { DoctorService } from 'src/doctor/doctor.service';
import { PatientService } from 'src/patient/patient.service';
import { doctor, doctorDocument } from 'src/doctor/schemas/doctor.schema';
import { patient, patientDocument } from 'src/patient/schemas/patient.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(user.name) private userModel: Model<userDocument>,
  @InjectModel(doctor.name) private doctorModel: Model<doctorDocument>,
  @InjectModel(patient.name) private patientModel: Model<patientDocument>,
  private jwtService: JwtService,
  private doctorService: DoctorService,
  private patientService: PatientService,
  ) {}

  
  async signup(file,AuthDto: any) {
    try {
      /*if(AuthDto.role == 2){
      const hashedPassword = await argon2.hash(AuthDto.password);
      const newUser = await this.userModel.create({
        ...AuthDto,
        password: hashedPassword
      });
      return newUser;
      }*/
      if(AuthDto.role == 0){
        const newDoctor = await this.doctorService.create(file, AuthDto);
        return newDoctor;
      } else if(AuthDto.role == 1) {
        console.log("file",file)
        const newPatient = await this.patientService.create(file,AuthDto);
        return newPatient;
      }
    } catch (error) {
      console.log(error);
      return error.code === 11000 ? {message: 'Email already exists'} : {message: 'you must fill all required fields'};
    } 
  }

  async signin(AuthDto: AuthDto) {
    const user = await this.userModel.findOne({email:AuthDto.email,role:AuthDto.role}).exec();
    console.log(user)
    if (!user) { 
      return {message: 'User not found'};
    }
    console.log(user.password, AuthDto.password)
    const isPasswordValid = await argon2.verify(user.password,AuthDto.password);
    if (!isPasswordValid) {
      return {message: 'Password is not valid'};
    }
    if(AuthDto.role == 2){
      return {access_token:this.login(user),user: {name: "Admin", role:2, image:"111-1672754282192.png"}, message: 'User logged in successfully'};
    }
    if(AuthDto.role == 0){
      const userData = await this.doctorModel.find().where('user').equals(user._id).select({email:0,password:0}).populate("user","-password").exec();
      console.log(userData)
      return {user: userData, access_token:this.login(user)};
    } else if(AuthDto.role == 1){
      const userData = await this.patientModel.find().where('user').equals(user._id).select({email:0,password:0}).populate("user","-password").exec();
      console.log("user signin",userData)
      return {user: userData, access_token:this.login(user)};
    }
    // find doctor by user id
    //return {access_token:this.login(user),user: {name: doctor.name, image:doctor.image}, message: 'User logged in successfully'};
  }
  
  login(user: any) {
    try {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return this.jwtService.sign(payload, {secret: process.env.JWT_SECRET, expiresIn: '8h'}); 
    } catch (error) {
      return error;
    }
  }
}
