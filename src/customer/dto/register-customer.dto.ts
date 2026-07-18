import { Exclude, Transform, Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class AddressDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  street!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  postCode!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsDefined()
  @IsString()
  @IsOptional()
  county?: string;
}

export class RegisterCustomerDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'first name should be atleast 3 letters' })
  @MaxLength(100)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100, { message: 'last name should not exceed 100 letters' })
  @IsOptional()
  lastName?: string;

  @IsDefined()
  @IsInt()
  @IsPositive()
  @Min(18, { message: 'age should be atleast 18' })
  @Max(100, {
    message: 'you have acheived enough in life sir, Take a chill pill',
  })
  age!: number;

  @IsDefined()
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  email!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  @MinLength(6)
  @Matches(/[A-Z]/, {
    message: 'Password should contain atleast one uppercase',
  })
  @Matches(/[a-z]/, {
    message: 'Password should contain atleast one lowercase',
  })
  @Matches(/[0-9]/, {
    message: 'Password should contain atleast one number',
  })
  //   @Exclude()
  password!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  contactNumber!: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address!: AddressDto;
}
