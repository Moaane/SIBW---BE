import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @HttpCode(200)
  @Get('find-all')
  async findAll(
    @Query('areaId', ParseIntPipe) areaId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    const activities = await this.activitiesService.findAll(
      areaId,
      page,
      pageSize,
    );
    return {
      data: activities,
      statusCode: HttpStatus.OK,
    };
  }

  @HttpCode(200)
  @Post('next-activity')
  async nextActivity(
    @Query('areaId', ParseIntPipe) areaId: number,
    @Query('turn', ParseIntPipe) turn: number,
  ) {
    const activities = await this.activitiesService.nextActivity(areaId, turn);
    return {
      data: activities,
      statusCode: HttpStatus.OK,
    };
  }
}
