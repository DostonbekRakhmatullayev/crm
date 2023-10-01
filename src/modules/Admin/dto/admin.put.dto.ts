import { Admin } from './../../../entities/admin.entities';
import { IsString } from 'class-validator';

export class AdminUpdateDto {
  @IsString()
  readonly first_name?: string;

  @IsString()
  readonly last_name?: string;
  @IsString()
  readonly email?: string;

  @IsString()
  readonly password?: string;
}
