import { ApiProperty } from '@nestjs/swagger';

export class GetUserResDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  joinedDate: Date;

  constructor(required: Required<GetUserResDto>) {
    Object.assign(this, required);
  }
}
