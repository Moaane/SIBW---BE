import { Injectable } from '@nestjs/common';
import { Area } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAreaDto, UpdateAreaDto } from './area.dto';

@Injectable()
export class AreasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const area = await this.prisma.area.findMany({
      skip,
      take: pageSize,
    });
    const total = await this.prisma.area.count();
    const totalPages = Math.ceil(total / pageSize);

    return {
      area,
      total,
      totalPages,
    };
  }

  async findAllByUser(userId: number, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const area = await this.prisma.area.findMany({
      where: { userId },
      skip,
      take: pageSize,
    });
    const total = await this.prisma.area.count({ where: { userId } });
    const totalPages = Math.ceil(total / pageSize);

    return {
      area,
      total,
      totalPages,
    };
  }

  async findOne(id: number): Promise<Area> {
    return await this.prisma.area.findUnique({ where: { id } });
  }

  async create(body: CreateAreaDto): Promise<Area> {
    return await this.prisma.area.create({ data: body });
  }

  async update(id: number, body: UpdateAreaDto): Promise<Area> {
    return await this.prisma.area.update({ where: { id }, data: body });
  }

  async delete(id: number) {
    return await this.prisma.area.delete({ where: { id } });
  }
}
