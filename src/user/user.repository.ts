import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async create(user: UserEntity) {
    this.users.push(user);
    console.log(this.users);
  }

  async getAll() {
    return this.users;
  }

  async getByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  private async getById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async update(id: string, userData: Partial<UserEntity>) {
    const user = await this.getById(id);
    Object.assign(user, userData);
    return user;
  }

  async delete(id: string) {
    const user = await this.getById(id);
    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }
}
