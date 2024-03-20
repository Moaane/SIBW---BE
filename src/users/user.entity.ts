import { $Enums, User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  email: string;
  password: string;
  role: $Enums.Role;
  refreshToken: string;
}
