import { IsString } from 'class-validator';

export class NewsUpdateDto {
  @IsString()
  readonly first_name?: string;

  @IsString()
  readonly last_name?: string;
  @IsString()
  readonly email?: string;

  @IsString()
  readonly password?: string;
}
