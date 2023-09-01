import { IsString } from 'class-validator';

export class categoriesUpdateDto {
  @IsString()
  readonly categories_name?: string;
}
