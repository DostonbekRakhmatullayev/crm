import { IsString, IsNotEmpty } from 'class-validator';

export class salaryCreateDto {
  @IsString()
  @IsNotEmpty()
  price_id: string;

  @IsString()
  @IsNotEmpty()
  workers_id: string;
}
