import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public email: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public first_name: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public last_name: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public password: string;

  @ApiProperty({
    type: Number,
  })
  @Column()
  public role: number;

  @ApiProperty({
    type: String,
  })
  @Column()
  public createdAt: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  public updatedAt: string;
}
