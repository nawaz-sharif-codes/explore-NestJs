import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  registerCustomer(@Body() dto: RegisterCustomerDto) {
    return this.customerService.registerCustomer(dto);
  }
}
