import { IsString, IsNotEmpty } from 'class-validator';

export class PenaltyCreateDto {
  @IsString()
  @IsNotEmpty()
  penalty: number;

  @IsString()
  @IsNotEmpty()
  penalty_name: string;

  @IsString()
  @IsNotEmpty()
  workers: string;
}
