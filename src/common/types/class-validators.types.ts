import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ClassValidator {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'firstName should be minimum of 3 letters' })
  @MaxLength(10)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 10)
  surname!: string;
}
