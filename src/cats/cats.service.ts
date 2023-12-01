import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Breed } from 'src/breeds/entities/breed.entity';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private breedsRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    //const cat = this.catsRepository.create(createCatDto);
    const breed = await this.breedsRepository.findOneBy({
      name: createCatDto.breed,
    });

    if (!breed) {
      throw new Error('Breed not found');
    }
    return await this.catsRepository.save({
      ...createCatDto,
      breed,
    });
  }

  async findAll() {
    return await this.catsRepository.find();
  }

  async findOne(id: number) {
    return await this.catsRepository.findOneBy({ id });
  }

  // async update(id: number, updateCatDto: UpdateCatDto) {
  //  return await this.catsRepository.update(id, updateCatDto);
  // }

  async update(id: number, updateCatDto: UpdateCatDto) {
      const breed = await this.breedsRepository.findOne({
        where: { name: updateCatDto.breed },
      });

      if (!breed) {
        throw new Error('Breed not found');
      }

      return await this.catsRepository.update(id, {
        ...updateCatDto,
        breed,
      });
    }

  async remove(id: number) {
    return await this.catsRepository.softDelete(id);
  }
}
