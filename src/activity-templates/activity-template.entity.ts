import { ActivityTemplate } from '@prisma/client';

export class ActivityTemplateEntity implements ActivityTemplate {
  id: number;
  name: string;
  day: string;
  description: string;
  feedPercent: number;
  feedTotal: number;
  note: string;
  time: string;
}
