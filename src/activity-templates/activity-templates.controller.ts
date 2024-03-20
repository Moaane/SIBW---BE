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
import { ActivityTemplateResponse } from './activity-templates.type';
import { ActivityTemplate } from '@prisma/client';

@Controller('activity-templates')
export class ActivityTemplatesController {
  constructor(
    private readonly activityTemplatesService: ActivityTemplatesService,
  ) {}

  @Get('find-all')
  async findAll(
    @Query('page', ParseIntPipe) page: number,
  ): Promise<ActivityTemplateResponse> {
    return await this.activityTemplatesService.findAll(page);
  }

  @Get('find/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ActivityTemplate> {
    return await this.activityTemplatesService.findOne(id);
  }

  @Post('create')
  async create(
    @Body() body: CreateActivityTemplateDto,
  ): Promise<ActivityTemplate> {
    return await this.activityTemplatesService.create(body);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateActivityTemplateDto,
  ): Promise<ActivityTemplate> {
    return await this.activityTemplatesService.update(id, body);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.activityTemplatesService.delete(id);
  }
}
