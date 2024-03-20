import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ActivityTemplate } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateActivityTemplateDto,
  UpdateActivityTemplateDto,
} from './activity-template.dto';
import { ActivityTemplateResponse } from './activity-templates.type';

@Injectable()
export class ActivityTemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number): Promise<ActivityTemplateResponse> {
    const perPage = 10;
    const skip = page > 0 ? perPage * (page - 1) : 0;

    const [data, total] = await Promise.all([
      this.prisma.activityTemplate.findMany({
        skip,
        take: perPage,
        orderBy: [{ day: 'asc' }, { time: 'asc' }],
      }),
      this.prisma.activityTemplate.count(),
    ]);

    const lastPage = Math.ceil(total / perPage);

    return {
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
      data,
    };
  }

  async findOne(id: number): Promise<ActivityTemplate> {
    const ats = await this.prisma.activityTemplate.findUnique({
      where: { id },
    });

    if (!ats) {
      throw new NotFoundException('Activity template not found');
    }

    return ats;
  }

  async create(body: CreateActivityTemplateDto): Promise<ActivityTemplate> {
    const newAts = await this.prisma.activityTemplate.create({
      data: body,
    });

    if (!newAts) {
      throw new BadRequestException('Failed create activity template');
    }

    return newAts;
  }

  async update(
    id: number,
    body: UpdateActivityTemplateDto,
  ): Promise<ActivityTemplate> {
    const atToUpadate = await this.prisma.activityTemplate.findUnique({
      where: { id },
    });

    if (!atToUpadate) {
      throw new NotFoundException('Activity template not found');
    }

    const updatedAt = await this.prisma.activityTemplate.update({
      where: { id },
      data: body,
    });

    if (!updatedAt) {
      throw new BadRequestException('Failed to update actiivity template');
    }

    return updatedAt;
  }

  async delete(id: number): Promise<void> {
    const deletedAt = await this.prisma.activityTemplate.delete({
      where: { id },
    });

    if (!deletedAt) {
      throw new NotFoundException('Activity template not found');
    }

    return;
  }
}
