import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserauthModule } from './routes/userauth/userauth.module';
import { UserModule } from './routes/user/user.module';
import { WalletModule } from './routes/wallet/wallet.module';
import { BankModule } from './routes/bank/bank.module';
import { TransactionModule } from './routes/transaction/transaction.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ChatModule } from './routes/chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

console.log();
const url =
  process.env.NODE_ENV === 'development'
    ? process.env.LOCAL_MONGODB
    : process.env.LIVE_MONGODB;
@Module({
  imports: [
    MongooseModule.forRoot(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      database: process.env.MYSQL_DATABASE,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
      entityPrefix: 'HT_',
      autoLoadEntities: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: 465,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UserauthModule,
    UserModule,
    WalletModule,
    BankModule,
    TransactionModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
