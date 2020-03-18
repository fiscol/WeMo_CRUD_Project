import { CreateMotorDto } from '../dto/create-motor.dto';
import { UpdateMotorDto } from '../dto/update-motor.dto';
import { Motor } from '../motor.entity';

export const createMotorDataArr: CreateMotorDto[] = [
  {
    name: 'ABC-001',
    age: 1,
    distance: 0,
    city: 'Taipei',
    area: 'Daan',
  },
  {
    name: 'AAA-001',
    age: 3,
    distance: 40000,
    city: 'Taipei',
    area: 'Shilin',
  },
];

export const motorDataArr: Motor[] = [
  {
    name: 'ABC-001',
    age: 1,
    distance: 0,
    city: 'Taipei',
    area: 'Daan',
    id: 1,
  },
  {
    name: 'AAA-001',
    age: 3,
    distance: 40000,
    city: 'Taipei',
    area: 'Shilin',
    id: 2,
  },
];

export const dataToUpdate: UpdateMotorDto = {
  name: 'AAA-001',
  age: 3,
  distance: 40000,
  city: 'Taipei',
  area: 'Shilin',
};
