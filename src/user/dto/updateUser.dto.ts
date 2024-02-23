import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { IsEmailUnique } from '../validation/email.validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsOptional()
  name: string;
  @IsEmail()
  @IsEmailUnique({ message: 'Email already exists' })
  @IsOptional()
  email: string;
  @MinLength(6)
  @IsOptional()
  password: string;
}
