import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/Schemas/Admin.Schema';
import { Return, ReturnTypeInterfcae } from 'src/utils/types/returnType';
import { compareSync, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import * as joi from 'joi';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const adminValidationSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  fullname: joi.string().required(),
  phone: joi.string().required(),
  role: joi.number().max(3).min(1),
});

@Injectable()
export class CrudService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  // login admin
  async login(details: Admin): Promise<ReturnTypeInterfcae> {
    try {
      const admin = await this.adminModel.findOne({ email: details.email });
      if (admin === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Email Or password does not match!',
        });
      }
      // check password
      const passwordMatch = await compareSync(details.password, admin.password);
      if (!passwordMatch) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Email Or password does not match',
        });
      }
      // generate token
      const obj = {
        ...details,
        _id: admin._id,
      };
      const token = sign(obj, process.env.JWTSECRET, {
        algorithm: 'HS256',
        expiresIn: '4h',
      });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Login Successful',
        data: {
          user: admin,
          token,
        },
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

  // create admin
  async createAdmin(details: Admin): Promise<ReturnTypeInterfcae> {
    try {
      const emailCheck = await this.adminModel.find({ email: details.email });
      const phoneCheck = await this.adminModel.find({ phone: details.phone });
      if (emailCheck.length > 0) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Email Already in use',
        });
      }

      if (phoneCheck.length > 0) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'phone Already in use',
        });
      }
      details.email.toLowerCase();
      // verify details sent
      const verification = adminValidationSchema.validate(details);
      if (verification.error) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: verification.error.message,
          trace: verification.error,
        });
      }
      const salt = await genSalt(10);
      const newPassword = await hash(details.password, salt);
      const newAdmin = await this.adminModel.create({
        ...details,
        password: newPassword,
        isSuperAdmin: details.role === 3 ? true : false,
      });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Admin account created successfully',
        data: newAdmin,
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

  async getAdminById(_id: string): Promise<ReturnTypeInterfcae> {
    try {
      const admin = await this.adminModel.findById(_id);
      if (admin === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Admin not found',
        });
      }

      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Account found',
        data: admin,
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

  async getAdmins(id: string): Promise<ReturnTypeInterfcae> {
    try {
      const admins = await this.adminModel.find({ _id: id });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Accounts found',
        data: admins,
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

  async getAdmin(): Promise<ReturnTypeInterfcae> {
    try {
      const admins = await this.adminModel.find();
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Accounts found',
        data: admins,
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

  async editAdmin(_id: string, param: Admin): Promise<ReturnTypeInterfcae> {
    try {
      const admins = await this.adminModel.find({ _id });
      if (admins.length < 1) {
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Accounts found',
          data: admins,
        });
      }

      const update = await this.adminModel.updateOne({ _id }, { ...param });
      console.log(update);

      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Updated',
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
