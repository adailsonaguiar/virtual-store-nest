import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsEmailUnique } from '../validation/email.validator';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsEmailUnique({ message: 'Email already exists' })
  email: string;
  @MinLength(6)
  password: string;
}
