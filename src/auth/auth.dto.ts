import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserEntity } from 'src/users/user.entity';

export class RegisterDto extends OmitType(UserEntity, ['id', 'role']) {
  email: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string
}
