import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto, UpdateAreaDto } from './area.dto';
import { AreaResponse } from './area.type';
import { Area } from '@prisma/client';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@UseGuards(AccessTokenGuard)
@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get('find-all')
  async findAll(
    @Query('page', ParseIntPipe)
    page: number,
    @Req() req,
  ): Promise<AreaResponse> {
    const userId = req.user.sub;
    return await this.areasService.findAll(userId, page);
  }

  @Get('find/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Area> {
    return await this.areasService.findOne(id);
  }

  @HttpCode(201)
  @Post('create')
  async create(@Body() body: CreateAreaDto, @Req() req): Promise<Area> {
    const userId = req.user.sub;
    return await this.areasService.create(userId, body);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAreaDto,
  ): Promise<Area> {
    return await this.areasService.update(id, body);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.areasService.delete(id);
  }
}
