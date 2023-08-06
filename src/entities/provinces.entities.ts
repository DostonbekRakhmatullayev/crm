import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'provinces',
})
export class Provinces {
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
}
