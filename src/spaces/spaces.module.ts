import { Module } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { SpacesController } from './spaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceEntity } from '@/shared/models';

@Module({
  controllers: [SpacesController],
  providers: [SpacesService],
  imports: [TypeOrmModule.forFeature([SpaceEntity])],
})
export class SpacesModule {}
