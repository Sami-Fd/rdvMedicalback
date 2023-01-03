import { IsString, IsEmail, IsNotEmpty,IsNumber } from 'class-validator';

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNumber()
    role: Number;
    
}
