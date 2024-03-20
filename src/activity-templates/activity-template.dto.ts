import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ActivityTemplateEntity } from './activity-template.entity';

export class CreateActivityTemplateDto {
  name: string;
  description: string;
  note: string;
  time: string;
  day: number;
  feedPercent: number;
  feedTotal: number;
}

export class UpdateActivityTemplateDto {
  name?: string;
  description?: string;
  note?: string;
  day?: number;
  time?: string;
  feedPercent?: number;
  feedTotal?: number;
}
