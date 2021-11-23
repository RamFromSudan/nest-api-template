import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/create-user.dto';
import {
  ApiBasicAuth,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RequestPasswordChangeDto } from './dto/request-password-change.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { BasicAuthGuard } from 'src/auth/guards/basic.guard';
import { JwtOrBasicAuthGuard } from 'src/auth/guards/jwt-or-basic.guard';
import { ApiSuccessResDto } from 'src/common/dto/api-success.res.dto';
import { GetUserResDto } from './dto/get-user.res.dto';
import { ApiErrorResDto } from 'src/common/dto/api-error.res.dto';

@Controller('user')
@ApiTags('User')
@ApiExtraModels(GetUserResDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registers a new user' })
  @ApiSuccessResDto(201, GetUserResDto)
  @ApiErrorResDto(400, 'Invalid data provided')
  create(@Body() registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }

  @Get('verify')
  verify(@Query('token') token: string) {
    return this.userService.verifyEmail(token);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.ACCEPTED)
  forgotPassword(@Body() dto: RequestPasswordChangeDto) {
    return this.userService.requestPasswordChange(dto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.userService.resetPassword(dto);
  }

  @Get()
  @UseGuards(JwtOrBasicAuthGuard)
  @ApiBasicAuth()
  @ApiSuccessResDto(200, GetUserResDto)
  @ApiErrorResDto(401, 'Unauthorized')
  getUser(@Request() req) {
    return this.userService.getUser(req.user.id);
  }
}
