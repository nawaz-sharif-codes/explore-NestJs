export class RegisterUserDto {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  contactNumber!: string;
  address!: UserAddress;
}

export class UserAddress {
  street!: string;
  city!: string;
  postCode!: string;
  county!: string;
}
