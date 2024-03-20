import { OmitType, PartialType } from '@nestjs/mapped-types';
import { AreaEntity } from './area.entity';

export class CreateAreaDto extends OmitType(AreaEntity, ['id']) {
  name: string;
  wide: number;
  depth: number;
  userId: number;
  fishAge: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateAreaDto extends PartialType(CreateAreaDto) {
  name?: string;
  wide?: number;
  depth?: number;
  userId?: number;
  fishAge?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
