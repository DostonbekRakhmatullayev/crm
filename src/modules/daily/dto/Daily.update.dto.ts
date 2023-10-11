import { IsNumber, IsString } from 'class-validator';

export class MonthlyDailyUpdateDto {
  @IsNumber()
  readonly advance: number;

  @IsString()
  readonly advance_name: string;
}
