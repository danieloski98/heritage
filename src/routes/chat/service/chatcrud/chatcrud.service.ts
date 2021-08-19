import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/Entity/Chat.entity';
import { Message } from 'src/Entity/Message.entity';
import { User } from 'src/Entity/User.entity';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';
import { Repository } from 'typeorm';

@Injectable()
export class ChatcrudService {
  private logger = new Logger('CHATCRUDSEVICE');
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
  ) {}

  public async sendMessage(
    user_id: string,
    message: Message,
  ): Promise<ReturnTypeInterfcae> {
    try {
      // check for chat
      const chat = await this.chatRepo.findOne({ where: { user_id } });
      if (chat !== undefined) {
        // create the message
        const newmessage = await this.messageRepo.save({
          ...message,
          chat_id: chat.id,
        });
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Message sent',
          data: newmessage,
        });
      } else {
        // create the chat
        const newchat = await this.chatRepo.save({
          user_id,
        });
        this.logger.log(newchat);
        // get the chat
        const createdchat = await this.chatRepo.findOne({ where: { user_id } });
        const newmessage = await this.messageRepo.save({
          ...message,
          chat_id: createdchat.id,
        });
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Message sent',
          data: newmessage,
        });
      }
    } catch (error) {
      this.logger.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server error',
        trace: error,
      });
    }
  }

  public async getUserMessages(user_id: string): Promise<ReturnTypeInterfcae> {
    try {
      const chats = await this.chatRepo.find({
        where: { user_id },
        relations: ['messages'],
      });
      if (chats.length < 1) {
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'You have no messages',
        });
      }

      return Return({
        error: false,
        statusCode: 200,
        data: chats,
      });
    } catch (error) {
      this.logger.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server error',
        trace: error,
      });
    }
  }

  public async getAdminChats(): Promise<ReturnTypeInterfcae> {
    try {
      const chats = await this.chatRepo.find({
        relations: ['messages'],
      });
      return Return({
        error: false,
        statusCode: 200,
        data: chats,
      });
    } catch (error) {
      this.logger.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server error',
        trace: error,
      });
    }
  }

  public async getMessages(chat_id: string): Promise<ReturnTypeInterfcae> {
    try {
      const messages = await this.messageRepo.find({ where: { chat_id } });
      return Return({
        error: false,
        statusCode: 200,
        data: messages,
      });
    } catch (error) {
      this.logger.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server error',
        trace: error,
      });
    }
  }
}
