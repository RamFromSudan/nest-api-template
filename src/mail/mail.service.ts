import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private config: ConfigService,
  ) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `${this.config.get('APP_URL')}/api/user/verify?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: `Welcome to ${this.config.get('APP_NAME')}!`,
      template: './confirmation',
      context: {
        name: user.username,
        url,
      },
    });
  }

  async sendForgotPassword(user: User, token: string) {
    const url = `${this.config.get(
      'UI_URL',
    )}/forgot-password?token=${token}&username=${user.username}`;
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: `${this.config.get('APP_NAME')} - Forgot Password`,
      template: './forgot-password',
      context: {
        name: user.username,
        url,
      },
    });
  }
}
