import { Admin } from './../../../entities/admin.entities';
import { IsOptional, IsString } from 'class-validator';

export class AdminUpdateDto {
  @IsString()
  @IsOptional()
  readonly first_name?: string;

  @IsString()
  @IsOptional()
  readonly last_name?: string;
  
  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly password?: string;
}
