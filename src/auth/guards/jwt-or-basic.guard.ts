import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOrBasicAuthGuard extends AuthGuard(['basic', 'jwt']) {}
