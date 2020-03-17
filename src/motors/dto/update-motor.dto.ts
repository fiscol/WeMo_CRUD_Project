import { ApiProperty } from '@nestjs/swagger';

export class UpdateMotorDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'AAA-101',
  })
  name: string;

  @ApiProperty({
    type: Number,
    required: false,
    example: 2,
  })
  age: number;

  @ApiProperty({
    type: Number,
    required: false,
    example: 300,
  })
  distance: number;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Kaohsiung',
  })
  city: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Sanmin',
  })
  area: string;
}
