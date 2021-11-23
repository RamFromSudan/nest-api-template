import { Body, Controller, Post } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiErrorResDto } from 'src/common/dto/api-error.res.dto';
import { ApiSuccessResDto } from 'src/common/dto/api-success.res.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResDto } from './dto/login.res.dto';

@Controller('auth')
@ApiTags('Authentication')
@ApiExtraModels(LoginResDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Returns a JWT token for authentication' })
  @ApiSuccessResDto(200, LoginResDto)
  @ApiErrorResDto(401, 'Unauthorized')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    return this.authService.login(user);
  }
}
