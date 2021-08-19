import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatcrudService } from './service/chatcrud/chatcrud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entity/User.entity';
import { Chat } from 'src/Entity/Chat.entity';
import { Message } from 'src/Entity/Message.entity';
import { Admin } from 'src/Entity/Admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Chat, Message, Admin])],
  controllers: [ChatController],
  providers: [ChatcrudService],
})
export class ChatModule {}
