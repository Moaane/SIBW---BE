import { Area } from '@prisma/client';

export class AreaEntity implements Area {
  id: number;
  name: string;
  wide: number;
  depth: number;
  fishTotal: number;
  fishWeight: number;
  dayCompleted: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
