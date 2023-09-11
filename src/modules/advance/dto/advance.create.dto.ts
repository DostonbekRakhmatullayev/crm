import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class AdvanceCreateDto {
  @IsNumber()
  @IsNotEmpty()
  advance: number;

  @IsString()
  @IsNotEmpty()
  advance_name: string;

  @IsString()
  @IsNotEmpty()
  workers: string;
}
