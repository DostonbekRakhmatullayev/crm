import { IsString } from 'class-validator';

export class CreateWorkersDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  date_of_birth: string;

  @IsString()
  password: string;

  @IsString()
  gender: string;

  @IsString()
  phone_number: string;

  @IsString()
  personal_information: string;

  @IsString()
  personal_data: string;

  @IsString()
  categories: string;

  @IsString()
  provinces: string;
}
