import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Support, SupportSchema } from 'src/Schemas/Support.Schema';
import { SupportService } from './service/support/support.service';
import { SupportController } from './support.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Support.name, schema: SupportSchema }]),
  ],
  controllers: [SupportController],
  providers: [SupportService],
})
export class SupportModule {}
