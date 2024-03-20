import {
  BadRequestException,
  Body,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponse } from './user.type';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, role?: Role): Promise<UserResponse> {
    const perPage = 10;
    const skip = page > 0 ? perPage * (page - 1) : 0;

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: perPage,
        where: role ? { role } : undefined,
      }),
      this.prisma.user.count(),
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

  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { areas: { select: { id: true, name: true } } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { areas: { select: { name: true } } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(body: CreateUserDto): Promise<User> {
    const isEmailValid = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (isEmailValid) {
      throw new BadRequestException('Email already in use');
    }

    if (body.role && !['ADMIN', 'USER'].includes(body.role)) {
      throw new BadRequestException('Role not found');
    }

    const hashedPassword = await bcrypt.hash(body.password, 8);
    const newUser = await this.prisma.user.create({
      data: {
        ...body,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      throw new BadRequestException('Server error');
    }

    return newUser;
  }

  async update(id: number, body: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.findById(id);

    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }

    if (body.email) {
      const isEmailTaken = await this.prisma.user.findFirst({
        where: {
          email: body.email,
          id: {
            not: id,
          },
        },
      });

      if (isEmailTaken) {
        throw new BadRequestException('Email already in use');
      }
    }

    if (body.role && !['ADMIN', 'USER'].includes(body.role)) {
      throw new BadRequestException('Role not found');
    }

    const hashedPassword = await bcrypt.hash(body.password, 8);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...body,
        password: hashedPassword,
      },
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.area.deleteMany({ where: { userId: id } });

    const deletedUser = await this.prisma.user.delete({ where: { id } });
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return;
  }
}
