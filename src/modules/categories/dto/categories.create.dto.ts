import { IsString, IsNotEmpty } from 'class-validator';

export class  CategoriesCreateDto{
  @IsString()
  @IsNotEmpty()
  categories_name: string;
}
