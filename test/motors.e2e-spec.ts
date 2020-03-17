import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { MotorsModule } from '../src/motors/motors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorsService } from '../src/motors/motors.service';
import { CreateMotorDto } from '../src/motors/dto/create-motor.dto';
import { UpdateMotorDto } from '../src/motors/dto/update-motor.dto';
import { Motor } from '../src/motors/motor.entity';
import { INestApplication, HttpStatus } from '@nestjs/common';

describe('Motors', () => {
  let app: INestApplication;
  let motorsService: MotorsService;

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

  afterAll(async () => {
    await app.close();
  });

  describe('Motors API E2E Check', () => {
    const createMotorDto: CreateMotorDto = {
      name: 'ABC-001',
      age: 1,
      distance: 0,
      city: 'Taipei',
      area: 'Daan',
    };

    it(`/POST motor`, () => {
      return request(app.getHttpServer())
        .post('/motors')
        .set('Accept', 'application/json')
        .send(createMotorDto)
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

    const dataToUpdate = new UpdateMotorDto();
    dataToUpdate.name = 'AAA-111';
    dataToUpdate.age = 3;
    dataToUpdate.distance = 35000;

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

    it(`/Get motor with specific ID`, () => {
      return request(app.getHttpServer())
        .get('/motors/1')
        .expect(({ body }) => {
          expect(body.id).toEqual(1);
          expect(body.name).toEqual(dataToUpdate.name);
          expect(body.age).toEqual(dataToUpdate.age);
          expect(body.distance).toEqual(dataToUpdate.distance);
          expect(body.city).toEqual(createMotorDto.city);
          expect(body.area).toEqual(createMotorDto.area);
        })
        .expect(HttpStatus.OK);
    });

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
