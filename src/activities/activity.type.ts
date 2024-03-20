import { ActivityTemplate } from '@prisma/client';

export type ActivityTemplateResponse = {
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
  data: [];
};
