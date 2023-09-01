import { IsString, IsNotEmpty } from 'class-validator';

export class ProvicesCreateDto {
  @IsString()
  @IsNotEmpty()
  provinces_text: string;
}
