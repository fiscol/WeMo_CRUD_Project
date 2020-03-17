import { ApiProperty } from '@nestjs/swagger';

export class CreateMotorDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'ABC-123',
  })
  name: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 1,
  })
  age: number;

  @ApiProperty({
    type: Number,
    required: true,
    example: 150,
  })
  distance: number;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Taipei',
  })
  city: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Xinyi',
  })
  area: string;
}
