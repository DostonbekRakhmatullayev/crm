import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'provinces',
})
export class Provinces extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  provinces_id: string;

  @Column({
    name: 'provinces_text',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  provinces_text: string;

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
}
