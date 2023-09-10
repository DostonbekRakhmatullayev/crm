import { IsString } from 'class-validator';

export class PricUpdateDto {
  @IsString()
  readonly price: number;
}
