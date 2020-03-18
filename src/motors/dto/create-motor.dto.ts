import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMotorDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'ABC-123',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({
    type: Number,
    required: true,
    example: 150,
  })
  @IsNotEmpty()
  @IsNumber()
  distance: number;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Taipei',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Xinyi',
  })
  @IsNotEmpty()
  @IsString()
  area: string;
}
