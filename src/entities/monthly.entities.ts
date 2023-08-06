import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Workers } from './workers.entities';

@Entity({
  name: 'monthly',
})
export class Monthly {
  @PrimaryGeneratedColumn('uuid')
  provinces_id: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  name: string;
  @ManyToOne(() => Workers, (workers) => workers.monthly)
  workers: Workers;
}
