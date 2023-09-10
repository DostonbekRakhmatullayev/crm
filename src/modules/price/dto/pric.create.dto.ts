import { IsString, IsNotEmpty } from 'class-validator';

export class PricCreateDto {
  @IsString()
  @IsNotEmpty()
  price: number;
}
