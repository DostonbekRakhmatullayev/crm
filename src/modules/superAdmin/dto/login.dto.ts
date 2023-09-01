import { IsString, IsNotEmpty } from 'class-validator';

export class LoginValidator {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
