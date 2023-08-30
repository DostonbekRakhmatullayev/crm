import {
  Entity,
  ManyToOne,
  OneToMany,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Categories } from './categories.entities';
import { Monthly } from './monthly.entities';

@Entity({
  name: 'workers',
})
export class Workers {
  @PrimaryGeneratedColumn('uuid')
  workers_id: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  first_name: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 100,
  })
  last_name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 150,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 200,
  })
  password: string;

  @Column({
    type: 'text',
    name: 'images',
  })
  images: string;

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

  @OneToMany(() => Monthly, (monthly) => monthly.workers)
  monthly: Monthly[];

  @ManyToOne(() => Categories, (categories) => categories.workers)
  categories: Categories;
}
