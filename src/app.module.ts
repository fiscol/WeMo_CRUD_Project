import { Module } from '@nestjs/common';
import { MotorsModule } from './motors/motors.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MotorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
