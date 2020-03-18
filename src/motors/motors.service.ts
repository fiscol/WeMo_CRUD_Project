import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMotorDto } from './dto/create-motor.dto';
import { UpdateMotorDto } from './dto/update-motor.dto';
import { Motor } from './motor.entity';

@Injectable()
export class MotorsService {
  constructor(
    @InjectRepository(Motor)
    private readonly motorsRepository: Repository<Motor>,
  ) {}

  // Create a motor to Datatable with 'CreateMotorDto' Datatype
  async create(createMotorDto: CreateMotorDto): Promise<Motor> {
    const motor = new Motor();
    motor.name = createMotorDto.name;
    motor.age = createMotorDto.age;
    motor.distance = createMotorDto.distance;
    motor.city = createMotorDto.city;
    motor.area = createMotorDto.area;
    return await this.motorsRepository.save(motor);
  }

  // Update a motor to Datatable with 'UpdateMotorDto' Datatype
  async update(id: number, updateMotorDto: UpdateMotorDto): Promise<Motor> {
    let motorToUpdate = await this.motorsRepository.findOne(id);
    motorToUpdate = {
      name: updateMotorDto.name || motorToUpdate.name,
      age: updateMotorDto.age || motorToUpdate.age,
      distance: updateMotorDto.distance || motorToUpdate.distance,
      city: updateMotorDto.city || motorToUpdate.city,
      area: updateMotorDto.area || motorToUpdate.area,
      id: id,
    };
    await this.motorsRepository.update(id, motorToUpdate);
    return await this.motorsRepository.findOne(id);
  }

  // Get all motors from Datatable
  async findAll(): Promise<Motor[]> {
    return await this.motorsRepository.find();
  }

  // Get a motor from Datatable with ID
  async findOne(id: number) {
    const motor = await this.motorsRepository.findOne(id);
    if (!motor) {
      return Promise.reject('Motor not found');
    }
    return motor;
  }

  // Remove a motor from Datatable with ID
  async remove(id: number) {
    const result = await this.motorsRepository.delete(id);
    if (result.affected === 0) {
      return Promise.reject('Motor not found');
    }
    return { message: 'Delete with ID succeed.' };
  }
}
