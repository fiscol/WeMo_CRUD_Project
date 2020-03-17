import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motor } from './motors/motor.entity';
import { MotorsModule } from './motors/motors.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-1.cr5lwvldzqx7.ap-northeast-1.rds.amazonaws.com',
      port: 3306,
      username: 'wemo',
      password: 'wemoscooter',
      database: 'wemo_db',
      entities: [Motor],
      autoLoadEntities: true,
      synchronize: true,
    }),
    MotorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
