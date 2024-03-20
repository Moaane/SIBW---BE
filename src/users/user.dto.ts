import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserEntity } from './user.entity';
import { $Enums, Role } from '@prisma/client';

export class CreateUserDto {
  email: string;
  password: string;
  role?: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  email?: string;
  password?: string;
  role?: $Enums.Role;
  refreshToken?: string;
}
