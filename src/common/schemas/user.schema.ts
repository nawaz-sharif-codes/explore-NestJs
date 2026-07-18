import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserAddress } from '../types/userAddress.types';

@Schema({
  timestamps: true,
  collection: 'Users',
  versionKey: false,
})
export class User {
  @Prop({
    required: true,
    minLength: 3,
  })
  firstName!: string;
  @Prop({
    required: true,
    minLength: 3,
  })
  lastName!: string;
  @Prop({
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  })
  email!: string;
  @Prop({
    required: true,
    select: false,
  })
  password!: string;
  @Prop({
    required: true,
    unique: true,
  })
  contactNumber!: string;
  @Prop({
    required: true,
  })
  address!: UserAddress;
}

export const UserSchema = SchemaFactory.createForClass(User);
