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
import { ActivityTemplatesService } from './activity-templates.service';
import {
  CreateActivityTemplateDto,
  UpdateActivityTemplateDto,
} from './activity-template.dto';

@Controller('activity-templates')
export class ActivityTemplatesController {
  constructor(
    private readonly activityTemplatesService: ActivityTemplatesService,
  ) {}

  @Get('find-all')
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    const ats = await this.activityTemplatesService.findAll(page, pageSize);
    return {
      data: ats,
      statusCode: HttpStatus.OK,
    };
  }

  @Get('find/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const at = await this.activityTemplatesService.findOne(id);
    return {
      data: at,
      statusCode: HttpStatus.OK,
    };
  }

  @HttpCode(201)
  @Post('create')
  async create(@Body() body: CreateActivityTemplateDto) {
    const newAt = await this.activityTemplatesService.create(body);
    return {
      data: newAt,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateActivityTemplateDto,
  ) {
    const updatedAt = await this.activityTemplatesService.update(id, body);
    return {
      data: updatedAt,
      statusCode: HttpStatus.OK,
    };
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const deletedAt = await this.activityTemplatesService.delete(id);
    return {
      data: deletedAt,
      statusCode: HttpStatus.GONE,
    };
  }
}
