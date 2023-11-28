import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Breed } from './entities/breed.entity';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private breedsRepository: Repository<Breed>,
  ) {}

  async create(createBreedDto: CreateBreedDto) {
    return await this.breedsRepository.save(createBreedDto);
  }

  async findAll() {
    return await this.breedsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} breed`;
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    return await this.breedsRepository.update(id, updateBreedDto);
  }

  remove(id: number) {
    return `This action removes a #${id} breed`;
  }
}
