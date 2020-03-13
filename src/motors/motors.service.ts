import { Injectable } from '@nestjs/common';
import { Motor } from './interfaces/motor.interface';

@Injectable()
export class MotorsService {
    private readonly motors: Motor[] = [];

    create(cat: Motor) {
        this.motors.push(cat);
    }

    findAll(): Motor[] {
        return this.motors;
    }
}
