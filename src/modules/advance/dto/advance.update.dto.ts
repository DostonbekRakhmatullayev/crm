import { IsNumber, IsString } from 'class-validator';

export class AdvanceUpdateDto {
  @IsNumber()
  readonly advance: number;

  @IsString()
  readonly advance_name: string;
}
