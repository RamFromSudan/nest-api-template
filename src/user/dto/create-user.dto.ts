import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsEmail()
  @ApiProperty()
  email: string;
}
