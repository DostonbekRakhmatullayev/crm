import { IsString, IsNotEmpty } from 'class-validator';

export class SuperAdminValidator {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  date_of_birth: Date;

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
