import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Area } from '@prisma/client';
import { ActivityTemplatesService } from 'src/activity-templates/activity-templates.service';
import { AreasService } from 'src/areas/areas.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly areaService: AreasService,
    private readonly atsService: ActivityTemplatesService,
    private readonly userService: UsersService,
  ) {}

  // async create(areaId: number) {
  //   const area = await this.areaService.findOne(areaId);

  //   if ((await this.prisma.activities.count({ where: { areaId } })) === 0) {
  //     const strDay: string = String(area.dayCompleted + 1);
  //     await this.prisma.activities.createMany({
  //       data: (
  //         await this.prisma.activityTemplate.findMany({
  //           where: { day: strDay },
  //           orderBy: [{ day: 'asc' }, { time: 'asc' }],
  //         })
  //       ).map((template) => ({
  //         ...template,
  //         feedTotal: (
  //           (+template.feedPercent / 100) *
  //           area.fishWeight *
  //           area.fishTotal
  //         ).toFixed(2),
  //       })),
  //     });
  //   }
  // }

  // async findAllByArea(areaId: number): Promise<boolean> {
  //   const activities = await this.prisma.activities.findMany({
  //     where: { areaId },
  //   });

  //   return activities.length !== 0;
  // }

  async getMaxDay(): Promise<number> {
    const maxDayResult = await this.prisma.activityTemplate.aggregate({
      _max: { day: true },
    });

    return maxDayResult._max.day;
  }

  async findAll(areaId: number, userId: number, page: number) {
    const perPage = 10;
    const isUserValid = await this.userService.findById(userId);
    const area = await this.areaService.findOne(areaId);
    if (isUserValid.id !== area.userId) {
      throw new BadRequestException();
    }

    const skip = page > 0 ? perPage * (page - 1) : 0;

    const [activityTemplates, total] = await Promise.all([
      this.prisma.activityTemplate.findMany({
        skip,
        take: perPage,
        where: { day: area.dayCompleted + 1 },
        orderBy: [{ day: 'asc' }, { time: 'asc' }],
      }),
      this.prisma.activityTemplate.count(),
    ]);
    const lastPage = Math.ceil(total / perPage);

    const activities = activityTemplates.map((template) => ({
      ...template,
      feedTotal: (
        (+template.feedPercent / 100) *
        area.fishWeight *
        area.fishTotal
      ).toFixed(2),
    }));

    return {
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
      data: {
        area: area,
        activities: activities,
      },
    };
  }

  async nextActivity(areaId: number) {
    const updatedActivity = await this.prisma.area.update({
      where: { id: areaId },
      data: { dayCompleted: { increment: 1 } },
    });

    if (!updatedActivity) {
      throw new BadRequestException('Failed to update activity');
    }
  }
}
