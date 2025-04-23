// apps/users-service/src/auth/auth.service.ts
import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    // 1) Сравниваем хэш с введённым паролем
    const passwordMatches = await bcrypt.compare(pass, user.password);
    if (!passwordMatches) {
      return null;
    }
    // 2) Убираем пароль из результата
    const { password, ...result } = user;
    return result;
  }

  async register(dto: RegisterDto): Promise<Omit<UserEntity, 'password'>> {
    // 1) Проверка на существование
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('User already exists');
    }
    // 2) Хэширование пароля
    const hash = await bcrypt.hash(dto.password, 10);
    // 3) Создание пользователя
    const user = await this.usersService.createUser(
      dto.email,
      hash,
      dto.role ?? 'client',
    );
    // 4) Убираем пароль из возвращаемого объекта
    const { password, ...result } = user;
    return result;
  }

  async login(user: Omit<UserEntity, 'password'>) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
