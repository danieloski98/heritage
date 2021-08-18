import { Module } from '@nestjs/common';
import { WalletController } from './wallet/wallet.controller';
import { CrudService } from './services/crud/crud.service';

@Module({
  controllers: [WalletController],
  providers: [CrudService]
})
export class WalletModule {}
