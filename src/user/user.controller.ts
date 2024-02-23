import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const user = new UserEntity();
    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;
    user.id = uuid();

    this.userRepository.create(user);
    return { id: user.id, message: 'User created' };
  }

  @Get()
  async getUSers() {
    const savedUsers = await this.userRepository.getAll();
    return savedUsers.map((user) => new ListUserDTO(user.id, user.name));
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDTO) {
    const user = await this.userRepository.update(id, userData);

    return { id: user.id, message: 'User updated' };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userRepository.delete(id);
    return { id: user.id, message: 'User deleted' };
  }
}
