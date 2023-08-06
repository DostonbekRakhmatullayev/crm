import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'supperadmin',
})
export class SupperAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}
