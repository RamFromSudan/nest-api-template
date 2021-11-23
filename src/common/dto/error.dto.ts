import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({ default: 'fail' })
  status: string;
  @ApiProperty({ default: 'Error message' })
  message: string;

  constructor(required: Required<ErrorDto>) {
    Object.assign(this, required);
  }
}
