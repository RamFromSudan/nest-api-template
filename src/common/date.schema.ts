import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default class MutationDate {
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated: Date;
}
