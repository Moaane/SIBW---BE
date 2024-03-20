import { ActivityTemplate } from '@prisma/client';

export class ActivityTemplateEntity implements ActivityTemplate {
  id: number;
  name: string;
  day: number;
  description: string;
  feedPercent: number;
  note: string;
  time: string;
}
