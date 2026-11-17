import { IsOptional, IsString, IsEmail, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
    
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    user_name?: string;
    
    @IsOptional()
    @IsEmail()
    @MaxLength(255)
    user_email?: string
}