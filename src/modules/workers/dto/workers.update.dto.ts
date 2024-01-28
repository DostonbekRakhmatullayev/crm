import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly first_name: string;

  @IsString()
  @IsOptional()
  readonly last_name: string;

  @IsString()
  @IsOptional()
  readonly date_of_birth: Date;

  @IsString()
  @IsOptional()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly gender: string;

  @IsString()
  @IsOptional()
  readonly phone_number: string;

  @IsString()
  @IsOptional()
  readonly personal_information: string;

  @IsString()
  @IsOptional()
  readonly personal_data: string;

  @IsString()
  @IsOptional()
  readonly categories: string;

  @IsString()
  @IsOptional()
  readonly provinces: string;
}
