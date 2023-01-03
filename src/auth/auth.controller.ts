import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DoctorService } from 'src/doctor/doctor.service';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { editFileName, imageFileFilter } from 'src/file-upload.utils';
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly doctorService: DoctorService) {}

  @Post('signup')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  signup(@UploadedFile() file: Express.Multer.File,@Body() AuthDto: any) {
    file ? console.log(file) : console.log('no file');
    return this.authService.signup(file,AuthDto);
  }

  @Post('signin')
  signin(@Body() AuthDto: AuthDto) {
    return this.authService.signin(AuthDto);
  }
}
