import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto, UpdateAreaDto } from './area.dto';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get('find-all')
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    const areas = await this.areasService.findAll(page, pageSize);
    return {
      data: areas,
      statusCode: HttpStatus.OK,
    };
  }

  @Get('find-all-user')
  async findAllByUser(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    const areas = await this.areasService.findAllByUser(userId, page, pageSize);
    return {
      data: areas,
      statusCode: HttpStatus.OK,
    };
  }

  @Get('find/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const area = await this.areasService.findOne(id);
    return {
      data: area,
      statusCode: HttpStatus.OK,
    };
  }

  @Post('create')
  @HttpCode(201)
  async create(@Body('body') body: CreateAreaDto) {
    const newArea = await this.areasService.create(body);
    return {
      data: newArea,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAreaDto,
  ) {
    const updatedArea = await this.areasService.update(id, body);
    return {
      data: updatedArea,
      statusCode: HttpStatus.OK,
    };
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const deletedArea = await this.areasService.delete(id);
    return {
      data: deletedArea,
      statusCode: HttpStatus.GONE,
    };
  }
}
