import { BadRequestException, Injectable } from '@nestjs/common';
import { ActivityTemplate } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateActivityTemplateDto,
  UpdateActivityTemplateDto,
} from './activity-template.dto';

@Injectable()
export class ActivityTemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const ats = await this.prisma.activityTemplate.findMany({
      skip,
      take: pageSize,
      orderBy: [{ day: 'asc' }, { time: 'asc' }],
    });

    const total = await this.prisma.activityTemplate.count();

    const totalPages = Math.ceil(total / pageSize);

    return {
      ats,
      total,
      totalPages,
    };
  }

  async findOne(id: number): Promise<ActivityTemplate> {
    return await this.prisma.activityTemplate.findUnique({ where: { id } });
  }

  async create(body: CreateActivityTemplateDto): Promise<ActivityTemplate> {
    const dayString: string = String(body.day);
    return await this.prisma.activityTemplate.create({
      data: {
        ...body,
        day: dayString,
      },
    });
  }

  async update(
    id: number,
    body: UpdateActivityTemplateDto,
  ): Promise<ActivityTemplate> {
    const dayString: string = String(body.day); 
    return await this.prisma.activityTemplate.update({
      where: { id },
      data: {
        ...body,
        day: dayString,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.activityTemplate.delete({ where: { id } });
  }
}
