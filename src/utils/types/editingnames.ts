import { ApiProperty } from '@nestjs/swagger';

export class EditingDetails {
  @ApiProperty({
    type: String,
  })
  bitcoin_wallet: string;

  @ApiProperty({
    type: String,
  })
  ethereum_wallet: string;

  @ApiProperty({
    type: String,
  })
  usdt_wallet: string;

  @ApiProperty({
    type: String,
  })
  account_name: string;

  @ApiProperty({
    type: String,
  })
  account_number: string;

  @ApiProperty({
    type: String,
  })
  bank_name: string;
}

export class EditingNames {
  @ApiProperty({
    type: String,
  })
  first_name: string;

  @ApiProperty({
    type: String,
  })
  last_name: string;

  @ApiProperty({
    type: String,
  })
  phone: string;
}
