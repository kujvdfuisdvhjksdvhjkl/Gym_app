// lab-gym-app/apps/users-service/src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  // Внедрение репозитория сущности UserEntity
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Метод поиска пользователя по email
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Пример метода для создания пользователя
  async createUser(email: string, password: string, role: string = 'client'): Promise<UserEntity> {
    const user = this.userRepository.create({ email, password, role });
    return this.userRepository.save(user);
  }
}
