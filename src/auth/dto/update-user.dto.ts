import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUser extends PartialType(RegisterUserDto) {}
export class UserMarketing extends PickType(RegisterUserDto, [
  'email',
  'contactNumber',
] as const) {}
export class UserMarketingCampaign extends OmitType(RegisterUserDto, [
  'address',
] as const) {}
