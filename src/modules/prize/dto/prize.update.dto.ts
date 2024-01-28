import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PrizeUpdateDto {
  @IsNumber()
  @IsOptional()
  readonly prize: number;

  @IsString()
  @IsOptional()
  readonly prize_text: string;

  @IsString()
  @IsOptional()
  readonly workers_id: string;
}
