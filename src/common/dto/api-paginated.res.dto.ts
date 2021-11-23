import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiResDto } from './api.res.dto';

export const ApiPaginatedResDto = <TModel extends Type<any>>(
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
                properties: {
                  metadata: {
                    default: {
                      page: 1,
                      pageSize: 10,
                      totalPages: 5,
                    },
                  },
                  results: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              },
            },
          },
        ],
      },
    }),
  );
};
