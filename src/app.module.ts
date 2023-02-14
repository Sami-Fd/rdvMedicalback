import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { MulterModule } from '@nestjs/platform-express';
import { AppointementModule } from './appointement/appointement.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,MongooseModule.forRoot(process.env.DATABASE_URL),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    UsersModule,
    PatientModule,
    DoctorModule,
    AppointementModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
