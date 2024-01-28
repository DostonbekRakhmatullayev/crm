import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DailyUpdateDto {
  @IsNumber()
  @IsOptional()
  readonly advance: number;

  @IsString()
  @IsOptional()
  readonly advance_name: string;
}
