import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Area } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAreaDto, UpdateAreaDto } from './area.dto';
import { AreaResponse } from './area.type';

@Injectable()
export class AreasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number, page: number): Promise<AreaResponse> {
    const perPage = 10;
    const skip = page > 0 ? perPage * (page - 1) : 0;

    const [data, total] = await Promise.all([
      this.prisma.area.findMany({
        where: { userId },
        skip,
        take: perPage,
      }),
      this.prisma.area.count(),
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

  async findOne(id: number): Promise<Area> {
    const area = await this.prisma.area.findUnique({ where: { id } });

    if (!area) {
      throw new NotFoundException('Area not found');
    }

    return area;
  }

  async create(userId: number, body: CreateAreaDto): Promise<Area> {
    const newArea = await this.prisma.area.create({
      data: {
        ...body,
        userId,
      },
    });

    if (!newArea) {
      throw new BadRequestException('Failed to create new area');
    }

    return newArea;
  }

  async update(id: number, body: UpdateAreaDto): Promise<Area> {
    const updatedArea = await this.prisma.area.update({
      where: { id },
      data: body,
    });

    if (!updatedArea) {
      throw new BadRequestException('Failed to update area');
    }

    return updatedArea;
  }

  async delete(id: number): Promise<void> {
    const deletedArea = await this.prisma.area.delete({ where: { id } });

    if (!deletedArea) {
      throw new NotFoundException('Area not found');
    }

    return;
  }
}
