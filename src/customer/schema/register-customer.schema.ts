import { HydratedDocument } from 'mongoose';
import {
  Address,
  CustomerAddressSchema,
} from './../dto/common/customer-address.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({
  timestamps: true,
  collection: 'Customer',
  versionKey: false,
})
export class Customer {
  @Prop({
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 100,
  })
  firstName!: string;

  @Prop({
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 100,
  })
  lastName?: string;

  @Prop({
    type: Number,
    required: true,
    min: 18,
    max: 100,
  })
  age!: number;

  @Prop({
    type: String,
    trim: true,
    required: true,
    unique: true,
  })
  email!: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  password!: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  contactNumber!: string;

  @Prop({
    type: CustomerAddressSchema,
    trim: true,
    required: true,
  })
  address!: Address;

  // Added only for TypeScript
  createdAt!: Date;
  updatedAt!: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
