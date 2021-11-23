import { ValueTransformer } from 'typeorm';

export const decimalTransformer: ValueTransformer = {
  from: (dbValue) => {
    return parseFloat(dbValue);
  },
  to: (entityValue) => {
    return entityValue;
  },
};
