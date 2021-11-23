import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { compare } from 'bcrypt';
import { EntityManager } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly em: EntityManager) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(req, username: string, password: string): Promise<any> {
    const user = await this.em.findOne(User, { where: { apiKey: username } });

    if (user) {
      if (password === user.secret) {
        return user;
      }
    }
    throw new UnauthorizedException('Invalid API Key');
  }
}
