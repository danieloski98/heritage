import { Injectable } from '@nestjs/common';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';
import { HttpService } from '@nestjs/axios';
import * as axios from 'axios';
import { decode } from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class VerificationService {
  private URL = 'https://api.paystack.co';
  constructor(private httpService: HttpService) {}

  async getAllBanks(): Promise<ReturnTypeInterfcae> {
    try {
      const request = await axios.default.get(
        `${this.URL}/bank?country=nigeria`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
          },
        },
      );

      if (request.status !== 200) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: request.data.message,
          trace: request.data,
        });
      }
      return Return({
        error: false,
        statusCode: 200,
        successMessage: request.data.message,
        data: request.data.data,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  async resolveAccount(
    account_number: string,
    bank_code: string,
  ): Promise<ReturnTypeInterfcae> {
    try {
      const request = await axios.default.get(
        `${this.URL}/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
          },
        },
      );

      if (request.status !== 200) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: request.data.message,
          trace: request.data,
        });
      }
      return Return({
        error: false,
        statusCode: 200,
        successMessage: request.data.message,
        data: request.data.data,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }
}
