import { IsString } from 'class-validator';

export class ProvicesUpdateDto {
  @IsString()
  readonly provinces_text?: string;
}
