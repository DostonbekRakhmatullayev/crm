import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';
import { Workers } from './workers.entities';
// import { Workers } from '';

@Entity({
  name: 'monthlymonth',
})
export class MonthlyMonth extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  monthlymonth_id: string;

  @Column({
    name: 'monthly_month_name',
    default: 0,
  })
  monthlymonth_name: string;

  @Column({
    name: 'monthly_month_money',
    default: 0,
  })
  monthlydaily_money: number;

  @Column({
    name: 'comment',
    default: 0,
  })
  comment: string;

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

  @ManyToOne(() => Workers, (workers) => workers.monthlyMonth)
  workers: Workers;
}
