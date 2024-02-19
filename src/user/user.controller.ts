import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/createUser.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    this.userRepository.create(userData);
    return userData;
  }

  @Get()
  async getUSers() {
    return this.userRepository.getAll();
  }
}
