import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { DoctorScheduleService } from './doctor-schedule.service';
import { CreateDoctorScheduleDto } from './dto/create-doctor-schedule.dto';


@Controller('schedule')
export class DoctorScheduleController {
  constructor(private readonly doctorScheduleService: DoctorScheduleService) {}

  @Roles(0,2)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Req() req:any, @Body() createDoctorScheduleDto: CreateDoctorScheduleDto) {
    return this.doctorScheduleService.create(req, createDoctorScheduleDto);
  }

  @Get()
  findAll() {
    return this.doctorScheduleService.findAll();
  }

  @Roles(0,1,2)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorScheduleService.findOne(id);
  }

  @Roles(0,1,2)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorScheduleDto: CreateDoctorScheduleDto) {
    return this.doctorScheduleService.update(id, updateDoctorScheduleDto);
  }

  @Roles(0,2)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorScheduleService.remove(id);
  }
}
