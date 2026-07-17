import { Exclude, Expose, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

enum Gender {
  male = 'Male',
  female = 'Female',
  others = 'Others',
}

class Address {
  @IsString()
  @IsNotEmpty()
  street!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  postCode!: string;

  @IsString()
  country?: string;
}

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

  @IsString()
  @IsNotEmpty()
  @Expose()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/[A-Z]/, {
    message: 'Password should contain atleast one uppercase',
  })
  @Matches(/[a-z]/, {
    message: 'Password should contain atleast one lowercase',
  })
  @Matches(/[0-9]/, {
    message: 'Password should contain atleast one number',
  })
  @Exclude()
  password!: string;

  @IsEnum(Gender)
  gender!: Gender;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  skills!: string[];

  @ValidateNested()
  @Type(() => Address)
  address!: Address;
}
