import { IsString, IsNotEmpty } from 'class-validator';

export class PenaltyCreateDto {
  @IsString()
  @IsNotEmpty()
  price: number;
}
