// lab-gym-app/apps/users-service/src/users/entities/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users') // Имя таблицы будет users
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор пользователя' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'Электронная почта пользователя' })
  email: string;

  @Column()
  // В реальном проекте не забудьте хранить хэш пароля
  @ApiProperty({ description: 'Пароль пользователя' })
  password: string;

  @Column({ default: 'client' })
  @ApiProperty({ description: 'Роль пользователя', default: 'client' })
  role: string;
}
