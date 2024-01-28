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

@Entity({
  name: 'prize',
})
export class Prize extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  prize_id: string;

  @Column({
    name: 'prize',
  })
  prize: number;

  @Column({
    name: 'prize_text',
  })
  prize_text: string;

  @Column({
    name: 'isActive',
    default: 'isActive',
  })
  isActive: string;

  @ManyToOne(() => Workers, (workers) => workers.prize)
  workers: Workers;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
