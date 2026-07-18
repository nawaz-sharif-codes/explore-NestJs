import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './schema/register-customer.schema';
import { Model } from 'mongoose';
import { RegisterCustomerResponseDto } from './dto/register-customer-response.dto';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}
  async registerCustomer(
    dto: RegisterCustomerDto,
  ): Promise<RegisterCustomerResponseDto | string> {
    try {
      const customer: CustomerDocument = await this.customerModel.create(dto);
      return {
        id: customer._id.toString(),
        firstName: customer.firstName,
        lastName: customer.lastName,
        age: customer.age,
        email: customer.email,
        contactNumber: customer.contactNumber,
        address: customer.address,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      };
    } catch (error: unknown) {
      this.logger.error(
        'Failed to register customer',
        error instanceof Error ? error.stack : undefined,
      );

      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 11000
      ) {
        throw new ConflictException('Customer with this email already exists');
      }

      throw new InternalServerErrorException('Unable to register customer');
    }
  }
}
