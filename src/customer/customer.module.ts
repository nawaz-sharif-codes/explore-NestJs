import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schema/register-customer.schema';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
})
export class CustomerModule {}
