import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ActivityTemplateEntity } from './activity-template.entity';

export class CreateActivityTemplateDto extends OmitType(
  ActivityTemplateEntity,
  ['id'],
) {
  name: string;
  day: number;
  time: string;
  feedPercent: number;
  note: string;
  description: string;
}

export class UpdateActivityTemplateDto extends PartialType(
  CreateActivityTemplateDto,
) {
  name?: string;
  day?: number;
  time?: string;
  feedPercent?: number;
  note?: string;
  description?: string;
}
