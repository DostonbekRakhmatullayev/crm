import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'admin',
})
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  admin_id: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  first_name: string;
  @Column({
    name: 'level',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  level: string;

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

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
