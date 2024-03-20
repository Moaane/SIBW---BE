import { User } from '@prisma/client';

export type UserResponse = {
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
  data: User[];
};
