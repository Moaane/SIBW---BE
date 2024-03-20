import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserEntity } from './user.entity';
import { $Enums } from '@prisma/client';

export class CreateUserDto extends OmitType(UserEntity, ['id']) {
  username: string;
  email: string;
  password: string;
  role: $Enums.Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  username?: string;
  email?: string;
  password?: string;
  role?: $Enums.Role;
}
