import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Message } from 'src/Entity/Message.entity';
import { ChatcrudService } from './service/chatcrud/chatcrud.service';

@Controller('chat')
export class ChatController {
  constructor(private chatservice: ChatcrudService) {}

  @ApiTags('CHATS')
  @ApiParam({ name: 'user_id' })
  @ApiBody({ type: Message })
  @Post(':user_id')
  async sendmessage(
    @Res() res: Response,
    @Body() body: Message,
    @Param() param: any,
  ) {
    const result = await this.chatservice.sendMessage(param['user_id'], body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('CHATS')
  @ApiParam({ name: 'user_id' })
  @Get('user/messages/:user_id')
  async usergetmessage(@Res() res: Response, @Param() param: any) {
    const result = await this.chatservice.getUserMessages(param['user_id']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('CHATS')
  @Get('admin/messages')
  async admingetmessage(@Res() res: Response) {
    const result = await this.chatservice.getAdminChats();
    res.status(result.statusCode).send(result);
  }

  @ApiTags('CHATS')
  @ApiParam({ name: 'chat_id' })
  @Get('chat/messages/:chat_id')
  async getmessage(@Res() res: Response, @Param() param: any) {
    const result = await this.chatservice.getMessages(param['chat_id']);
    res.status(result.statusCode).send(result);
  }
}
