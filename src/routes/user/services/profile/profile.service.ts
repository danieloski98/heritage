import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entity/User.entity';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';
import { Repository } from 'typeorm';
import { object, string } from 'joi';

@Injectable()
export class ProfileService {
  logger = new Logger();
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  public async getUserDetails(id: string): Promise<ReturnTypeInterfcae> {
    try {
      const user = await this.userRepo.findOne({
        where: { id },
        relations: ['banks', 'wallets', 'transactions'],
      });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'User found',
        data: user,
      });
    } catch (error) {
      this.logger.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  public async editName(
    id: string,
    names: { first_name: string; last_name: string },
  ): Promise<ReturnTypeInterfcae> {
    try {
      // validation object
      const obj = object({
        first_name: string().trim(),
        last_name: string().trim(),
      });

      const validationResult = await obj.validate(names);

      if (validationResult.error) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: validationResult.error.message,
          trace: validationResult.error,
        });
      }

      // updated
      const updated = await this.userRepo.update({ id }, names);
      this.logger.log(updated);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Names updated',
      });
    } catch (error) {
      this.logger.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }
}
