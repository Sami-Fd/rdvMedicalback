import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PatientService } from 'src/patient/patient.service';
import { AppointementService } from './appointement.service';
import { CreateAppointementDto } from './dto/create-appointement.dto';
import { appointement } from './schema/appointement.schema';


@Controller('appointment')
export class AppointementController {
  constructor(private readonly appointementService: AppointementService,private readonly patientService: PatientService) {}

  @Roles(0,1,2)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post()
  async create(@Body() createAppointementDto: CreateAppointementDto, @Req() req:any) {
    return this.appointementService.create(createAppointementDto, req);
  }

  @Roles(0,1,2)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get()
  findAll(@Req() req:any) {
    return this.appointementService.findAll(req);
  }

  @Roles(1,2)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appointementService.findOne(id);
  }

  @Roles(0,1,2)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointementDto: appointement) {
    return this.appointementService.update(id, updateAppointementDto);
  }

  @Roles(0,1,2)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointementService.remove(id);
  }
}
