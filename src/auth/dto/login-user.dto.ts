import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  email!: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Password must have more than 5 letters' })
  password!: string;
}
