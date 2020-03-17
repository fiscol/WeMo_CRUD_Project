import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorsController } from './motors.controller';
import { MotorsService } from './motors.service';
import { Motor } from './motor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Motor])],
  controllers: [MotorsController],
  providers: [MotorsService],
  exports: [MotorsService, TypeOrmModule],
})
export class MotorsModule {}
