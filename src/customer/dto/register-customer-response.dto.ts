import { AddressDto } from './register-customer.dto';

export class RegisterCustomerResponseDto {
  id!: string;
  firstName!: string;
  lastName?: string;
  age!: number;
  email!: string;
  contactNumber!: string;
  address!: AddressDto;
  createdAt!: Date;
  updatedAt!: Date;
}
