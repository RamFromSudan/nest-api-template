import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginResDto } from './dto/login.res.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user) {
      if (await compare(pass, user.password)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, pin, apiKey, secret, ...result } = user;
        return result;
      }
      throw new UnauthorizedException({
        message: 'Invalid username/password',
      });
    }
    throw new UnauthorizedException({ message: 'Invalid username/password' });
  }

  async login(user: User) {
    return new LoginResDto({
      accessToken: this.jwtService.sign({
        userId: user.id,
        username: user.username,
      }),
    });
  }
}
