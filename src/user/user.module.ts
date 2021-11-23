import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { MailModule } from 'src/mail/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('APP_SECRET'),
          signOptions: { noTimestamp: true, expiresIn: '1d' },
        };
      },
    }),
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
