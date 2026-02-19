import { Injectable } from '@nestjs/common';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceEntity } from '@/shared/models';
import { Repository } from 'typeorm';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(SpaceEntity)
    private spaceRepo: Repository<SpaceEntity>,
  ) {}

  async create(createSpaceDto: CreateSpaceDto) {
    const result = await this.spaceRepo.save(createSpaceDto);
    return { data: result };
  }

  async findAll() {
    const result = await this.spaceRepo.find();
    const pagination = {
      total: result.length,
      page: 1,
      size: 10,
    };

    return { data: result, pagination };
  }

  async findOne(id: string) {
    const result = await this.spaceRepo.findOne({ where: { id } });
    return { data: result };
  }

  async update(id: string, updateSpaceDto: UpdateSpaceDto) {
    const result = await this.spaceRepo.update(id, updateSpaceDto);
    return { data: result };
  }

  async remove(id: string) {
    const result = await this.spaceRepo.delete(id);
    return { data: result };
  }
}
