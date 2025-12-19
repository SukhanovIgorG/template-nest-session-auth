import { ApiProperty } from '@nestjs/swagger';
import { SpaceDto } from './space.dto';

export class CreateSpaceResponseDto {
  @ApiProperty({ type: SpaceDto })
  result: SpaceDto;
}
