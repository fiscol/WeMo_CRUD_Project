import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { MotorsModule } from '../src/motors/motors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorsService } from '../src/motors/motors.service';
import { Motor } from '../src/motors/motor.entity';
import {
  createMotorDataArr,
  dataToUpdate,
} from '../src/motors/constant/motor.constants';
import { INestApplication, HttpStatus } from '@nestjs/common';

describe('Motors', () => {
  let app: INestApplication;
  let motorsService: MotorsService;

  // Test Databese connection config, import Motors module
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'database-2.cr5lwvldzqx7.ap-northeast-1.rds.amazonaws.com',
          port: 3306,
          username: 'wemo_test',
          password: 'wemoscooter_test',
          database: 'wemo_db_test',
          entities: [Motor],
          synchronize: true,
          logging: false,
          dropSchema: true,
        }),
        MotorsModule,
      ],
    })
      .overrideProvider(motorsService)
      .useValue(motorsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  // Close app after testing finished
  afterAll(async () => {
    await app.close();
  });

  // Test all API calls
  describe('Motors API E2E Check', () => {
    const createMotorDto = createMotorDataArr[0];

    // POST Motor API test
    it(`/POST motor`, () => {
      return request(app.getHttpServer())
        .post('/motors')
        .set('Accept', 'application/json')
        .send(createMotorDataArr[0])
        .expect(({ body }) => {
          expect(body.id).toBeDefined();
          expect(body.name).toEqual(createMotorDto.name);
          expect(body.age).toEqual(createMotorDto.age);
          expect(body.distance).toEqual(createMotorDto.distance);
          expect(body.city).toEqual(createMotorDto.city);
          expect(body.area).toEqual(createMotorDto.area);
        })
        .expect(HttpStatus.CREATED);
    });

    // GET All Motors API test
    it(`/GET motors`, () => {
      return request(app.getHttpServer())
        .get('/motors')
        .set('Accept', 'application/json')
        .expect(({ body }) => {
          expect(body.length).toEqual(1);
          expect(body[0].name).toEqual(createMotorDto.name);
          expect(body[0].distance).toEqual(createMotorDto.distance);
        })
        .expect(HttpStatus.OK);
    });

    // UPDATE Motor with ID API test
    it(`/Update motor with specific ID`, () => {
      return request(app.getHttpServer())
        .put('/motors/1')
        .set('Accept', 'application/json')
        .send(dataToUpdate)
        .expect(({ body }) => {
          expect(body.name).toEqual(dataToUpdate.name);
          expect(body.age).toEqual(dataToUpdate.age);
          expect(body.distance).toEqual(dataToUpdate.distance);
        })
        .expect(HttpStatus.OK);
    });

    // GET Motor with ID API test
    it(`/Get motor with specific ID`, () => {
      return request(app.getHttpServer())
        .get('/motors/1')
        .expect(({ body }) => {
          expect(body.id).toEqual(1);
          expect(body.name).toEqual(dataToUpdate.name);
          expect(body.age).toEqual(dataToUpdate.age);
          expect(body.distance).toEqual(dataToUpdate.distance);
          expect(body.city).toEqual(createMotorDto.city);
          expect(body.area).toEqual(dataToUpdate.area);
        })
        .expect(HttpStatus.OK);
    });

    // DELETE Motor with ID API test
    it(`/Remove motor with specific ID`, () => {
      return request(app.getHttpServer())
        .delete('/motors/1')
        .expect(({ body }) => {
          expect(body.message).toEqual('Delete with ID succeed.');
        })
        .expect(HttpStatus.OK);
    });
  });
});
