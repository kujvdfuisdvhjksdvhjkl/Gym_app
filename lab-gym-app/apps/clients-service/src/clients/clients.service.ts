// apps/clients-service/src/clients/clients.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto, UpdateClientDto } from './dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private repo: Repository<Client>,
  ) {}

  create(dto: CreateClientDto): Promise<Client> {
    const client = this.repo.create(dto);
    return this.repo.save(client);
  }

  findAll(): Promise<Client[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.repo.findOneBy({ id });
    if (!client) throw new NotFoundException(`Client ${id} not found`);
    return client;
  }

  async update(id: number, dto: UpdateClientDto): Promise<Client> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number): Promise<void> {
    return this.repo.delete(id).then(() => {});
  }
}
