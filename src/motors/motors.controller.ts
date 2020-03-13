import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateMotorDto } from './dto/create-motor.dto';
import { UpdateMotorDto } from './dto/update-motor.dto';
import { ListAllMotors } from './dto/list-all-motors.dto';
import { MotorsService } from './motors.service';
import { Motor } from './interfaces/motor.interface';


@Controller('motors')
export class MotorsController {
    constructor(private readonly motorsService: MotorsService) { }

    @Post()
    async create(@Body() createMotorDto: CreateMotorDto) {
        this.motorsService.create(createMotorDto);
        // return 'This action adds a new motor';
    }

    @Get()
    async findAll(): Promise<Motor[]> {
        return this.motorsService.findAll();
        // return `This action returns all motors (limit: ${query.limit} items)`;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} motor`;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateMotorDto: UpdateMotorDto) {
        return `This action updates a #${id} motor`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} motor`;
    }
}