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
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateMotorDto } from './dto/create-motor.dto';
import { UpdateMotorDto } from './dto/update-motor.dto';
import { MotorsService } from './motors.service';
import { Motor } from './motor.entity';
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
  constructor(private readonly motorsService: MotorsService) {}

  @Post()
  @ApiBody({ type: CreateMotorDto })
  @ApiCreatedResponse({
    status: 201,
    description: 'The motor record has been successfully created.',
    type: Motor,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createMotorDto: CreateMotorDto, @Response() res) {
    await this.motorsService
      .create(createMotorDto)
      .then(result => {
        // return result;
        res.status(HttpStatus.CREATED).json(result);
      })
      .catch(error => {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
  }

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
        // return result;
        res.status(HttpStatus.OK).json(result);
      })
      .catch(error => {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
  }

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
        // return result;
        res.status(HttpStatus.OK).json(result);
      })
      .catch(error => {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateMotorDto })
  @ApiResponse({
    status: 200,
    description: 'Update motor information completed.',
    type: Motor,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: number,
    @Body() updateMotorDto: UpdateMotorDto,
    @Response() res,
  ) {
    await this.motorsService
      .update(id, updateMotorDto)
      .then(result => {
        // return result;
        res.status(HttpStatus.OK).json(result);
      })
      .catch(error => {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
  }

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
        // return result;
        res.status(HttpStatus.OK).json(result);
      })
      .catch(error => {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
  }
}
