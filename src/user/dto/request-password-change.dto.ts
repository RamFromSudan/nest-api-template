import { IsEmail, IsString } from 'class-validator';

export class RequestPasswordChangeDto {
  @IsString()
  username: string;
}
