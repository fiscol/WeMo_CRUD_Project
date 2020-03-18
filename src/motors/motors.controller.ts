import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Response,
  UseFilters,
  UsePipes,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { CreateMotorDto } from './dto/create-motor.dto';
import { UpdateMotorDto } from './dto/update-motor.dto';
import { MotorsService } from './motors.service';
import { Motor } from './motor.entity';
import { ValidationPipe } from './pipes/validation.pipe'
import { HttpExceptionFilter } from '../http-exception.filter';
import {
  ApiTags,
  ApiBody,
  ApiParam,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('motors')
@Controller('motors')
@UseFilters(new HttpExceptionFilter())
export class MotorsController {
  constructor(private readonly motorsService: MotorsService) { }

  // POST(create) a motor API
  @Post()
  @UsePipes(ValidationPipe)
  @ApiBody({ type: CreateMotorDto })
  @ApiCreatedResponse({
    status: 201,
    description: 'The motor record has been successfully created.',
    type: Motor,
  })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body(new ValidationPipe()) createMotorDto: CreateMotorDto, @Response() res) {
    await this.motorsService
      .create(createMotorDto)
      .then(result => {
        res.status(HttpStatus.CREATED).json(result);
      })
      .catch(error => {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
  }

  // GET all motors API
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Received motor records.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(@Response() res) {
    await this.motorsService
      .findAll()
      .then(result => {
        res.status(HttpStatus.OK).json(result);
      })
      .catch(error => {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
  }

  // GET a motor with ID API
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Received specific motor record.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: number, @Response() res) {
    await this.motorsService
      .findOne(id)
      .then(result => {
        res.status(HttpStatus.OK).json(result);
      })
      .catch(error => {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
  }

  // UPDATE a motor with ID API
  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateMotorDto })
  @ApiResponse({
    status: 200,
    description: 'Update motor information completed.',
    type: Motor,
  })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateMotorDto: UpdateMotorDto,
    @Response() res,
  ) {
    await this.motorsService
      .update(id, updateMotorDto)
      .then(result => {
        res.status(HttpStatus.OK).json(result);
      })
      .catch(error => {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
  }

  // DELETE a motor with ID API
  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Delete with motor id succeed.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: number, @Response() res) {
    await this.motorsService
      .remove(id)
      .then(result => {
        res.status(HttpStatus.OK).json(result);
      })
      .catch(error => {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
  }
}
