import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'provinces',
})
export class Provinces {
  @PrimaryGeneratedColumn('uuid')
  provinces_id: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  name: string;
}
