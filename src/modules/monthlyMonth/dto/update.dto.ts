import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDto {
  @IsNumber()
  @IsOptional()
  readonly monthlydaily_money: number;

  @IsString()
  @IsOptional()
  readonly comment: string;

  @IsString()
  @IsOptional()
  readonly monthlymonth_name: string;

  @IsString()
  @IsOptional()
  readonly workers: string;
}
