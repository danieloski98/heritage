import { ApiProperty } from '@nestjs/swagger';
import { COINTYPE } from 'src/utils/enums/cointype-enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rate {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    enum: COINTYPE,
  })
  @Column({
    type: 'enum',
    enum: COINTYPE,
  })
  coint_type: COINTYPE;

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
