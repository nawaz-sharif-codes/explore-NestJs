import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Address {
  @Prop({
    required: true,
    trim: true,
  })
  street!: string;

  @Prop({
    required: true,
    trim: true,
  })
  postCode!: string;

  @Prop({
    required: true,
    trim: true,
  })
  city!: string;

  @Prop({
    trim: true,
  })
  county?: string;
}

export const CustomerAddressSchema = SchemaFactory.createForClass(Address);
