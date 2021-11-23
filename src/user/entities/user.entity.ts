import { Exclude } from 'class-transformer';
import MutationDate from 'src/common/date.schema';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  pin: string;

  @Column()
  apiKey: string;

  @Column()
  secret: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Column({ type: 'timestamp with time zone', nullable: true })
  dateVerified: Date;

  @Column(() => MutationDate)
  date: MutationDate;
}
