import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiResDto } from './api.res.dto';

export const ApiSuccessResDto = <TModel extends Type<any>>(
  status: number,
  model: TModel,
) => {
  return applyDecorators(
    ApiResponse({
      status: status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResDto) },
          {
            properties: {
              status: { default: 'success' },
              data: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
  );
};
