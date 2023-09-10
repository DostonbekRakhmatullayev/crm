import { IsString } from 'class-validator';

export class PenaltyUpdateDto {
  @IsString()
  readonly price: number;
}
