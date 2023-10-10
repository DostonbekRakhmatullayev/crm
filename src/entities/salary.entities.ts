import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { Workers } from './workers.entities';

@Entity({
  name: 'salary',
})
export class Salary extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  salary_id: string;

  @Column({
    name: 'salary_name',
  })
  salary_name: number;

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
  @JoinColumn()
  workers: Workers;
}
