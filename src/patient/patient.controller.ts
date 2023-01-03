import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { editFileName,imageFileFilter } from 'src/file-upload.utils';
import { patient } from './schemas/patient.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  // @Roles(0,1,2)
  // @UseGuards(JwtAuthGuard,RolesGuard)
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
  async create(@UploadedFile() file: Express.Multer.File,@Body() createpatientDto: CreatePatientDto) {
    //if(file)  console.log(file)
    console.log(createpatientDto)
    return await this.patientService.create(file, createpatientDto);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

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
  async update(@UploadedFile() file: Express.Multer.File,@Param('id') id: string, @Body() patient: patient) {
    return await this.patientService.update(file,id, patient);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads/avatars' });
  }
}
