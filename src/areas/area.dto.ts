import { OmitType, PartialType } from '@nestjs/mapped-types';
import { AreaEntity } from './area.entity';

export class CreateAreaDto extends OmitType(AreaEntity, [
  'id',
  'createdAt',
  'updatedAt',
  'dayCompleted',
]) {
  name: string;
  wide: number;
  depth: number;
  fishTotal: number;
  fishWeight: number;
}

export class UpdateAreaDto extends PartialType(CreateAreaDto) {
  name?: string;
  wide?: number;
  depth?: number;
  fishTotal?: number;
  fishWeight?: number;
}
