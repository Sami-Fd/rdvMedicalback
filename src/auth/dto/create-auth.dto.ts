import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class AuthDto {
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNumber()
    @IsNotEmpty()
    role: number;
}

