import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class DailyCreateDto {
  @IsNumber()
  @IsNotEmpty()
  daily: number;

  @IsString()
  @IsNotEmpty()
  workers: string;
}
