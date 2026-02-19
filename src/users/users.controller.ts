import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthGuard } from '@/auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersListResponseDto } from './dto/user-response.dto';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UsersListResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  async getUsers() {
    const users = await this.usersService.getUsersList();
    const pagination = {
      total: users.length,
      page: 1,
      size: 10,
    };
    return { pagination, data: users };
  }
}
