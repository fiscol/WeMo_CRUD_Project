import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Motor {
  @ApiProperty({
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'ABC-123',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 1,
  })
  @Column()
  age: number;

  @ApiProperty({
    example: 150,
  })
  @Column()
  distance: number;

  @ApiProperty({
    example: 'Taipei',
  })
  @Column()
  city: string;

  @ApiProperty({
    example: 'Xinyi',
  })
  @Column()
  area: string;
}
