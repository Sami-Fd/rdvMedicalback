import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseInterceptors, UploadedFile, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { user } from './schemas/user.schema';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';


@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(2)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(2)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(0,1,2)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Roles(0,1,2)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: user) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(2)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

}
