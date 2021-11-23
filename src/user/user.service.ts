import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { EntityManager } from 'typeorm';
import { hash } from 'bcrypt';
import { RegisterDto } from './dto/create-user.dto';
import { RequestPasswordChangeDto } from './dto/request-password-change.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GetUserResDto } from './dto/get-user.res.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: RegisterDto) {
    let user = await this.em.findOne(User, {
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });

    if (user) {
      throw new BadRequestException('Username or email has already been used');
    }

    user = this.em.create(User, {
      username: createUserDto.username,
      email: createUserDto.email,
      password: await hash(createUserDto.password, 10),
      apiKey: randomBytes(16).toString('hex'),
      secret: await hash(randomBytes(32).toString('hex'), 10),
    });

    user = await this.em.save(user);
    this._generateToken(user).then((token) => {
      this.mailService.sendUserConfirmation(user, token);
    });

    return new GetUserResDto({
      username: user.username,
      email: user.email,
      joinedDate: user.dateVerified,
      status: user.status,
    });
  }

  async requestPasswordChange(dto: RequestPasswordChangeDto) {
    const user = await this.findByUsername(dto.username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this._generateToken(user).then((token) => {
      this.mailService.sendForgotPassword(user, token);
    });

    return user;
  }

  async resetPassword(dto: ResetPasswordDto) {
    const jwtUser = this._decodeToken(dto.token);
    const user = await this.findOne(jwtUser.userId);

    if (!user || user.username !== dto.username) {
      throw new BadRequestException('Invalid token');
    }
    this.em.update(User, user.id, user);

    return user;
  }

  async verifyEmail(token: string) {
    const payload = this._decodeToken(token);
    if (payload === null) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
    const user = await this.em.findOne(User, {
      where: { id: payload.userId, dateVerified: null },
    });

    if (user) {
      user.dateVerified = new Date();
      this.em.save(user);
      return true;
    }
    throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
  }

  async findByUsername(username: string) {
    return await this.em.findOne(User, {
      where: {
        username: username,
      },
    });
  }

  async getUser(id: number) {
    const user = await this.em.findOne(User, id);
    return new GetUserResDto({
      username: user.username,
      email: user.email,
      joinedDate: user.dateVerified,
      status: user.status,
    });
  }

  async findOne(id: number) {
    const user = await this.em.findOne(User, id);
    return user;
  }

  private async _generateToken(user: User) {
    const payload = { userId: user.id, username: user.username };
    return this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });
  }

  private _decodeToken(token: string) {
    const jwtUser = <any>this.jwtService.decode(token, { json: true });
    if (jwtUser?.userId && jwtUser?.username) {
      return jwtUser;
    }
    throw new BadRequestException('Invalid token');
  }
}
