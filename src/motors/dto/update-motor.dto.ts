import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateMotorDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'AAA-101',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: Number,
    required: false,
    example: 2,
  })
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty({
    type: Number,
    required: false,
    example: 300,
  })
  @IsNumber()
  @IsOptional()
  distance: number;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Kaohsiung',
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Sanmin',
  })
  @IsString()
  @IsOptional()
  area: string;
}
