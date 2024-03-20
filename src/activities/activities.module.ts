import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AreasService } from 'src/areas/areas.service';
import { ActivityTemplatesService } from 'src/activity-templates/activity-templates.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ActivitiesController],
  providers: [
    ActivitiesService,
    ActivityTemplatesService,
    AreasService,
    UsersService,
    PrismaService,
  ],
})
export class ActivitiesModule {}
