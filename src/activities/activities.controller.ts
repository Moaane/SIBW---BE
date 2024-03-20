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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@UseGuards(AccessTokenGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @HttpCode(200)
  @Get('find-all/:id')
  async findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query('page', ParseIntPipe) page: number,
    @Req() req,
  ) {
    const userId = req.user.sub;
    return await this.activitiesService.findAll(id, userId, page);
  }

  @HttpCode(200)
  @Post('next-activity/:id')
  async nextActivity(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    await this.activitiesService.nextActivity(id);
    return true;
  }

  @Get('muhaha')
  async getMaxDay() {
    return await this.activitiesService.getMaxDay();
  }
}
