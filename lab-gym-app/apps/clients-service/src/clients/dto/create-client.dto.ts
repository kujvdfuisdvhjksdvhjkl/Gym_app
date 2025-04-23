// apps/clients-service/src/clients/dto/create-client.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'Иван Иванов' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2025-04-19' })
  @IsDateString()
  membershipDate: string;

  @ApiProperty({ example: 'premium' })
  @IsString()
  membershipType: string;
}
