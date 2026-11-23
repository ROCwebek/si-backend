import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, { message: 'name should not be blank' })
  @MaxLength(50)
  name: string;
}
