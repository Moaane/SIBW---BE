import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('find-all')
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    const users = await this.usersService.findAll(page, pageSize);
    return {
      users,
      statusCode: HttpStatus.OK,
    };
  }

  @Get('find/email/:email')
  async findOneByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return {
        data: null,
        statusCode: HttpStatus.NOT_FOUND,
      };
    }
    return {
      data: user,
      statusCode: HttpStatus.OK,
    };
  }

  @Get('find/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findById(id);
    return {
      data: user,
      statusCode: HttpStatus.OK,
    };
  }

  @Post('create')
  @HttpCode(201)
  async create(@Body() body: CreateUserDto) {
    const newUser = await this.usersService.create(body);
    return {
      data: newUser,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.update(id, body);
    return {
      data: updatedUser,
      statusCode: HttpStatus.OK,
    };
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const deletedUser = await this.usersService.delete(id);
    return {
      data: deletedUser,
      statusCode: HttpStatus.GONE,
    };
  }
}
