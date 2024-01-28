import { IsOptional, IsString } from 'class-validator';

export class PenaltyUpdateDto {
  @IsString()
  @IsOptional()
  readonly penalty: number;

  @IsString()
  @IsOptional()
  readonly penalty_name: string;

  @IsString()
  @IsOptional()
  readonly workers: string;
}
