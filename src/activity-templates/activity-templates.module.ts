import { Module } from '@nestjs/common';
import { ActivityTemplatesService } from './activity-templates.service';
import { ActivityTemplatesController } from './activity-templates.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ActivityTemplatesController],
  providers: [ActivityTemplatesService, PrismaService],
})
export class ActivityTemplatesModule {}
