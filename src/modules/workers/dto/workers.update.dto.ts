import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly first_name: string;

  @IsString()
  readonly last_name: string;

  @IsString()
  readonly date_of_birth: Date;

  @IsString()
  readonly password: string;

  @IsString()
  readonly gender: string;

  @IsString()
  readonly phone_number: string;

  @IsString()
  readonly personal_information: string;

  @IsString()
  readonly personal_data: string;

  @IsString()
  readonly categories: string;

  @IsString()
  readonly provinces: string;
}
