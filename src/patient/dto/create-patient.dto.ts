import { IsString, IsEmail, IsNotEmpty,IsNumber, IsDate, IsBoolean, IsDateString } from 'class-validator';

export class CreatePatientDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;
    
    @IsNotEmpty()
    @IsString()
    gender: string;

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
    @IsNumber()
    role: Number;
        
    //@IsString()
    image: string;

}
