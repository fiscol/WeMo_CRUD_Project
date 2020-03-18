import { Repository } from 'typeorm';
import { MotorsController } from './motors.controller';
import { MotorsService } from './motors.service';
import { Motor } from './motor.entity';
import {
  createMotorDataArr,
  motorDataArr,
  dataToUpdate,
} from './constant/motor.constants';
import { Response, HttpException } from '@nestjs/common';

// Motors Controller test
describe('Motors Controller', () => {
  let motorsController: MotorsController;
  let motorsService: MotorsService;
  let motorsRepository: Repository<Motor>;

  // Init Motors module test
  beforeAll(() => {
    motorsService = new MotorsService(motorsRepository);
    motorsController = new MotorsController(motorsService);
  });

  // Create a Motor test
  describe('create', () => {
    it('create a motor should return an motor with id', async () => {
      const result = Promise.resolve(motorDataArr[0]);
      jest.spyOn(motorsService, 'create').mockImplementation(() => result);

      motorsController
        .create(createMotorDataArr[0], Response)
        .then(data => {
          expect(data).toBe(result);
        })
        .catch(error => {
          expect(error).toBeInstanceOf(HttpException);
        });
    });
  });

  // Update a Motor with ID test
  describe('update', () => {
    it('should return an updated motor', async () => {
      const createResult = await motorsService.create(createMotorDataArr[0]);
      jest
        .spyOn(motorsService, 'update')
        .mockImplementation(() => Promise.resolve(motorDataArr[1]));

      motorsController
        .update(createResult.id, dataToUpdate, Response)
        .then(data => {
          expect(data).toBe(motorDataArr[1]);
        })
        .catch(error => {
          expect(error).toBeInstanceOf(HttpException);
        });
    });
  });

  // Find all Motors test
  describe('findAll', () => {
    it('should return an array of motors', async () => {
      await motorsService.create(createMotorDataArr[0]);
      await motorsService.create(createMotorDataArr[1]);
      const motorsArr = [motorDataArr[0], motorDataArr[1]];
      jest
        .spyOn(motorsService, 'findAll')
        .mockImplementation(() => Promise.resolve(motorsArr));

      motorsController
        .findAll(Response)
        .then(data => {
          expect(data).toBe(motorsArr);
        })
        .catch(error => {
          expect(error).toBeInstanceOf(HttpException);
        });
    });
  });

  // Find a Motor with ID test
  describe('findOne', () => {
    it('should return a motor with specific id', async () => {
      await motorsService.create(createMotorDataArr[0]);
      jest
        .spyOn(motorsService, 'findOne')
        .mockImplementation(() => Promise.resolve(motorDataArr[0]));

      motorsController
        .findOne(1, Response)
        .then(data => {
          expect(data).toBe(motorDataArr[0]);
        })
        .catch(error => {
          expect(error).toBeInstanceOf(HttpException);
        });
    });
  });

  // Remove a Motor with ID test
  describe('remove', () => {
    it('should return delete succeed message after remove', async () => {
      await motorsService.create(createMotorDataArr[0]);
      const removeMessage = { message: 'Delete with ID succeed.' };
      jest
        .spyOn(motorsService, 'remove')
        .mockImplementation(() => Promise.resolve(removeMessage));

      motorsController
        .remove(1, Response)
        .then(data => {
          expect(data).toBe(removeMessage);
        })
        .catch(error => {
          expect(error).toBeInstanceOf(HttpException);
        });
    });
  });
});
