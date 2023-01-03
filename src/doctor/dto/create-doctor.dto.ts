import { IsString, IsEmail, IsNotEmpty,IsNumber, IsDate, IsBoolean, IsDateString } from 'class-validator';

export class CreateDoctorDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    //@IsNumber()
    phone: Number;

    @IsNotEmpty()   
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsDateString()
    dateOfBirth: Date;

    @IsNotEmpty()
    @IsString()
    degree: string;

    @IsNotEmpty()
    @IsString()
    speciality: string;


    @IsNotEmpty()
    status: Boolean;
    
    @IsNotEmpty()
    @IsNumber()
    role: Number;
    
    //@IsString()
    image: string;

}
