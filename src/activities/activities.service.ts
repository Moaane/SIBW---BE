import { Injectable } from '@nestjs/common';
import { Area } from '@prisma/client';
import { ActivityTemplatesService } from 'src/activity-templates/activity-templates.service';
import { AreasService } from 'src/areas/areas.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly areaService: AreasService,
    private readonly atsService: ActivityTemplatesService,
  ) {}

  async findAll(areaId: number, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const area = await this.areaService.findOne(areaId);
    const day = area.dayCompleted + 1;
    const atDay: string = String(day);

    const activities = await this.prisma.activityTemplate.findMany({
      skip,
      take: pageSize,
      where: {
        day: atDay,
      },
      orderBy: [{ day: 'asc' }, { time: 'asc' }],
    });

    const total = await this.prisma.activityTemplate.count();
    const totalPages = Math.ceil(total / pageSize);

    const activitiesData = activities.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      note: item.description,
      day: item.day,
      time: item.time,
      feedTotal: (item.feedPercent / 100) * area.fishWeight * area.fishTotal,
    }));

    return {
      activitiesData,
      total,
      totalPages,
    };
  }

  async nextActivity(areaId: number, dayCompleted: number): Promise<Area> {
    const area = await this.prisma.area.update({
      where: { id: areaId },
      data: { dayCompleted },
    });
    return area;
  }
}
