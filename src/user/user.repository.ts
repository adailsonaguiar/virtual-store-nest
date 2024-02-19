import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [];

  async create(user) {
    this.users.push(user);
    console.log(this.users);
  }

  async getAll() {
    return this.users;
  }

  async getByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
