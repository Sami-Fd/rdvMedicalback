import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, UseGuards, SetMetadata, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/file-upload.utils';
import { DoctorService } from './doctor.service';
import {doctor} from './schemas/doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { doctor_schedule } from './doctor-schedule/schema/schedule.schema';


@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Roles(0,2)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File,@Body() createDoctorDto: CreateDoctorDto) {
    if(file)  console.log(file)
    return await this.doctorService.create(file, createDoctorDto);
  }

  
  @Get()
  @Roles(2)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.doctorService.findAll();
  }

  @Roles(0,2)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Roles(0,2)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async update(@UploadedFile() file: Express.Multer.File,@Param('id') id: string, @Body() doctor: doctor) {
    return await this.doctorService.update(file,id, doctor);
  }

  @Roles(0,2)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads/avatars' });
  }
}
