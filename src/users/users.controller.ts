import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Role, User } from '@prisma/client';
import { UserResponse } from './user.type';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('find-all')
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('role') role?: Role,
  ): Promise<UserResponse> {
    if (role && !Object.values(Role).includes(role as Role)) {
      throw new BadRequestException('Invalid role');
    }

    return await this.usersService.findAll(page, role);
  }

  @Get('find/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Post('create')
  @HttpCode(201)
  async create(@Body() body: CreateUserDto): Promise<User> {
    return await this.usersService.create(body);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, body);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.usersService.delete(id);
  }
}
