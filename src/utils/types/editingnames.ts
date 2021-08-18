import { ApiProperty } from '@nestjs/swagger';

export class EditingNames {
  @ApiProperty({
    type: String,
  })
  first_name: string;

  @ApiProperty({
    type: String,
  })
  last_name: string;
}
