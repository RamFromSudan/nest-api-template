import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetadata {
  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  total: number;
}

export class PaginationResDto<T> {
  @ApiProperty()
  metadata: PaginationMetadata;

  @ApiProperty()
  results: T[];

  constructor(required: Required<PaginationResDto<T>>) {
    Object.assign(this, required);
  }
}
