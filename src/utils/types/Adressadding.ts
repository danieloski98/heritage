import { ApiProperty } from '@nestjs/swagger';

export class AddingWallet {
  @ApiProperty({
    type: String,
  })
  wallet: string;
}
