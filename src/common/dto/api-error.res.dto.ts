import { applyDecorators } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ErrorDto } from './error.dto';

export const ApiErrorResDto = (status: number, message: string) => {
  return applyDecorators(
    ApiResponse({
      status: status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ErrorDto) },
          { properties: { message: { default: message } } },
        ],
      },
    }),
  );
};
