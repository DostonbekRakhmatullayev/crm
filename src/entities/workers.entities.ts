import { Entity, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
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
    name: 'password',
  })
  images: string;

  @OneToMany(() => Monthly, (monthly) => monthly.workers)
  monthly: Monthly[];
}
