import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserQuery } from './types/user.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  fetchUser(@Param('id') id: number) {
    console.log(typeof id);
    return this.userService.fetchUser(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  fetchNextRecords(
    @Query() userQuery: UserQuery,
    @Headers('Authorization') token: string,
  ) {
    const jwt = token.split(' ')[1];
    console.log(jwt);
    const page = userQuery.page;
    const limit = userQuery.limit;
    return { success: true };
  }
}
