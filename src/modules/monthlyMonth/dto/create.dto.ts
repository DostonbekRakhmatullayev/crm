import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNumber()
  @IsNotEmpty()
  monthlydaily_money: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  workers: string;

  @IsString()
  @IsNotEmpty()
  monthlymonth_name: string;
}
