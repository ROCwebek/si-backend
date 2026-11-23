import { IsString, IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  user_name: string;

  @IsString()
  @IsEmail()
  @MinLength(1)
  @MaxLength(255)
  user_email: string;

  @IsString()
  @MinLength(8)
  user_password: string;
}
