import { ApiProperty } from '@nestjs/swagger';
import { SpaceDto } from './space.dto';

export class UpdateSpaceResponseDto {
  @ApiProperty({ type: SpaceDto })
  result: SpaceDto;
}
