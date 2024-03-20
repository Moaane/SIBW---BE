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

  // @HttpCode(200)
  // @Get('find-all/:id')
  // async findAll(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Query('userId', ParseIntPipe) userId: number,
  //   @Query('page', ParseIntPipe) page: number,
  //   @Query('perPage', ParseIntPipe) perPage: number,
  // ) {
  //   return await this.activitiesService.findAll(id, userId, page, perPage);
  // }

  // @HttpCode(200)
  // @Post('next-activity/:id')
  // async nextActivity(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
  //   await this.activitiesService.nextActivity(id);
  //   return true;
  // }

  // @Get('muhaha')
  // async getMaxDay() {
  //   return await this.activitiesService.getMaxDay();
  // }
}
