import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'categories',
})
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  name: string;
}
