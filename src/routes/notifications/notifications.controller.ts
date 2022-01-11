import { Controller, Get, Param, Put, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GeneralService } from './services/general/general.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private generalService: GeneralService) {}

  @ApiTags('NOTIFICATION')
  @ApiParam({ type: String, name: 'id' })
  @Put(':id')
  async markAsRead(@Res() res: Response, @Param() param: any) {
    const result = await this.generalService.markAsRead(param['id']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('NOTIFICATION')
  @ApiParam({ type: String, name: 'user_id' })
  @Get('user/:user_id')
  async getNotificationUser(@Res() res: Response, @Param() param: any) {
    const result = await this.generalService.getUserNotification(
      param['user_id'],
    );
    res.status(result.statusCode).send(result);
  }

  @ApiTags('NOTIFICATION')
  @Get('admin')
  async getNotificationAdmin(@Res() res: Response) {
    const result = await this.generalService.getAdminNotification();
    res.status(result.statusCode).send(result);
  }
}
