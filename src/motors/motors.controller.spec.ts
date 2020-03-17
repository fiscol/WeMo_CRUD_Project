import { Repository } from 'typeorm';
import { MotorsController } from './motors.controller';
import { MotorsService } from './motors.service';
import { CreateMotorDto } from './dto/create-motor.dto';
import { UpdateMotorDto } from './dto/update-motor.dto';
import { Motor } from './motor.entity';
import { Response } from '@nestjs/common';

describe('Motors Controller', () => {
  let motorsController: MotorsController;
  let motorsService: MotorsService;
  let motorsRepository: Repository<Motor>;

  beforeAll(() => {
    motorsService = new MotorsService(motorsRepository);
    motorsController = new MotorsController(motorsService);
  });

  describe('create', () => {
    it('create a motor should return an motor with id', async () => {
      const createMotorDto: CreateMotorDto = {
        name: 'ABC-001',
        age: 1,
        distance: 0,
        city: 'Taipei',
        area: 'Daan',
      };

      const motor: Motor = {
        name: 'ABC-001',
        age: 1,
        distance: 0,
        city: 'Taipei',
        area: 'Daan',
        id: 1,
      };
      const result = Promise.resolve(motor);
      jest.spyOn(motorsService, 'create').mockImplementation(() => result);

      motorsController.create(createMotorDto, Response).then(data => {
        expect(data).toBe(result);
      });
    });
  });
  describe('update', () => {
    it('should return an updated motor', async () => {
      const motor = new Motor();
      motor.name = 'AAA-123';
      motor.age = 2;
      motor.distance = 20000;
      motor.city = 'Taipei';
      motor.area = 'Xinyi';
      const createResult = await motorsService.create(motor);

      const dataToUpdate = new UpdateMotorDto();
      dataToUpdate.name = 'AAA-111';
      dataToUpdate.age = 3;
      dataToUpdate.distance = 35000;

      const updatedMotor: Motor = {
        name: 'AAA-111',
        age: 3,
        distance: 35000,
        city: 'Taipei',
        area: 'Xinyi',
        id: 1,
      };

      jest
        .spyOn(motorsService, 'update')
        .mockImplementation(() => Promise.resolve(updatedMotor));

      motorsController
        .update(createResult.id, dataToUpdate, Response)
        .then(data => {
          expect(data).toBe(updatedMotor);
        });
    });
  });
  describe('findAll', () => {
    it('should return an array of motors', async () => {
      const createFirstMotorDto: CreateMotorDto = {
        name: 'AAA-001',
        age: 3,
        distance: 40000,
        city: 'Taipei',
        area: 'Shilin',
      };
      await motorsService.create(createFirstMotorDto);
      const createSecondMotorDto: CreateMotorDto = {
        name: 'TAT-666',
        age: 2,
        distance: 25000,
        city: 'Taipei',
        area: 'Yuanshan',
      };
      await motorsService.create(createSecondMotorDto);

      const motorsArr = [
        {
          name: 'AAA-001',
          age: 3,
          distance: 40000,
          city: 'Taipei',
          area: 'Shilin',
          id: 1,
        },
        {
          name: 'TAT-666',
          age: 2,
          distance: 25000,
          city: 'Taipei',
          area: 'Yuanshan',
          id: 2,
        },
      ];
      jest
        .spyOn(motorsService, 'findAll')
        .mockImplementation(() => Promise.resolve(motorsArr));

      motorsController.findAll(Response).then(data => {
        expect(data).toBe(motorsArr);
      });
    });
  });
  describe('findOne', () => {
    it('should return a motor with specific id', async () => {
      const createMotorDto: CreateMotorDto = {
        name: 'ABC-123',
        age: 2,
        distance: 20000,
        city: 'Taipei',
        area: 'Xinyi',
      };
      await motorsService.create(createMotorDto);
      const motor: Motor = {
        name: 'ABC-123',
        age: 2,
        distance: 20000,
        city: 'Taipei',
        area: 'Xinyi',
        id: 1,
      };
      jest
        .spyOn(motorsService, 'findOne')
        .mockImplementation(() => Promise.resolve(motor));

      motorsController.findOne(1, Response).then(data => {
        expect(data).toBe(motor);
      });
    });
  });
  describe('remove', () => {
    it('should return delete succeed message after remove', async () => {
      const createMotorDto: CreateMotorDto = {
        name: 'ABC-123',
        age: 2,
        distance: 20000,
        city: 'Taipei',
        area: 'Xinyi',
      };
      await motorsService.create(createMotorDto);

      const removeMessage = { message: 'Delete with ID succeed.' };
      jest
        .spyOn(motorsService, 'remove')
        .mockImplementation(() => Promise.resolve(removeMessage));

      motorsController.remove(1, Response).then(data => {
        expect(data).toBe(removeMessage);
      });
    });
  });
});
