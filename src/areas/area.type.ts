import { Area } from '@prisma/client';

export type AreaResponse = {
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
  data: Area[];
};
