import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class PrizeCreateDto {
  @IsNumber()
  @IsNotEmpty()
  prize: number;

  @IsString()
  @IsNotEmpty()
  prize_text: string;

  @IsString()
  @IsNotEmpty()
  workers_id: string;
}
