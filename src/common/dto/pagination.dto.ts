import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({ description: 'Number of rows per page' })
  readonly pageSize: string = '0';

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({ description: 'Page index' })
  readonly page: string = '20';
}
