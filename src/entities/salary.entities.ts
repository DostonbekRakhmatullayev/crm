import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Workers } from './workers.entities';

@Entity({
  name: 'salary',
})
export class Salary extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  salary_id: string;

  @Column({
    name: 'salary_monthy',
  })
  salary_monthy: number;

  @Column({
    name: 'isActive',
    default: 'isActive',
  })
  isActive: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => Workers, (workers) => workers.salary)
  @JoinColumn({ name: 'worker_id' })
  workers: Workers;
}
