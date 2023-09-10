import { IsString } from 'class-validator';

export class PenaltyUpdateDto {
  @IsString()
  readonly penalty: number;

  @IsString()
  readonly penalty_name: string;

  @IsString()
  readonly workers: string;
}
