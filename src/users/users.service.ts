import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { count } from 'console';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: pageSize,
      }),
      this.prisma.user.count(),
    ]);
    const totalPages = Math.ceil(total / pageSize);

    return {
      users,
      total,
      totalPages,
    };
  }

  async findById(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
      include: { areas: { select: { name: true } } },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { email },
      include: { areas: { select: { name: true } } },
    });
  }

  async create(body: CreateUserDto): Promise<User> {
    const existingEmail = await this.findByEmail(body.email);
    if (existingEmail) {
      throw new BadRequestException('Email already exist');
    }

    const hashedPassword = await bcrypt.hash(body.password, 8);
    return await this.prisma.user.create({
      data: {
        ...body,
        password: hashedPassword,
      },
    });
  }

  async update(id: number, body: UpdateUserDto): Promise<User> {
    const existingUserByEmail = await this.findByEmail(body.email);
    if (existingUserByEmail && existingUserByEmail.id !== id) {
      throw new BadRequestException('Email already exists');
    }

    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 8);
      return await this.prisma.user.update({
        where: { id },
        data: {
          ...body,
          password: hashedPassword,
        },
      });
    }

    return await this.prisma.user.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
