import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { CustomerService } from './customer.service';
import { ApiKeyGuard } from '../guards/apikey.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Post('/register')
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.CREATED)
  registerCustomer(@Body() dto: RegisterCustomerDto) {
    return this.customerService.registerCustomer(dto);
  }
}
